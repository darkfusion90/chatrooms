from random import randint

COLOR_RESET = '\033[0m'

with open('names.txt') as file:
    name_list = file.readlines()


def get_random_username():
    return name_list[randint(0, len(name_list)-1)].strip()


def print_star_line(color=COLOR_RESET):
    print(color, '*'*120, '\n', COLOR_RESET, sep='')