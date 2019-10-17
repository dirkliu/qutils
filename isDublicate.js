/**
 * @param {number[]} nums
 * @return {boolean}
 */
export default function (nums) {
  return (new Set(nums)).size !== nums.length  
}
