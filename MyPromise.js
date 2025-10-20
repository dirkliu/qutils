// 定义 Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING; // 初始状态
    this.value = undefined; // 成功值
    this.reason = undefined; // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    // 定义 resolve 函数
    const resolve = (value) => {
      // 只有 pending 状态可以改变
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    // 定义 reject 函数
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      // 立即执行 executor
      executor(resolve, reject);
    } catch (error) {
      // 如果 executor 执行出错，直接 reject
      reject(error);
    }
  }

  // then 方法 - 核心功能
  then(onFulfilled, onRejected) {
    // 参数校验，确保 onFulfilled 和 onRejected 是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    // 返回新的 Promise，实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 处理 fulfilled 状态
      const handleFulfilled = () => {
        // 使用 setTimeout 模拟微任务（实际 Promise 是微任务）
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            // 解析 thenable 对象（解决程序）
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      // 处理 rejected 状态
      const handleRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      // 根据当前状态决定执行方式
      if (this.status === FULFILLED) {
        handleFulfilled();
      } else if (this.status === REJECTED) {
        handleRejected();
      } else if (this.status === PENDING) {
        // 如果是 pending 状态，将回调存入队列
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  // catch 方法 - 错误捕获的语法糖
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // finally 方法 - 无论成功失败都会执行
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }

  // 解析 thenable 对象的通用方法（Promise 解决程序）
  resolvePromise(promise2, x, resolve, reject) {
    // 防止循环引用
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 如果 x 是 Promise 实例
    if (x instanceof MyPromise) {
      x.then(
        value => this.resolvePromise(promise2, value, resolve, reject),
        reject
      );
    } 
    // 如果 x 是对象或函数（可能是 thenable）
    else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called = false; // 防止多次调用
      try {
        const then = x.then;
        if (typeof then === 'function') {
          // 如果是 thenable 对象
          then.call(
            x,
            y => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            r => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          // 普通对象，直接 resolve
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // 基本类型值，直接 resolve
      resolve(x);
    }
  }

  // 静态方法：Promise.resolve
  static resolve(value) {
    // 如果已经是 Promise 实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    }
    // 如果是 thenable 对象
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      const then = value.then;
      if (typeof then === 'function') {
        return new MyPromise(then.bind(value));
      }
    }
    // 其他情况
    return new MyPromise(resolve => resolve(value));
  }

  // 静态方法：Promise.reject
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  // 静态方法：Promise.all
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      const results = [];
      let count = 0;

      if (promises.length === 0) {
        return resolve(results);
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          reject // 任何一个失败就立即 reject
        );
      });
    });
  }

  // 静态方法：Promise.race
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      if (promises.length === 0) {
        return; // 永远 pending
      }

      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  // 静态方法：Promise.allSettled
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      const results = [];
      let count = 0;

      if (promises.length === 0) {
        return resolve(results);
      }

      const processResult = (index, value, status) => {
        results[index] = status === FULFILLED 
          ? { status: FULFILLED, value }
          : { status: REJECTED, reason: value };
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => processResult(index, value, FULFILLED),
          reason => processResult(index, reason, REJECTED)
        );
      });
    });
  }

  // 静态方法：Promise.any
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      const errors = [];
      let count = 0;

      if (promises.length === 0) {
        return reject(new AggregateError(errors, 'All promises were rejected'));
      }

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          resolve,
          error => {
            errors[index] = error;
            count++;
            if (count === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      });
    });
  }
}

// 测试用例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MyPromise;
}