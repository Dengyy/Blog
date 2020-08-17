/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (!s) return true;
  const matchConfig = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  const leftChars = ['(','[','{']
  const stash = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const isLeft = leftChars.includes(char)
    const matchRight = matchConfig[char]
    if (!isLeft && !matchRight) {
      return false
    }
    if (isLeft) {
      stash.push(char)
    } else if (matchRight) {
      if (stash[stash.length - 1] === matchRight) {
        stash.pop()
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return stash.length === 0;
};

test(isValid("()"), true)
test(isValid("()[]{}"), true)
test(isValid("(]"), false)
test(isValid("([)]"), false)
test(isValid("{[]}"), true)