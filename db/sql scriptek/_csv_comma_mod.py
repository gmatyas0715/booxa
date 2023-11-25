
import os

with open('mufaj.csv', 'r', encoding='utf-8') as file:
    with open('mufaj_mod.csv', 'w', encoding='utf-8') as file2:
        for line in file:
            file2.write(line.replace(',',';',1))
