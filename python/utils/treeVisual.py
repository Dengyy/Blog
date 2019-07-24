import math
from io import StringIO
from colorama import init, Fore, Back, Style

init(convert=True)

def show_tree(tree, total_width=36, fill=' ', **kw):
    """Pretty-print a tree."""
    print(tree)    
    output = StringIO()
    last_row = -1
    for i, n in enumerate(tree):
        if i:
            row = int(math.floor(math.log(i + 1, 2)))
        else:
            row = 0
        if row != last_row:
            output.write('\n')
        columns = 2 ** row
        col_half_width = int(math.floor(total_width / columns / 2))
        output_char = str(n)
        if i == kw['fromIndex']:
            output_char = Fore.YELLOW + output_char + Style.RESET_ALL
        elif i == kw['toIndex']:
            output_char = Fore.BLUE + output_char + Style.RESET_ALL
        output.write(col_half_width * fill + output_char + col_half_width * fill)
        last_row = row
    print(output.getvalue())
    print('-' * total_width)
    print()