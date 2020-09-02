// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

// 示例 1：
// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"

// 示例 2：
// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

// 提示：
// 输入的字符串长度不会超过 1000 。

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  if (!s || s.length > 1000) return false;

  const res = [];
  const len = s.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      const subString = s.slice(i, j);
      if (StringUtil.isReverse(subString)) {
        res.push(subString);
      }
    }
  }

  return res.sort();
};

test(["a", "a", "a", "aa", "aa", "aaa"], countSubstrings("aaa"))
test(["a", "b", "c"], countSubstrings("abc"))