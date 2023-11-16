-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-11-11 19:43:41.786

-- tables
-- Table: cim
CREATE TABLE cim (
    id int  NOT NULL AUTO_INCREMENT,
    iranyitoszam varchar(50),
    telepules varchar(50)  NOT NULL,
    kozterulet varchar(50)  NOT NULL,
    hazszam varchar(50)  NOT NULL COMMENT 'ffi: 1, no:0',
    CONSTRAINT helyszin_pk PRIMARY KEY (id)
);

-- Table: eloado
CREATE TABLE eloado (
    id int  NOT NULL AUTO_INCREMENT,
    nev varchar(50)  NOT NULL,
    leiras varchar(400)  NULL,
    kep_eleres varchar(100)  NOT NULL,
    CONSTRAINT eloado_pk PRIMARY KEY (id)
);

-- Table: eloado_mufaj
CREATE TABLE eloado_mufaj (
    id int  NOT NULL AUTO_INCREMENT,
    eloado_id int  NOT NULL,
    mufaj_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: eloado_tag
CREATE TABLE eloado_tag (
    id int  NOT NULL AUTO_INCREMENT,
    eloado_id int  NOT NULL,
    tag_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: esemeny
CREATE TABLE esemeny (
    id int  NOT NULL AUTO_INCREMENT,
    idopont datetime  NOT NULL,
    jegy_alapar int  NOT NULL,
    eloado_id int  NOT NULL,
    helyszin_id int  NOT NULL,
    CONSTRAINT esemeny_pk PRIMARY KEY (id)
);

-- Table: fizetes
CREATE TABLE fizetes (
    id int  NOT NULL AUTO_INCREMENT,
    fizetes_idopont timestamp  NOT NULL,
    fizetes_osszeg int  NOT NULL,
    fizetes_tipusa varchar(50)  NOT NULL,
    szamlazasi_cim_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: helyszin
CREATE TABLE helyszin (
    id int  NOT NULL AUTO_INCREMENT,
    nev varchar(50)  NOT NULL,
    cim_id int  NOT NULL,
    kapacitas int  NOT NULL,
    kontakt_informacio varchar(50)  NOT NULL COMMENT 'ffi: 1, no:0',
    szabadteri bool  NOT NULL,
    helyszin_kep_eleres varchar(100)  NOT NULL,
    CONSTRAINT helyszin_pk PRIMARY KEY (id)
);

CREATE INDEX helyszin_idx_nev ON helyszin (nev,id);

-- Table: helyszin_szektor
CREATE TABLE helyszin_szektor (
    id int  NOT NULL AUTO_INCREMENT,
    szektor_id int  NOT NULL,
    helyszin_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: jegy_adat
CREATE TABLE jegy_adat (
    id int  NOT NULL AUTO_INCREMENT,
    esemeny_id int  NOT NULL,
    helyszin_id int  NOT NULL,
    szektor varchar(20)  NOT NULL,
    sorjelzes varchar(20)  NULL,
    ulohely int  NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: jegy_adat_kedvezmeny
CREATE TABLE jegy_adat_kedvezmeny (
    id int  NOT NULL AUTO_INCREMENT,
    kedvezmeny_id int  NOT NULL,
    jegy_adat_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: jegy_adat_rendeles
CREATE TABLE jegy_adat_rendeles (
    id int  NOT NULL AUTO_INCREMENT,
    jegy_darab int  NOT NULL,
    rendeles_id int  NOT NULL,
    jegy_adat_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: kedvelt_eloado
CREATE TABLE kedvelt_eloado (
    id int  NOT NULL AUTO_INCREMENT,
    eloado_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT rendeles_pk PRIMARY KEY (id)
);

-- Table: kedvezmeny
CREATE TABLE kedvezmeny (
    id int  NOT NULL AUTO_INCREMENT,
    leiras varchar(50)  NULL,
    kedvezmeny_tipus varchar(20)  NOT NULL,
    kedvezmeny_erteke decimal(3,3)  NOT NULL,
    CONSTRAINT jegy_kedvezmeny_pk PRIMARY KEY (id)
);

-- Table: mufaj
CREATE TABLE mufaj (
    id int  NOT NULL AUTO_INCREMENT,
    nev varchar(50)  NOT NULL,
    leiras varchar(255)  NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: rendeles
CREATE TABLE rendeles (
    id int  NOT NULL AUTO_INCREMENT,
    rendeles_idopont timestamp  NOT NULL,
    user_id int  NOT NULL,
    fizetes_id int  NOT NULL,
    CONSTRAINT rendeles_pk PRIMARY KEY (id)
);

-- Table: szektor
CREATE TABLE szektor (
    id int  NOT NULL AUTO_INCREMENT,
    szektor_tipus varchar(50)  NOT NULL,
    arszorzo decimal(4,2)  NOT NULL,
    max_kapacitas int  NOT NULL,
    nezoszam int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: szektor_ulohelyek
CREATE TABLE szektor_ulohelyek (
    id int  NOT NULL AUTO_INCREMENT,
    szektor_id int  NOT NULL,
    ulohelyek_id int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE tag (
    id int  NOT NULL AUTO_INCREMENT,
    nev varchar(50)  NOT NULL,
    CONSTRAINT eloado_pk PRIMARY KEY (id)
);

-- Table: ulohelyek
CREATE TABLE ulohelyek (
    id int  NOT NULL AUTO_INCREMENT,
    sorjelzes varchar(50)  NOT NULL,
    ulesszam int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
    id int  NOT NULL AUTO_INCREMENT,
    vezeteknev varchar(50)  NOT NULL,
    keresztnev varchar(50)  NOT NULL,
    email varchar(255)  NOT NULL,
    nem char(1)  NOT NULL COMMENT 'ffi: 1, no:0',
    szuletesi_datum date  NOT NULL,
    felhasznalonev varchar(50)  NOT NULL,
    jelszo varchar(50)  NOT NULL,
    profilkep_eleres varchar(100)  NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
) COMMENT 'kész';

-- foreign keys
-- Reference: Copy_of_eloado_mufaj_eloado (table: eloado_tag)
ALTER TABLE eloado_tag ADD CONSTRAINT Copy_of_eloado_mufaj_eloado FOREIGN KEY Copy_of_eloado_mufaj_eloado (eloado_id)
    REFERENCES eloado (id);

-- Reference: Copy_of_eloado_mufaj_helyszin (table: helyszin_szektor)
ALTER TABLE helyszin_szektor ADD CONSTRAINT Copy_of_eloado_mufaj_helyszin FOREIGN KEY Copy_of_eloado_mufaj_helyszin (helyszin_id)
    REFERENCES helyszin (id);

-- Reference: cim_fizetes (table: fizetes)
ALTER TABLE fizetes ADD CONSTRAINT cim_fizetes FOREIGN KEY cim_fizetes (szamlazasi_cim_id)
    REFERENCES cim (id);

-- Reference: cim_helyszin (table: helyszin)
ALTER TABLE helyszin ADD CONSTRAINT cim_helyszin FOREIGN KEY cim_helyszin (cim_id)
    REFERENCES cim (id);

-- Reference: eloado_esemeny (table: esemeny)
ALTER TABLE esemeny ADD CONSTRAINT eloado_esemeny FOREIGN KEY eloado_esemeny (eloado_id)
    REFERENCES eloado (id);

-- Reference: eloado_mufaj_eloado (table: eloado_mufaj)
ALTER TABLE eloado_mufaj ADD CONSTRAINT eloado_mufaj_eloado FOREIGN KEY eloado_mufaj_eloado (eloado_id)
    REFERENCES eloado (id);

-- Reference: eloado_user_eloado (table: kedvelt_eloado)
ALTER TABLE kedvelt_eloado ADD CONSTRAINT eloado_user_eloado FOREIGN KEY eloado_user_eloado (eloado_id)
    REFERENCES eloado (id);

-- Reference: esemeny_helyszin (table: esemeny)
ALTER TABLE esemeny ADD CONSTRAINT esemeny_helyszin FOREIGN KEY esemeny_helyszin (helyszin_id)
    REFERENCES helyszin (id);

-- Reference: fizetes_adat_rendeles (table: rendeles)
ALTER TABLE rendeles ADD CONSTRAINT fizetes_adat_rendeles FOREIGN KEY fizetes_adat_rendeles (fizetes_id)
    REFERENCES fizetes (id);

-- Reference: helyszin_jegy_adat (table: jegy_adat)
ALTER TABLE jegy_adat ADD CONSTRAINT helyszin_jegy_adat FOREIGN KEY helyszin_jegy_adat (helyszin_id)
    REFERENCES helyszin (id);

-- Reference: jegy_adat_esemeny (table: jegy_adat)
ALTER TABLE jegy_adat ADD CONSTRAINT jegy_adat_esemeny FOREIGN KEY jegy_adat_esemeny (esemeny_id)
    REFERENCES esemeny (id);

-- Reference: jegy_adat_jegy_adat_rendeles (table: jegy_adat_rendeles)
ALTER TABLE jegy_adat_rendeles ADD CONSTRAINT jegy_adat_jegy_adat_rendeles FOREIGN KEY jegy_adat_jegy_adat_rendeles (jegy_adat_id)
    REFERENCES jegy_adat (id);

-- Reference: jegy_adat_kedvezmeny_jegy_adat (table: jegy_adat_kedvezmeny)
ALTER TABLE jegy_adat_kedvezmeny ADD CONSTRAINT jegy_adat_kedvezmeny_jegy_adat FOREIGN KEY jegy_adat_kedvezmeny_jegy_adat (jegy_adat_id)
    REFERENCES jegy_adat (id);

-- Reference: jegy_adat_rendeles_rendeles (table: jegy_adat_rendeles)
ALTER TABLE jegy_adat_rendeles ADD CONSTRAINT jegy_adat_rendeles_rendeles FOREIGN KEY jegy_adat_rendeles_rendeles (rendeles_id)
    REFERENCES rendeles (id);

-- Reference: kedvezmeny_jegy_adat_kedvezmeny (table: jegy_adat_kedvezmeny)
ALTER TABLE jegy_adat_kedvezmeny ADD CONSTRAINT kedvezmeny_jegy_adat_kedvezmeny FOREIGN KEY kedvezmeny_jegy_adat_kedvezmeny (kedvezmeny_id)
    REFERENCES kedvezmeny (id);

-- Reference: mufaj_eloado_mufaj (table: eloado_mufaj)
ALTER TABLE eloado_mufaj ADD CONSTRAINT mufaj_eloado_mufaj FOREIGN KEY mufaj_eloado_mufaj (mufaj_id)
    REFERENCES mufaj (id);

-- Reference: rendeles_user (table: rendeles)
ALTER TABLE rendeles ADD CONSTRAINT rendeles_user FOREIGN KEY rendeles_user (user_id)
    REFERENCES user (id);

-- Reference: szektor_Copy_of_eloado_mufaj (table: helyszin_szektor)
ALTER TABLE helyszin_szektor ADD CONSTRAINT szektor_Copy_of_eloado_mufaj FOREIGN KEY szektor_Copy_of_eloado_mufaj (szektor_id)
    REFERENCES szektor (id);

-- Reference: szektor_ulohely_szektor (table: szektor_ulohelyek)
ALTER TABLE szektor_ulohelyek ADD CONSTRAINT szektor_ulohely_szektor FOREIGN KEY szektor_ulohely_szektor (szektor_id)
    REFERENCES szektor (id);

-- Reference: ulohely_szektor_ulohely (table: szektor_ulohelyek)
ALTER TABLE szektor_ulohelyek ADD CONSTRAINT ulohely_szektor_ulohely FOREIGN KEY ulohely_szektor_ulohely (ulohelyek_id)
    REFERENCES ulohelyek (id);

-- Reference: user_eloado_user (table: kedvelt_eloado)
ALTER TABLE kedvelt_eloado ADD CONSTRAINT user_eloado_user FOREIGN KEY user_eloado_user (user_id)
    REFERENCES user (id);

-- Reference: zenesz_Copy_of_eloado_mufaj (table: eloado_tag)
ALTER TABLE eloado_tag ADD CONSTRAINT zenesz_Copy_of_eloado_mufaj FOREIGN KEY zenesz_Copy_of_eloado_mufaj (tag_id)
    REFERENCES tag (id);

-- End of file.

