/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  if (!str) return 0;
  var trimStr = str.trim();
  if (!trimStr) return 0;
  var res = 0;
  let negative = 1;
  for (let index = 0, len = trimStr.length; index < len; index++) {
    var num = trimStr[index];
    if (index === 0 && ['-', '+'].includes(num)) {
      negative = num === '-' ? -1 : 1;
      continue;
    }
    const matchRes = /[0-9]/.exec(num)
    if (matchRes) {
      res = res * 10 + (+num);
    } else {
      break;
    }
  }

  res = negative * res;

  const min = -Math.pow(2, 31);
  const max = Math.pow(2, 31) - 1;

  if (res > max) {
    return max;
  } else if (res < min) {
    return min;
  }

  return res;
};

test(0, myAtoi("words and 987"))
test(-2147483648, myAtoi("      -11919730356x"))
test(-12, myAtoi("  -0012a42"))
test(1, myAtoi('+1'))
test(-42, myAtoi('   -42'))
test(42, myAtoi('42'))
test(4193, myAtoi('4193 with words'))
test(0, myAtoi('words and 987'))
test(-2147483648, myAtoi('-91283472332'))