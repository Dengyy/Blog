/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 非有序
var twoSum = function(nums, target) {
  let len = nums.length, res = [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

colorLog(twoSum([2,7,11,15], 9), true)