/**
 * @param {string} s
 * @return {string}
 */
// todo: 优化
var longestPalindrome = function(s) {
  if (!s) {
    return '';
  }
  const len = s.length;
  let l = len;
  while (l > 0 ) {
    for (let i = 0; i < len - l + 1; i++) {
      const temp = s.slice(i, i + l);
      if (validate(temp)) {
        return temp;
      }
    }
    l--;
  }
  return '';
};

function validate(s) {
  for(let i = 0, len = s.length; i < Math.ceil(len / 2); i++) {
    if (s[i] !== s[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

test('bab', longestPalindrome("babad"))
test('a', longestPalindrome("a"))