/**
 * @param {string} s
 * @return {string}
 */
// todo: 优化
var longestPalindrome = function(s) {
};

function validate(s) {
  for(let i = 0, len = s.length; i < Math.ceil(len / 2); i++) {
    if (s[i] !== s[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

test('bab', longestPalindrome('babad'))