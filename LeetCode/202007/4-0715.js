/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// todo: O(log(m + n))
var findMedianSortedArrays = function(nums1, nums2) {
  if (!nums1 && !nums2) {
    return null;
  }
  if (!nums1) {
    return getMiddleVal(nums2)
  }
  if (!nums2) {
    return getMiddleVal(nums1)
  }

  const len1 = nums1.length
  const len2 = nums2.length
  let i1 = i2 = 0;
  let arr = [];

  while(i1 < len1 && i2 < len2) {
    if (nums1[i1] < nums2[i2]) {
      arr.push(nums1[i1]);
      i1++;
    } else {
      arr.push(nums2[i2]);
      i2++;
    }
  }

  if (i1 < len1) {
    arr = arr.concat(nums1.slice(i1))
  }
  if (i2 < len2) {
    arr = arr.concat(nums2.slice(i2))
  }

  return getMiddleVal(arr).toFixed(1)
};

function getMiddleVal (arr) {
  const len = arr.length;
  
  const floor = Math.floor(len / 2);
  const ceil = Math.ceil(len / 2);
  if (len % 2 === 0) {
    return (arr[floor] + arr[floor - 1]) / 2
  } else {
    return arr[floor]
  }
}

test(2.0, findMedianSortedArrays([1, 2], [3]))