# login
# header "Content-Type: application/json" 
# request POST 
# data '{"username":"coeg","password":"coegbanget"}' 
# http://localhost:3000/login

# refresh token
# header "Content-Type: application/json" 
# request POST 
# data '{"old_access_token":"masukan token yang masih aktif"}' 
# http://localhost:3000/refresh





# ----------------Log ------------------------
# Read data log
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"startDate":"2019-01-01 01:01:01/null", "endDate":"2019-01-01 01:01:01/null", "sortby":"waktu/nama/nim/koderuangan/kodematkul/status", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/log/read

# Read data log berdasarkan nim dan tanggal
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"startDate":"2019-01-01 01:01:01", "endDate":"2019-01-01 01:01:01"}' 
# http://localhost:3000/log/read/:nim

# create data log
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"waktu":"2019-01-01 01:01:01", "nama":"didi", "nim":"1321", "koderuangan":"9090", "kodematkul":"EL4000", "status":"1(hadir)/2(sakit)/3(izin)"}' 
# http://localhost:3000/log/create

# delete data log
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"startDate":"2019-01-01 01:01:01", "endDate":"2019-01-01 01:01:01"}' 
# http://localhost:3000/log/delete





# ----------------Pengguna------------------------
# Read data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan/nim/nama", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna/read

# Read data pengguna berdasarkan fakultas
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"jurusan/nim/nama", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna/read/:fakultas

# create data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"STEI", "jurusan":"EL", "nim":"1321", "nama":"DIDI", "finger1":"xxx", "finger2":"xxx"}' 
# http://localhost:3000/pengguna/create

# update data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldnim":"1321", "newnim":"1234", "newnama":"didi", "newfinger1":"yyy", "newfinger2":"yyy"}' 
# http://localhost:3000/pengguna/update

# delete data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"nim":"13216"}' 
# http://localhost:3000/pengguna/delete





# ----------------Filter Pengguna------------------------
# Read data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"nim/nama/kodematkul/kelas", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/filterpengguna/read

# create data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"nim":"13216000", "nama":"didi", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterpengguna/create

# delete data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"nim":"13216000", "nama":"didi", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterpengguna/delete





# ----------------Ruangan ------------------------
# Read data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"koderuangan/alamat", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/ruangan/read

# create data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"koderuangan":"4000", "alamat":"GKUT"}' 
# http://localhost:3000/ruangan/create

# update data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldkoderuangan":"4000", "newalamat":"GKUB"}' 
# http://localhost:3000/ruangan/update

# delete data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"koderuangan":"13216"}' 
# http://localhost:3000/ruangan/delete


# ----------------Filter Ruangan------------------------
# Read data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# http://localhost:3000/filterruangan/read

# create data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"hari":"1-7", "jam":"1-24", "durasi":"1/2","koderuangan":"9191", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterruangan/create

# delete data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"hari":"1-7", "jam":"1-24", "koderuangan":"9191", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterruangan/delete



# ----------------Fakultas Jurusan ------------------------
# Read data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/fakultasjurusan/read

# Read data fakultas jurusan berdasarkan fakultas
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"jurusan", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/fakultasjurusan/read/:fakultas

# create data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"stei", "jurusan":"elektro"}' 
# http://localhost:3000/fakultasjurusan/create

# edit data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldfakultas":"stei","oldjurusan":"elektro", "newjurusan":"EB"}' 
# http://localhost:3000/fakultasjurusan/update

# delete data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"fakultas":"stei", "jurusan":"elektro"}' 
# http://localhost:3000/fakultasjurusan/delete





# ----------------Matkul ------------------------
# Read data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan/namamatkul/kodematkul/kelas", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna/read

# create data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"STEI", "jurusan":"EL", "kodematkul":"1321", "namamatkul":"DIDI", "kelas":"xxx"}' 
# http://localhost:3000/pengguna/create

# update data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldkodematkul":"1321", "oldkelas":"1234", "newnamamatkul":"didi", "newkelas":"1111"}' 
# http://localhost:3000/pengguna/update

# delete data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"kodematkul":"1321", "namamatkul":"DIDI", "kelas":"xxx"}' 
# http://localhost:3000/pengguna/delete





# ---------------- Device ------------------------
# Read data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"koderuangan/lastseen", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/device/read

# create data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"koderuangan":"9012"}' 
# http://localhost:3000/device/create

# edit data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"koderuangan":"2999", "newlastseen":"2019-01-01 01:01:01"}' 
# http://localhost:3000/device/update

# delete data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"koderuangan":"2999"}' 
# http://localhost:3000/device/delete