
import os

with open('db/sql scriptek/user1.csv', 'r', encoding='utf-8') as file:
    with open('db/sql scriptek/user.csv', 'w', encoding='utf-8') as file2:
        for line in file:
            for i in range(0,len(line)):
                if(line[i]==','):
                    irt_sor = line[(i+2):]
                    irt_sor = irt_sor.replace(',',';') + ';null'
                    file2.write(irt_sor)
                    break

