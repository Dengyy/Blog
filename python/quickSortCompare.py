def qsort3(alist, lower, upper):
    print('--------------lower', lower, 'upper', upper)
    if lower >= upper:
        return

    pivot = alist[lower]
    left, right = lower + 1, upper
    while left <= right:
        while left <= right and alist[left] < pivot:
            left += 1
        while left <= right and alist[right] >= pivot:
            right -= 1
        print('=================left', left, 'right', right)
        if left > right:
            break
        # swap while left <= right
        alist[left], alist[right] = alist[right], alist[left]
    # swap the smaller with pivot
    alist[lower], alist[right] = alist[right], alist[lower]

    qsort3(alist, lower, right - 1)
    qsort3(alist, right + 1, upper)

def qsort2(alist, l, u):
    print('--------------lower', l, 'upper', u)
    if l >= u:
        return

    m = l
    for i in range(l + 1, u + 1):
        if alist[i] < alist[l]:
            m += 1
            alist[m], alist[i] = alist[i], alist[m]
        print('=================i', i, 'm', m)
        
    # swap between m and l after partition, important!
    alist[m], alist[l] = alist[l], alist[m]
    qsort2(alist, l, m - 1)
    qsort2(alist, m + 1, u)

def compare(array):
    print('|||||||||||', array, '||||||||||')
    print('------one index partition-------')
    qsort2(array, 0, len(array) - 1)
    print()
    print('-------two-way partition--------')
    qsort3(array, 0, len(array) - 1)

compare([1, 2, 3, 4, 5, 6])
compare([1, 1, 1, 1, 1, 1])
compare([6, 5, 3, 1, 8, 2])
