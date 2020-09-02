class StringUtil {
  /**
   * 判断回文字符串
   * @param {string} s 
   */
  static isReverse (s) {
    if (!s) return true;

    const len = s.length;
    for(let i = 0; i < len / 2; i++) {
      if (s[i] !== s[len - 1 - i]) {
        return false;
      }
    }

    return true;
  }
}

