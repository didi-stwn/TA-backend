const path = require('path');
const config = require(path.join(__dirname,'..','config'));
const Pool = require('pg').Pool

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis
})

function isNumeric(num){
  return !isNaN(num)
}

function removeSpace(str){
  return str.trim(str.replace(/\s+/g, ''))
}

function cekSpaces(str){
  var valid = /\s+/g
  return !valid.test(str)
}

const getDevice = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM device WHERE koderuangan LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createDevice = (request, response) => {
  var { koderuangan } = request.body
  var lastseen = new Date().toLocaleString() + "+0"
  pool.query('INSERT INTO device (koderuangan, lastseen) VALUES ($1, $2)', [koderuangan,lastseen], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const updateDevice = (request, response) => {
  var {koderuangan,newlastseen} = request.body
  pool.query('UPDATE device set lastseen=($1) WHERE koderuangan=($2)',[newlastseen, koderuangan],(error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
      }
      else{
        response.status(200).send(`Updated`)
      }
    }
  )
}

const deleteDevice = (request, response) => {
  var {koderuangan} = request.body
  pool.query(`DELETE FROM device WHERE koderuangan = '${koderuangan}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getFakultasJurusan = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count:results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const getFakultasJurusanByFakultas = (request, response) => {
  var fakultas = removeSpace(request.params.fakultas)
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${fakultas}%' AND jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}


const createFakultasJurusan = (request, response) => {
  var { fakultas, jurusan } = request.body
  pool.query('INSERT INTO fakultasjurusan (fakultas, jurusan) VALUES ($1, $2)', [fakultas,jurusan], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const updateFakultasJurusan = (request, response) => {
  var { oldfakultas, oldjurusan, newjurusan } = request.body
  pool.query(`UPDATE fakultasjurusan set jurusan = '${newjurusan}' WHERE fakultas = '${oldfakultas}' AND jurusan = '${oldjurusan}'`, (error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
      }
      else{
        response.status(200).send(`Updated`)
      }
    }
  )
}

const deleteFakultasJurusan = (request, response) => {
  var {fakultas, jurusan} = request.body
  pool.query(`DELETE FROM fakultasjurusan WHERE fakultas = '${fakultas}' and jurusan = '${jurusan}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getFilterPengguna = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM filterpengguna WHERE nim LIKE '%${search}%' OR nama LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createFilterPengguna = (request, response) => {
  var { nim, nama, kodematkul, kelas } = request.body
  pool.query('INSERT INTO filterpengguna (nim, nama, kodematkul, kelas) VALUES ($1, $2, $3, $4)', [nim, nama, kodematkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const deleteFilterPengguna = (request, response) => {
  var {nim, nama, kodematkul, kelas} = request.body
  pool.query(`DELETE FROM filterpengguna WHERE nim = '${nim}' and nama ='${nama}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getFilterRuangan = (request, response) => {
  pool.query(`SELECT * FROM filterruangan`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createFilterRuangan = (request, response) => {
  var { hari, waktu, koderuangan, kodematkul, kelas  } = request.body
  pool.query('INSERT INTO filterruangan (hari, waktu, koderuangan, kodematkul, kelas) VALUES ($1, $2, $3, $4, $5)', [hari, waktu, koderuangan, kodematkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const deleteFilterRuangan = (request, response) => {
  var {hari, waktu, koderuangan, kodematkul, kelas } = request.body
  pool.query(`DELETE FROM filterruangan WHERE hari = '${hari}' and waktu = '${waktu}' and koderuangan = '${koderuangan}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getLog = (request, response) => {
  var {startDate,endDate, sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit
  var deaddate = new Date().toLocaleString()
  var date = deaddate + "+0"

  if ((startDate==null)&&(startDate==null)){
    pool.query(`SELECT * FROM log WHERE nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET')
      }
      else{
        response.status(200).json({
          count: results.rowCount,
          hasil: results.rows
        })
      }
    })
  }
  else if (startDate==null){
    pool.query(`SELECT * FROM log WHERE (waktu NOT BETWEEN '${endDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET')
      }
      else{
        response.status(200).json({
          count: results.rowCount,
          hasil: results.rows
        })
      }
    })
  }
  else if (endDate==null){
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET')
      }
      else{
        response.status(200).json({
          count: results.rowCount,
          hasil: results.rows
        })
      }
    })
  }
  else {
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${endDate}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET')
      }
      else{
        response.status(200).json({
          count: results.rowCount,
          hasil: results.rows
        })
      }
    })
  }
}

