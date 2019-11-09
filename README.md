# API Database Server TA 026 Sistem Absensi
Repository Backend pada server sistem absensi

>Server API ini dibuat dengan menggunakan ExpressJS yang merupakan web framework untuk Node.JS dan menggunakan postgreSQL untuk database nya. Server ini dapat menerima HTTP request method GET, POST, PUT, dan DELETE dengan dilengkapi autentikasi menggunakan token.

## Table of Contents
1. [Prerequisites](#Prerequisites)
2. [Installation](#Installation)
    - [Database PostgreSQL](#Database-PostgreSQL)
    - [Server Node JS](#Server-Node-JS)
3. [Run Server](#Run-Server)
4. [API Request](#API-Request)
5. [Instalasi Express JS](#Instalasi-Express-JS)

## Prerequisites
- PostgreSQL
```sh
$ sudo apt install postgresql
```
- Node.JS and NPM (NodeJS Package Manager)
```sh
$ sudo apt install nodejs
$ sudo apt install npm
```
## Installation
### Database PostgreSQL
Database dibuat menggunakan 2 tabel dengan format berikut:
- Tabel *log*

|column|Data Type|Modifiers|Description|
|:---:|:----:|:----:|:---:|
|nim|varchar(30)|not null|primary key|
|nama|varchar(30)|not null||
|waktu|timestamptz|not null||
|kodematkul|varchar(30)|not null||
|koderuangan|varchar(30)|not null||

- Tabel *pengguna*

|column|Data Type|Modifiers|Description|
|:---:|:----:|:----:|:---:|
|fakultas|varchar(30)|not null||
|jurusan|varchar(30)|not null||
|nim|varchar(30)|not null|primary key|
|nama|varchar(30)|not null||
|finger1|varchar(50)|not null||
|finger2|varchar(50)|not null||

Penjelasan tentang tipe data di postgreSQL dapat dilihat di http://www.postgresqltutorial.com/postgresql-data-types/

**Langkah pembuatan database dan tabel**
1. Buat database baru
```sh
$ sudo -u postgres psql
postgres=# create database <nama database>;
```
2. Buat user baru dan berikan akses penuh ke database baru yang sudah dibuat
```sh
postgres=# create user <nama user (diharap user laptop)> with encrypted password '<user password (diharap password laptop)>';
postgres=# grant all privileges on database <nama database> to <nama user>;
postgres=# \q
```
3. Masuk ke database yang telah dibuat
>Untuk log in dengan ident based authentication dibutuhkan nama linux user yang sama dengan nama user pada postgresql, jika berbeda dapat ditambahkan dengan cara `sudo adduser <nama user>`

```sh
$ sudo -i -u <nama user>
$ psql <nama database>
```
>kemudian akan muncul `<nama database>=#` pada terminal
4. Buat tabel baru dengan nama card dan terminal menggunakan format seperti [diatas](#Database-postgreSQL)
```sql
create table log(
    nim varchar(30) primary key,
    nama varchar(30) not null,
    waktu timestamptz not null,
    kodematkul varchar(30) not null,
    koderuangan varchar(30) not null
);

create table pengguna(
    fakultas varchar(30) not null,
    jurusan varchar(30) not null,
    nim varchar(30) primary key,
    nama varchar(30) not null,
    finger1 varchar(50) not null,
    finger2 varchar(50) not null
);
```

### Server Node JS
1. Clone repository ini ke komputer server
```sh
$ git clone https://github.com/didi-stwn/TA-backend.git
```
2. Masuk ke directory repository `cd TA-backend`, kemudian masukkan perintah:
```sh
$ sudo npm install
```
3. Cek settingan database pada file config.js


## Run Server
Nyalakan server dengan memasukkan perintah `npm start` pada *root directory* repository ini

## API Request
Server API ini memiliki 4 fungsi utama untuk modifikasi database, fungsi-fungsi tersebut adalah *Read*, *Create*, *Edit*, dan *Delete*. Serta semua autentikasi dilakukan dengan cara memberikan header pada setiap request dengan format  'x-access-token:{token}'. untuk lebih jelasnya dapat dilihat pada file API.sh


### Instalasi Express JS
pilih direktori tempat aplikasi express akan diinstall atau buat direktori baru dengan cara:
```sh
$ mkdir myapp
$ cd myapp
$ 
```

kemudian, install express js dengan cara: 
```sh
$ npx express-generator
```

kemudian, install node module dengan cara: 
```sh
$ npm install
```

untuk memulai aplikasinya dapat dilakukan dengan cara:
```sh
$ npm start
```
