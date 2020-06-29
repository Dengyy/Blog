// [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

/**
 * @param {number} n
 * @return {string[]}
 */
var getSpecial = function (n) {
  return new Array(n).fill('()').join('');
}
var generateParenthesis = function(n) {
  if (n < 1) {
    return [''];
  }

  if (n === 1) {
    return ['()'];
  }

  const specailLast = getSpecial(n - 1);
  const res = [
    `()${specailLast}`,
    `(${specailLast})`
  ];
  const arr = generateParenthesis(n - 1);
  const specailLast2 = getSpecial(n - 1);
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === specailLast2) {
      continue;
    }
    res.push(`()${arr[i]}`)
    res.push(`(${arr[i]})`)
    res.push(`${arr[i]}()`)
  }

  return res
};


var generateParenthesisCount = function(n) {
  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return 2 + generateParenthesisCount(n - 2) * 3
};

test(5, generateParenthesisCount(3))
colorLog(JSON.stringify(generateParenthesis(3), 2))