const getLogByNimDate = (request, response) => {
  var nim = removeSpace(request.params.nim)
  var {startDate,endDate} = request.body
  pool.query(`SELECT * FROM log WHERE nim = '${nim}' AND (waktu BETWEEN '${startDate}' AND '${endDate}')`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const createLog = (request, response) => {
  var {waktu, nama, nim, koderuangan, kodematkul} = request.body
  pool.query('INSERT INTO log (waktu, nama, nim, koderuangan, kodematkul) VALUES ($1, $2, $3, $4, $5)', [waktu, nama, nim, koderuangan, kodematkul], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const deleteLog= (request, response) => {
  var {startDate, endDate} = request.body
  pool.query(`DELETE FROM log WHERE waktu BETWEEN '${startDate}' AND '${endDate}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getMatkul = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM matkul WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR namamatkul LIKE '%${search}%' OR kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createMatkul = (request, response) => {
  var {fakultas, jurusan, kodematkul, namamatkul, kelas} = request.body
  pool.query('INSERT INTO matkul (fakultas, jurusan, kodematkul, namamatkul, kelas) VALUES ($1, $2, $3, $4, $5)', [fakultas, jurusan, kodematkul, namamatkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const updateMatkul = (request, response) => {
  var {oldkodematkul, oldkelas, newnamamatkul, newkelas} = request.body
  pool.query(`UPDATE matkul set namamatkul='${newnamamatkul}', kelas='${newkelas}' WHERE kodematkul='${oldkodematkul}' and kelas='${oldkelas}'`,(error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
      }
      else{
          response.status(200).send(`Updated`)
      }
    }
  )
}

const deleteMatkul = (request, response) => {
  var {kodematkul, namamatkul, kelas} = request.body
  pool.query(`DELETE FROM matkul WHERE kodematkul = '${kodematkul}' AND namamatkul = '${namamatkul}' AND kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getPengguna = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM pengguna WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count:results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const getPenggunaByFakultas = (request, response) => {
  var fakultas = removeSpace(request.params.fakultas)
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM pengguna WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count:results.rowCount,
        hasil: results.rows
      })
    }
  })
}


const createPengguna = (request, response) => {
  var { fakultas, jurusan, nim, nama, finger1, finger2 } = request.body
  pool.query('INSERT INTO pengguna (fakultas, jurusan, nim, nama, finger1, finger2) VALUES ($1, $2, $3, $4, $5, $6)', [fakultas, jurusan, nim, nama, finger1, finger2], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const updatePengguna = (request, response) => {
  var { oldnim, newnim, newnama, newfinger1, newfinger2 } = request.body
  pool.query(`UPDATE pengguna set nim='${newnim}', nama='${newnama}', finger1='${newfinger1}', finger2='${newfinger2}' WHERE nim='${oldnim}'`,(error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
      }
      else{
          response.status(200).send(`Updated`)
      }
    }
  )
}

const deletePengguna = (request, response) => {
  var {nim} = request.body
  pool.query(`DELETE FROM pengguna WHERE nim = '${nim}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

const getRuangan = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM ruangan WHERE koderuangan LIKE '%${search}%' OR alamat LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json({
        count:results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createRuangan = (request, response) => {
  var {koderuangan, alamat} = request.body
  pool.query('INSERT INTO ruangan (koderuangan, alamat) VALUES ($1, $2)', [koderuangan, alamat], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Added`)
    }
  })
}

const updateRuangan = (request, response) => {
  var { oldkoderuangan, newalamat } = request.body
  pool.query(`UPDATE ruangan set alamat='${newalamat}' WHERE koderuangan='${oldkoderuangan}'`,(error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
      }
      else{
          response.status(200).send(`Updated`)
      }
    }
  )
}

const deleteRuangan = (request, response) => {
  var {koderuangan} = request.body
  pool.query(`DELETE FROM ruangan WHERE koderuangan = '${koderuangan}'`, (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
    }
    else{
      response.status(200).send(`Deleted`)
    }
  })
}

module.exports = {
  //device
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  //fakultasjurusan
  getFakultasJurusan,
  getFakultasJurusanByFakultas,
  createFakultasJurusan,
  updateFakultasJurusan,
  deleteFakultasJurusan,
  //filterpengguna
  getFilterPengguna,
  createFilterPengguna,
  deleteFilterPengguna,
  //filterruangan
  getFilterRuangan,
  createFilterRuangan,
  deleteFilterRuangan,
  //log
  getLog,
  getLogByNimDate,
  createLog,
  deleteLog,
  //matkul
  getMatkul,
  createMatkul,
  updateMatkul,
  deleteMatkul,
  //pengguna
  getPengguna,
  getPenggunaByFakultas,
  createPengguna,
  updatePengguna,
  deletePengguna,
  //ruangan
  getRuangan,
  createRuangan,
  updateRuangan,
  deleteRuangan
}
