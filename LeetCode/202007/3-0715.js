/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var max = '';
  for (let l = 0, len = s.length; l < len; l++) {
    var res = s.slice(l, l + 1);
    for (let i = l + 1, len = s.length; i < len; i++) {
      if (res.indexOf(s[i]) === -1) {
        res += s[i];
      } else {
        break;
      }
    }
    if (!max || res.length > max.length) {
      max = res;
    }
  }

  return max.length;
};

test(lengthOfLongestSubstring(" "), 1)