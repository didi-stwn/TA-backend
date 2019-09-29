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
# data '{"startDate":"2019-01-01 01:01:01+0/null", "endDate":"2019-01-01 01:01:01+0/null", "sortby":"waktu/nama/nim/koderuangan/kodematkul", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/log

# Read data log berdasarkan nim dan tanggal
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"startDate":"2019-01-01 01:01:01+0", "endDate":"2019-01-01 01:01:01+0"}' 
# http://localhost:3000/log/:nim

# create data log
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"waktu":"2019-01-01 01:01:01+0", "nama":"didi", "nim":"1321", "koderuangan":"9090", "kodematkul":"EL4000"}' 
# http://localhost:3000/log

# delete data log
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"startDate":"2019-01-01 01:01:01+0", "endDate":"2019-01-01 01:01:01+0"}' 
# http://localhost:3000/log





# ----------------Pengguna------------------------
# Read data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan/nim/nama", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna

# Read data pengguna berdasarkan fakultas
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"jurusan/nim/nama", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna/:fakultas

# create data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"STEI", "jurusan":"EL", "nim":"1321", "nama":"DIDI", "finger1":"xxx", "finger2":"xxx"}' 
# http://localhost:3000/pengguna

# update data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldnim":"1321", "newnim":"1234", "newnama":"didi", "newfinger1":"yyy", "newfinger2":"yyy"}' 
# http://localhost:3000/pengguna

# delete data pengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"nim":"13216"}' 
# http://localhost:3000/pengguna





# ----------------Filter Pengguna------------------------
# Read data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"nim/nama/kodematkul/kelas", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/filterpengguna

# create data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"nim":"13216000", "nama":"didi", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterpengguna

# delete data filterpengguna
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"nim":"13216000", "nama":"didi", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterpengguna





# ----------------Ruangan ------------------------
# Read data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"koderuangan/alamat", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/ruangan

# create data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"koderuangan":"4000", "alamat":"GKUT"}' 
# http://localhost:3000/ruangan

# update data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldkoderuangan":"4000", "newalamat":"GKUB"}' 
# http://localhost:3000/ruangan

# delete data ruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"koderuangan":"13216"}' 
# http://localhost:3000/ruangan





# ----------------Filter Ruangan------------------------
# Read data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# http://localhost:3000/filterruangan

# create data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"hari":"1", "waktu":"2019-01-01 01:01:01+0(ambil jamnya aja sisanya tulis ulang di frontend)", "koderuangan":"9191", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterruangan

# delete data filterruangan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"hari":"1", "waktu":"2019-01-01 01:01:01+0(ambil jamnya aja sisanya tulis ulang di frontend)", "koderuangan":"9191", "kodematkul":"EL4000", "kelas":"K01"}' 
# http://localhost:3000/filterruangan





# ----------------Fakultas Jurusan ------------------------
# Read data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/fakultasjurusan

# Read data fakultas jurusan berdasarkan fakultas
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"jurusan", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/fakultasjurusan/:fakultas

# create data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"stei", "jurusan":"elektro"}' 
# http://localhost:3000/fakultasjurusan

# edit data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldfakultas":"stei","oldjurusan":"elektro", "newjurusan":"EB"}' 
# http://localhost:3000/fakultasjurusan

# delete data fakultas jurusan
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"fakultas":"stei", "jurusan":"elektro"}' 
# http://localhost:3000/fakultasjurusan





# ----------------Matkul ------------------------
# Read data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"fakultas/jurusan/namamatkul/kodematkul/kelas", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/pengguna

# create data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"fakultas":"STEI", "jurusan":"EL", "kodematkul":"1321", "namamatkul":"DIDI", "kelas":"xxx"}' 
# http://localhost:3000/pengguna

# update data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"oldkodematkul":"1321", "oldkelas":"1234", "newnamamatkul":"didi", "newkelas":"1111"}' 
# http://localhost:3000/pengguna

# delete data Matkul
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"kodematkul":"1321", "namamatkul":"DIDI", "kelas":"xxx"}' 
# http://localhost:3000/pengguna





# ---------------- Device ------------------------
# Read data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request GET 
# data '{"sortby":"koderuangan/lastseen", "ascdsc":"asc/desc", "search":"", "limit":"1", "page":"1"}' 
# http://localhost:3000/device

# create data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request POST
# data '{"koderuangan":"9012"}' 
# http://localhost:3000/device

# edit data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request PUT
# data '{"koderuangan":"2999", "newlastseen":"2019-01-01 01:01:01+0"}' 
# http://localhost:3000/device/

# delete data device
# header "Content-Type: application/json" 
# header "x-access-token: token dari login" 
# request DELETE 
# data '{"koderuangan":"2999"}' 
# http://localhost:3000/device/