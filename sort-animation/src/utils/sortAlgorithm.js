export const shellSort = (arr, animationHandler) => {
  const len = arr.length
  let gap, i, j, temp, tempArr

  for (gap = len >> 1; gap > 0; gap >>= 1) {
    for (i = gap; i < len; i++) {
      temp = arr[i]
      tempArr = [...arr] // 屏蔽向后移动的交换过程，避免造成比较时的误解
      for (j = i - gap; j >= 0; j -= gap) {
        animationHandler(tempArr, i, j, gap)

        if (arr[j] > temp) {
          arr[j + gap] = arr[j]
        } else {
          break
        }
      }
      arr[j + gap] = temp
      animationHandler(arr, i, j + gap, gap)
    }
  }

  return arr
}

const qsort1 = (arr, l, u, animationHandler) => {
  if (l >= u) { return }

  animationHandler(arr)
  let m = l
  for (let i = l + 1; i < u + 1; i++) {
    animationHandler(arr, l, u, m, i)
    if (arr[i] < arr[l]) {
      m += 1
      animationHandler(arr, l, u, m, i, [m, i])
      let temp = arr[m]
      arr[m] = arr[i]
      arr[i] = temp
      animationHandler(arr, l, u, m, i, [m, i])
    } else {
      animationHandler(arr, l, u, m, i)
    }
  }

  // swap between m and l after partition, important!
  animationHandler(arr, l, u, m, null, [m, l])
  let temp = arr[m]
  arr[m] = arr[l]
  arr[l] = temp
  animationHandler(arr, l, u, m, null, [m, l])

  qsort1(arr, l, m - 1, animationHandler)
  qsort1(arr, m + 1, u, animationHandler)
}

export const quikSort1 = (arr, animationHandler) => {
  qsort1(arr, 0, arr.length - 1, animationHandler)

  return arr
}

export const countingSort = (arr, animationHandler) => {
  let max, min
  max = min = arr[0]

  for (let val of arr) {
    if (max < val) {
      max = val
    }
    if (min > val) {
      min = val
    }
  }

  const countLength = max - min + 1
  const countArr = new Array(countLength).fill(0)
  const sortArr = arr.map((val, idx) => null)

  animationHandler({
    originArr: arr.map((val, idx) => ({
      value: val
    })),
    countArr: countArr.map((val, idx) => ({
      value: val
    }))
  })

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    countArr[value - min] = countArr[value - min] + 1
    animationHandler({
      originArr: arr.map((val, idx) => ({
        value: val,
        isCount: idx === i
      })),
      countArr: countArr.map((val, idx) => ({
        value: val,
        isCount: idx === value - min
      }))
    })
  }

  for (let i = 1; i < countArr.length; i++) {
    countArr[i] += countArr[i - 1]
    animationHandler({
      originArr: arr.map((val, idx) => ({
        value: val
      })),
      countArr: countArr.map((val, idx) => ({
        value: val,
        isSum: idx === i
      }))
    })
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i]
    let sortIdx = countArr[value - min]
    sortArr[sortIdx - 1] = value
    animationHandler({
      originArr: arr.map((val, idx) => ({
        value: val,
        isPlace: idx === i
      })),
      countArr: countArr.map((val, idx) => ({
        value: val,
        isPlace: idx === value - min
      })),
      sortedArr: sortArr.map((val, idx) => ({
        value: val,
        isPlace: idx === sortIdx - 1
      }))
    })
    sortIdx = --countArr[value - min]
    animationHandler({
      originArr: arr.map((val, idx) => ({
        value: val,
        isPlace: idx === i
      })),
      countArr: countArr.map((val, idx) => ({
        value: val,
        isPlace: idx === value - min
      })),
      sortedArr: sortArr.map((val, idx) => ({
        value: val,
        isPlace: idx === sortIdx
      }))
    })
  }

  return sortArr
}

export const radixSort = (arr, animationHandler, radix = 10) => {
  let sortArr = [...arr]
  let bucketArr = new Array(radix).fill([])
  let bit = 0
  let continueFlg = true

  while (continueFlg) {
    continueFlg = false
    bucketArr = new Array(radix).fill([])

    for (let i = 0; i < sortArr.length; i++) {
      if (sortArr[i] > Math.pow(radix, bit)) {
        continueFlg = true
      }
      const bucketIndex = Math.floor(sortArr[i] / Math.pow(radix, bit)) % Math.pow(radix, bit + 1)
      animationHandler({
        sortedArr: arr.map((val, idx) => ({
          value: val,
          isBucket: idx === i
        })),
        bucketArr: bucketArr.map((val, idx) => ({
          value: val.toString()
        })),
        bit: bit + 1
      })
      bucketArr[bucketIndex] = [...bucketArr[bucketIndex], sortArr[i]]
      animationHandler({
        sortedArr: arr.map((val, idx) => ({
          value: val
        })),
        bucketArr: bucketArr.map((val, idx) => ({
          value: val.toString(),
          isBucket: idx === bucketIndex
        })),
        bit: bit + 1
      })
    }

    bit++
    animationHandler({
      bucketArr: bucketArr.map((val, idx) => ({
        value: val.toString(),
        isMerge: true
      })),
      sortedArr: sortArr.map((val, idx) => ({
        value: null
      }))
    })
    sortArr = bucketArr.reduce((arr, curArr) => arr.concat(curArr), [])
    animationHandler({
      bucketArr: bucketArr.map((val, idx) => ({
        value: null
      })),
      sortedArr: sortArr.map((val, idx) => ({
        value: val,
        isMerge: true
      }))
    })
  }

  return sortArr
}
