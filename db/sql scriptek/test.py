import random;

#with open('db/sql scriptek/szektor10.csv', 'w') as file:
#    osszeshely=0
#    file.write("l10_center;Center;allo;1.7;2300;null;l10\n")
#    for betu in 'abcdefgh':
#        maxKapacitas = 125
#        arszorzo = 1.60
#        arszorzo = round(arszorzo,2)
#        for betu2 in "abc":
#            file.write("l10_"+betu+"_also_"+betu2+";"+betu.upper()+"-alsó;ulo;"+str(arszorzo)+";"+str(round(maxKapacitas,0))+";"+betu2.upper()+";l10\n")
#            osszeshely+=maxKapacitas
#            maxKapacitas+=8
#            arszorzo-=0.1
#            arszorzo = round(arszorzo,2)
#        file.write("l10_"+betu+"_felso_e;"+betu.upper()+"-felső;ulo;1;"+str(round(maxKapacitas,0))+";E;l10\n")
#    file.write(str(osszeshely))
#file.close()

with open('db/sql scriptek/user.csv', 'r+') as file:
    fileLista = file.readlines()
    for sor in fileLista:
        file.write(sor+";"+str(random.randint(1,5)))   
file.close
