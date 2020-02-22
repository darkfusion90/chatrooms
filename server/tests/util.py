from random import randint

with open('names.txt') as file:
    name_list = file.readlines()


def get_random_username():
    return name_list[randint(0, len(name_list)-1)].strip()
