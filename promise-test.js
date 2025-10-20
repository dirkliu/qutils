// 基本使用
const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

p1
  .then(value => {
    console.log(value); // "Success!"
    return value + ' Again';
  })
  .then(value => console.log(value)) // "Success! Again"
  .catch(error => console.error(error));

// 测试静态方法
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  MyPromise.resolve(3)
]).then(console.log); // [1, 2, 3]

MyPromise.race([
  new MyPromise(resolve => setTimeout(() => resolve('First'), 100)),
  new MyPromise(resolve => setTimeout(() => resolve('Second'), 50))
]).then(console.log); // "Second"