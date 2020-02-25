from random import randint

COLOR_RESET = '\033[0m'

with open('names.txt') as file:
    username_list = file.readlines()

with open('words.txt') as file:
    room_name_list = file.readlines()


def get_random(_list):
    return _list[randint(0, len(_list)-1)].strip()


def get_random_username():
    return get_random(username_list)


def get_random_room_name():
    return get_random(room_name_list)


def print_star_line(color=COLOR_RESET):
    print(color, '*'*120, '\n', COLOR_RESET, sep='')
