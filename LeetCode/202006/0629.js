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

// test(5, generateParenthesisCount(3))
// colorLog(JSON.stringify(generateParenthesis(3), 2))

// fail case
// 4
// ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())()()","()((()))","()(()())",`${"()(())()"}`,`${"()(())()"}`,"()()(())","()()()()"]
// ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()",`${"(())(())"}`,"(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]

var lStr = '(', rStr = ')'

var generateParenthesis = function(n) {
  const res = [];
  res.push([lStr])
  res[0].ln = 1
  res[0].rn = 0
  while (res[0].ln < n || res[0].rn < n) {
    for (let i = 0, len = res.length; i < len; i++) {
      if (res[i].ln < n) {
        if (res[i].rn < n) {
          const r = [].concat(res[i], [rStr])
          r.ln = res[i].ln
          r.rn = res[i].rn + 1
          res.push(r)
        }
        res[i].push(lStr)
        res[i].ln = res[i].ln + 1
      } else if (res[i].rn < n) {
        res[i].push(rStr)
        res[i].rn = res[i].rn + 1
      }
    }
  }
  
  const strArr = []
  for (let j = 0; j < res.length; j++) {
    const str = res[j].join('')
    if (validate(str)) {
      strArr.push(str)
    }
  }

  return strArr.sort()
};

// 判断是否有效的括号
function validate (str) {
  // 过滤非括号字符
  var reg = /^[\(\)]+$/
  if (!reg.exec(str)) {
    return false;
  }
  var left = [], right = []
  for (let i = 0, len = str.length; i < len; i++) {
    if (str[i] === lStr) {
      left.push(lStr)
    } else {
      left.pop()
    }
  }

  return left.length <= 0
}

colorLog(JSON.stringify(generateParenthesis(3), 2))
