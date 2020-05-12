const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const Pool = require('pg').Pool
const jwt = require('jsonwebtoken');
var net = require('net');

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis
})

function isNumeric(num) {
  return !isNaN(num)
}

function removeSpace(str) {
  return str.trim(str.replace(/\s+/g, ''))
}

function cekSpaces(str) {
  var valid = /\s+/g
  return !valid.test(str)
}

// const getDevice = (request, response) => {
//   var {sortby, ascdsc, search, page, limit} = request.body
//   var offset = page*limit-limit;
//   pool.query(`SELECT * FROM device WHERE koderuangan LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: 'Failed to GET',
//       })
//     }
//     else{
//       pool.query(`SELECT * FROM device WHERE koderuangan LIKE '%${search}%'`, (error, result) => {
//         response.status(200).json({
//           status: 1,
//           count: result.rowCount,
//           hasil: results.rows
//         })
//       })
//     }
//   })
// }

// const createDevice = (request, response) => {
//   var { koderuangan } = request.body
//   var lastseen = new Date().toLocaleString() + "+0"
//   pool.query('INSERT INTO device (koderuangan, lastseen) VALUES ($1, $2)', [koderuangan,lastseen], (error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//     else{
//       response.status(200).json({
//         status: 1,
//         pesan: "Data added"
//       })
//     }
//   })
// }

// const updateDevice = (request, response) => {
//   var {koderuangan,newlastseen} = request.body
//   pool.query('UPDATE device set lastseen=($1) WHERE koderuangan=($2)',[newlastseen, koderuangan],(error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//     else{
//       response.status(200).json({
//         status: 1,
//         pesan: "Data updated"
//       })
//     }
//   })
// }

// const deleteDevice = (request, response) => {
//   var {koderuangan} = request.body
//   pool.query(`DELETE FROM device WHERE koderuangan = '${koderuangan}'`, (error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//     else{
//       response.status(200).json({
//         status: 1,
//         pesan: "Data deleted"
//       })
//     }
//   })
// }

const getFakultasJurusan = (request, response) => {
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getFakultasJurusanByFakultas = (request, response) => {
  var fakultas = removeSpace(request.params.fakultas)
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${fakultas}%' AND jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${fakultas}%' AND jurusan LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}


const createFakultasJurusan = (request, response) => {
  var { fakultas, jurusan } = request.body
  pool.query('INSERT INTO fakultasjurusan (fakultas, jurusan) VALUES ($1, $2)', [fakultas, jurusan], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateFakultasJurusan = (request, response) => {
  var { oldfakultas, oldjurusan, newjurusan } = request.body
  pool.query(`UPDATE fakultasjurusan set jurusan = '${newjurusan}' WHERE fakultas = '${oldfakultas}' AND jurusan = '${oldjurusan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  })
}

const deleteFakultasJurusan = (request, response) => {
  var { fakultas, jurusan } = request.body
  pool.query(`DELETE FROM fakultasjurusan WHERE fakultas = '${fakultas}' and jurusan = '${jurusan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFilterPengguna = (request, response) => {
  var { sortby, ascdsc, search, page, limit, nimfilter } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT a.nim, a.nama, a.kodematkul, b.namamatkul, a.kelas FROM filterpengguna a inner join matkul b on a.kodematkul = b.kodematkul AND a.kelas = b.kelas and a.nim LIKE '%${nimfilter}%' WHERE a.kodematkul LIKE '%${search}%' OR b.namamatkul LIKE '%${search}%' OR a.kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT a.nim, a.nama, a.kodematkul, b.namamatkul, a.kelas FROM filterpengguna a inner join matkul b on a.kodematkul = b.kodematkul AND a.kelas = b.kelas and a.nim LIKE '%${nimfilter}%' WHERE a.kodematkul LIKE '%${search}%' OR b.namamatkul LIKE '%${search}%' OR a.kelas LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const createFilterPengguna = (request, response) => {
  var { nim, nama, kodematkul, kelas } = request.body
  pool.query('INSERT INTO filterpengguna (nim, nama, kodematkul, kelas) VALUES ($1, $2, $3, $4)', [nim, nama, kodematkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteFilterPengguna = (request, response) => {
  var { nim, nama, kodematkul, kelas } = request.body
  pool.query(`DELETE FROM filterpengguna WHERE nim = '${nim}' and nama ='${nama}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFilterDosen = (request, response) => {
  var { sortby, ascdsc, search, page, limit, nipfilter } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT a.nip, a.nama, a.kodematkul, b.namamatkul, a.kelas FROM filterdosen a inner join matkul b on a.kodematkul = b.kodematkul AND a.kelas = b.kelas and a.nip LIKE '%${nipfilter}%' WHERE a.kodematkul LIKE '%${search}%' OR b.namamatkul LIKE '%${search}%' OR a.kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT a.nip, a.nama, a.kodematkul, b.namamatkul, a.kelas FROM filterdosen a inner join matkul b on a.kodematkul = b.kodematkul AND a.kelas = b.kelas and a.nip LIKE '%${nipfilter}%' WHERE a.kodematkul LIKE '%${search}%' OR b.namamatkul LIKE '%${search}%' OR a.kelas LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getMatkulByNip = (request, response) => {
  var { nip } = request.params
  pool.query(`SELECT kodematkul, kelas from filterdosen where nip='${nip}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}


// const createFilterDosen = (request, response) => {
//   var { nip, nama, kodematkul, kelas } = request.body
//   pool.query(`SELECT nip FROM filterdosen WHERE kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//     else if (results.rowCount > 5) {
//       response.status(400).send({
//         status: 2,
//         pesan: "Dosen is Full"
//       })
//     }
//     else {
//       pool.query('INSERT INTO filterdosen (nip, nama, kodematkul, kelas) VALUES ($1, $2, $3, $4)', [nip, nama, kodematkul, kelas], (error, result) => {
//         if (error) {
//           response.status(400).send({
//             status: 0,
//             pesan: "Input data is incorrect"
//           })
//         }
//         else {
//           response.status(200).json({
//             status: 1,
//             pesan: "Data added"
//           })
//         }
//       })
//     }
//   })
// }
const createFilterDosen = (request, response) => {
  var { nip, nama, kodematkul, kelas } = request.body
  pool.query('INSERT INTO filterdosen (nip, nama, kodematkul, kelas) VALUES ($1, $2, $3, $4)', [nip, nama, kodematkul, kelas], (error, result) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteFilterDosen = (request, response) => {
  var { nip, nama, kodematkul, kelas } = request.body
  pool.query(`DELETE FROM filterdosen WHERE nip = '${nip}' and nama ='${nama}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFilterTime = (request, response) => {
  const koderuangan = request.params.koderuangan

  pool.query(`SELECT hari,jam from filterruangan where koderuangan = '${koderuangan}' ORDER BY hari ASC, jam ASC`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const getFilterRuangan = (request, response) => {
  const koderuangan = request.params.koderuangan
  pool.query(`SELECT koderuangan from ruangan where koderuangan = '${koderuangan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET ruangan',
      })
    }
    else if (results.rowCount === 0) {
      response.status(200).json({
        status: 2,
        pesan: 'Ruangan Not Found',
      })
    }
    else {
      pool.query(`SELECT a.hari, a.jam, a.durasi, a.koderuangan, a.kodematkul, b.namamatkul, a.kelas FROM filterruangan a inner join matkul b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and a.koderuangan = '${koderuangan}' order by a.hari asc, a.jam asc`, (error, resultss) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET',
          })
        }
        else {
          response.status(200).json({
            status: 1,
            count: resultss.rowCount,
            hasil: resultss.rows
          })
        }
      })
    }
  })
}

const createFilterRuangan = (request, response) => {
  var { hari, jam, durasi, koderuangan, kodematkul, kelas } = request.body
  var i
  var count_kelas_kosong = 0


  pool.query(`SELECT jam from filterruangan where (koderuangan = '${koderuangan}' or (kodematkul = '${kodematkul}' and kelas = '${kelas}')) and hari = '${hari}' order by jam asc`, (error, resultss) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to Adds',
      })
    }
    else {
      for (i = 0; i < resultss.rowCount; i++) {
        if ((resultss.rows[i].jam >= parseInt(jam)) && (resultss.rows[i].jam < (parseInt(jam) + parseInt(durasi)))) {
          count_kelas_kosong = count_kelas_kosong + 1
        }
        else {
          count_kelas_kosong = count_kelas_kosong
        }
      }
      if (count_kelas_kosong > 0) {
        response.status(400).send({
          status: 0,
          pesan: 'Class already exist',
        })
      }
      else {
        pool.query('INSERT INTO filterruangan (hari, jam, durasi, koderuangan, kodematkul, kelas) VALUES ($1, $2, $3, $4, $5, $6)', [hari, jam, durasi, koderuangan, kodematkul, kelas], (error, results) => {
          if (error) {
            response.status(400).send({
              status: 0,
              pesan: 'Failed to Add',
            })
          }
          else {
            response.status(200).send({
              status: 1,
              pesan: 'Data added',
            })
          }
        })
      }
    }
  })
}

const deleteFilterRuangan = (request, response) => {
  var { hari, jam, koderuangan, kodematkul, kelas } = request.body
  pool.query(`DELETE FROM filterruangan WHERE hari = '${hari}' and jam = '${jam}' and koderuangan = '${koderuangan}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getLog = (request, response) => {
  var { startDate, endDate, sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit
  var date = new Date().toLocaleString() + "+0"
  if ((startDate == null) && (endDate == null)) {
    pool.query(`SELECT * FROM log WHERE nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%'  OR keterangan LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else {
        pool.query(`SELECT * FROM log WHERE nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%'`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
  else if ((startDate == null) && (endDate != null)) {
    pool.query(`SELECT * FROM log WHERE (waktu NOT BETWEEN '${endDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else {
        pool.query(`SELECT * FROM log WHERE (waktu NOT BETWEEN '${endDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%')`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
  else if ((startDate != null) && (endDate == null)) {
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else {
        pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%')`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
  else {
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${endDate}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else {
        pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${endDate}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' OR keterangan LIKE '%${search}%')`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
}

const getLogByNimDate = (request, response) => {
  var nim = removeSpace(request.params.nim)
  var { startDate, endDate } = request.body
  pool.query(`SELECT * FROM log WHERE (nim = '${nim}') AND (waktu BETWEEN '${startDate}' AND '${endDate}')`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT * FROM log WHERE (nim = '${nim}') AND (waktu BETWEEN '${startDate}' AND '${endDate}')`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getStatistikMatkul = (request, response) => {
  var kodematkul = removeSpace(request.params.kodematkul)
  pool.query(`SELECT a.kodematkul, a.namamatkul, a.kelas, count(b.nim) as count FROM matkul a inner join filterpengguna b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and a.kodematkul ='${kodematkul}' group by a.namamatkul, a.kodematkul, a.kelas  order by a.kelas asc`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const getLogMatkul = (request, response) => {
  var { kodematkul, kelas } = request.params
  var { startDate, endDate } = request.body
  pool.query(`SELECT a.nim, a.nama, a.kodematkul, a.kelas, a.status, a.keterangan, a.waktu FROM log a inner join matkul b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and b.kodematkul = '${kodematkul}' and b.kelas = '${kelas}' and (a.status = 'Dosen' or a.status = 'Asisten') where (a.waktu::date BETWEEN '${startDate}' AND '${endDate}') order by a.kelas asc, a.waktu asc`, (error, result_log_pengajar) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET Log Dosen',
      })
    }
    else {
      pool.query(`select waktu, nim, kelas, keterangan from log where kodematkul='${kodematkul}' and kelas='${kelas}'and status = 'Mahasiswa' and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by kelas asc, waktu asc`, (error, result_log_mahasiswa) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET Log Mahasiswa',
          })
        }
        else {
          response.status(200).json({
            status: 1,
            log_pengajar: result_log_pengajar.rows,
            log_mahasiswa: result_log_mahasiswa.rows
          })
        }
      })
    }
  })
}

const getStatistikAll = (request, response) => {
  var nim = removeSpace(request.params.nim)
  pool.query(`SELECT a.namamatkul, b.kodematkul, b.kelas, count(c.hari) as count FROM matkul a inner join filterpengguna b on a.kodematkul=b.kodematkul and a.kelas=b.kelas inner join filterruangan c on b.kodematkul = c.kodematkul and b.kelas = c.kelas and b.nim='${nim}' group by a.namamatkul, b.kodematkul, b.kelas  order by b.kodematkul asc, b.kelas asc`, (error, result_matkul) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET Matkul',
      })
    }
    else {
      pool.query(`SELECT a.koderuangan, a.kodematkul, a.kelas, a.status, a.keterangan, a.waktu FROM log a inner join filterpengguna b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and b.nim = '${nim}' and (a.status = 'Dosen' or a.status = 'Asisten') order by a.kodematkul asc, a.kelas asc, a.waktu asc`, (error, result_log_pengajar) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET Log Dosen',
          })
        }
        else {
          pool.query(`select waktu, nama, koderuangan, kodematkul, kelas, keterangan from log where nim='${nim}' and status = 'Mahasiswa' order by kodematkul asc, kelas asc, waktu asc`, (error, result_log_mahasiswa) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: 'Failed to GET Log Mahasiswa',
              })
            }
            else {
              response.status(200).json({
                status: 1,
                matkul: result_matkul.rows,
                log_pengajar: result_log_pengajar.rows,
                log_mahasiswa: result_log_mahasiswa.rows
              })
            }
          })
        }
      })
    }
  })
}

const getStatistikByNimDate = (request, response) => {
  var nim = removeSpace(request.params.nim)
  var { startDate, endDate } = request.body

  pool.query(`SELECT a.namamatkul, b.kodematkul, b.kelas, count(c.hari) as count FROM matkul a inner join filterpengguna b on a.kodematkul=b.kodematkul and a.kelas=b.kelas inner join filterruangan c on b.kodematkul = c.kodematkul and b.kelas = c.kelas and b.nim='${nim}' group by a.namamatkul, b.kodematkul, b.kelas  order by b.kodematkul asc, b.kelas asc`, (error, result_matkul) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET Matkul',
      })
    }
    else {
      pool.query(`SELECT a.koderuangan, a.kodematkul, a.kelas, a.status, a.keterangan, a.waktu FROM log a inner join filterpengguna b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and b.nim = '${nim}' and (a.status = 'Dosen' or a.status = 'Asisten') where (a.waktu::date BETWEEN '${startDate}' AND '${endDate}') order by a.kodematkul asc, a.kelas asc, a.waktu asc`, (error, result_log_pengajar) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET Log Dosen',
          })
        }
        else {
          pool.query(`select waktu, nama, koderuangan, kodematkul, kelas, keterangan from log where nim='${nim}' and status = 'Mahasiswa' and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by kodematkul asc, kelas asc, waktu asc`, (error, result_log_mahasiswa) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: 'Failed to GET Log Mahasiswa',
              })
            }
            else {
              response.status(200).json({
                status: 1,
                matkul: result_matkul.rows,
                log_pengajar: result_log_pengajar.rows,
                log_mahasiswa: result_log_mahasiswa.rows
              })
            }
          })
        }
      })
    }
  })
}


const getLogPengajarByNimDate = (request, response) => {
  var nim = removeSpace(request.params.nim)
  var { startDate, endDate, kodematkul, kelas, status } = request.body
  pool.query(`SELECT koderuangan, status, keterangan, waktu FROM log where kodematkul = '${kodematkul}' and kelas = '${kelas}' and (status = 'Dosen' or status = 'Asisten') and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by waktu asc`, (error, result_log_pengajar) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET Log Dosen',
      })
    }
    else {
      pool.query(`select nama, waktu, keterangan from log where nim='${nim}' and status != 'Mahasiswa' and kodematkul = '${kodematkul}' and kelas = '${kelas}' and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by waktu asc`, (error, result_log) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET Log Mahasiswa',
          })
        }
        else {
          pool.query(`select nama from dosen where nip='${nim}' `, (error, result_name_dosen) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: 'Failed to GET Name',
              })
            }
            else if (result_name_dosen.rowCount == 0) {
              pool.query(`select nama from pengguna where nim='${nim}' `, (error, result_name_asisten) => {
                if (error) {
                  response.status(400).send({
                    status: 0,
                    pesan: 'Failed to GET Name'
                  })
                }
                else {
                  if (result_name_asisten.rowCount > 0) {
                    response.status(200).json({
                      status: 1,
                      log_all_pengajar: result_log_pengajar.rows,
                      log_pengajar: result_log.rows,
                      nama_pengajar: result_name_asisten.rows[0].nama
                    })
                  }
                  else {
                    response.status(400).send({
                      status: 0,
                      pesan: 'Failed to GET Name'
                    })
                  }
                }
              })
            }
            else {
              response.status(200).json({
                status: 1,
                log_all_pengajar: result_log_pengajar.rows,
                log_pengajar: result_log.rows,
                nama_pengajar: result_name_dosen.rows[0].nama
              })
            }
          })
        }
      })
    }
  })
}

const getSolveMahasiswa = (request, response) => {
  pool.query('select * from solve_statistik_mahasiswa order by nim asc', (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Failed get data"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const createSolveMahasiswa = (request, response) => {
  var { nim, kodematkul, kelas } = request.body
  pool.query('INSERT INTO solve_statistik_mahasiswa (nim, kodematkul, kelas) VALUES ($1, $2, $3)', [nim, kodematkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteSolveMahasiswa = (request, response) => {
  var { nim, kodematkul, kelas } = request.body
  pool.query(`delete from solve_statistik_mahasiswa where nim = '${nim}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Failed to delete"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getKonfigurasiMahasiswa = (request, response) => {
  pool.query(`select * from setting_statistik_mahasiswa order by nama`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const createKonfigurasiMahasiswa = (request, response) => {
  var { nama, jumlah_minggu } = request.body
  pool.query(`insert into setting_statistik_mahasiswa (nama, jumlah_minggu) values ('${nama}', ${jumlah_minggu})`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}
const updateKonfigurasiMahasiswa = (request, response) => {
  var { nama_old, nama_new, jumlah_minggu_new } = request.body
  pool.query(`update setting_statistik_mahasiswa set nama = '${nama_new}', jumlah_minggu = ${jumlah_minggu_new} where nama = '${nama_old}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  })
}
const deleteKonfigurasiMahasiswa = (request, response) => {
  var { nama } = request.body
  pool.query(`delete from setting_statistik_mahasiswa where nama = '${nama}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const createLog = (request, response) => {
  var { waktu, nama, nim, koderuangan, kodematkul, kelas, status, keterangan } = request.body
  pool.query('INSERT INTO log (waktu, nama, nim, koderuangan, kodematkul, kelas, status, keterangan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [waktu, nama, nim, koderuangan, kodematkul, kelas, status, keterangan], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteLog = (request, response) => {
  var { startDate, endDate } = request.body
  pool.query(`DELETE FROM log WHERE waktu BETWEEN '${startDate}' AND '${endDate}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getMatkul = (request, response) => {
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT * FROM matkul WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR namamatkul LIKE '%${search}%' OR kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT * FROM matkul WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR namamatkul LIKE '%${search}%' OR kelas LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getMatkulPengguna = (request, response) => {
  var { sortby, ascdsc, search, page, limit, kodematkul, kelas } = request.body
  var offset = page * limit - limit;

  pool.query(`SELECT a.fakultas, a.jurusan, b.nim, a.nama, c.namamatkul FROM pengguna a inner join filterpengguna b on a.nim = b.nim AND b.kodematkul = '${kodematkul}' AND b.kelas = '${kelas}' INNER JOIN matkul c on c.kodematkul = b.kodematkul AND c.kelas = b.kelas WHERE a.fakultas LIKE '%${search}%' OR a.jurusan LIKE '%${search}%' OR b.nim LIKE '%${search}%' OR a.nama LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results_mahasiswa) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT a.fakultas, a.jurusan, b.nim, a.nama, c.namamatkul FROM pengguna a inner join filterpengguna b on a.nim = b.nim AND b.kodematkul = '${kodematkul}' AND b.kelas = '${kelas}' INNER JOIN matkul c on c.kodematkul = b.kodematkul AND c.kelas = b.kelas WHERE a.fakultas LIKE '%${search}%' OR a.jurusan LIKE '%${search}%' OR b.nim LIKE '%${search}%' OR a.nama LIKE '%${search}%'`, (error, result_mahasiswa) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET',
          })
        }
        else {
          pool.query(`SELECT a.fakultas, a.jurusan, b.nip, a.nama FROM dosen a inner join filterdosen b on a.nip = b.nip AND b.kodematkul = '${kodematkul}' AND b.kelas = '${kelas}' ORDER BY a.nama asc`, (error, results_dosen) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: 'Failed to GET',
              })
            }
            else {
              pool.query(`SELECT a.fakultas, a.jurusan, b.nip, a.nama FROM pengguna a inner join filterdosen b on a.nim = b.nip AND b.kodematkul = '${kodematkul}' AND b.kelas = '${kelas}' ORDER BY b.nip asc`, (error, results_asisten) => {
                if (error) {
                  response.status(400).send({
                    status: 0,
                    pesan: 'Failed to GET',
                  })
                }
                else {
                  response.status(200).json({
                    status: 1,
                    count_mahasiswa: result_mahasiswa.rowCount,
                    hasil_mahasiswa: results_mahasiswa.rows,
                    count_pengajar: results_dosen.rowCount + results_asisten.rowCount,
                    hasil_dosen: results_dosen.rows,
                    hasil_asisten: results_asisten.rows,
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

const getMatkulRuangan = (request, response) => {
  const { kodematkul, kelas } = request.body

  pool.query(`SELECT kodematkul from matkul where kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else if (results.rowCount === 0) {
      response.status(200).json({
        status: 2,
        pesan: 'Ruangan Not Found',
      })
    }
    else {
      pool.query(`SELECT a.hari, a.jam, a.durasi, a.koderuangan, b.alamat FROM filterruangan a inner join ruangan b on a.kodematkul = '${kodematkul}' and a.kelas = '${kelas}' and a.koderuangan = b.koderuangan order by a.hari asc, a.jam asc`, (error, resultss) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET',
          })
        }
        else {
          response.status(200).json({
            status: 1,
            count: resultss.rowCount,
            hasil: resultss.rows
          })
        }
      })
    }
  })
}

const createMatkul = (request, response) => {
  var { fakultas, jurusan, kodematkul, namamatkul, kelas } = request.body
  pool.query('INSERT INTO matkul (fakultas, jurusan, kodematkul, namamatkul, kelas) VALUES ($1, $2, $3, $4, $5)', [fakultas, jurusan, kodematkul, namamatkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateMatkul = (request, response) => {
  var { oldkodematkul, oldkelas, newnamamatkul, newkelas } = request.body
  pool.query(`UPDATE matkul set namamatkul='${newnamamatkul}', kelas='${newkelas}' WHERE kodematkul='${oldkodematkul}' and kelas='${oldkelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  }
  )
}

const deleteMatkul = (request, response) => {
  var { kodematkul, namamatkul, kelas } = request.body
  pool.query(`DELETE FROM matkul WHERE kodematkul = '${kodematkul}' AND namamatkul = '${namamatkul}' AND kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getMatkulTambahan = (request, response) => {
  pool.query(`SELECT * FROM matkultambahan sort by hari asc, jam asc`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const createMatkulTambahan = (request, response) => {
  var { kodematkul, kelas, hari, jam, durasi, koderuangan} = request.body
  pool.query('INSERT INTO matkultambahan (kodematkul, kelas, hari, jam, durasi, koderuangan) VALUES ($1, $2, $3, $4, $5, $6)', [kodematkul, kelas, hari, jam, durasi, koderuangan], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteMatkulTambahan = (request, response) => {
  var { kodematkul, kelas, hari, jam, durasi, koderuangan } = request.body
  pool.query(`DELETE FROM matkultambahan WHERE kodematkul = '${kodematkul}' AND kelas = '${kelas}' AND hari = ${hari} AND jam = ${jam} AND durasi = ${durasi} AND koderuangan = '${koderuangan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}
// const getDevicePengguna = (request, response) => {
//   var {koderuangan} = request.params
//   // SELECT a.hari, a.jam, a.kodematkul, a.kelas, b.nim, b.nama, c.finger1, c.finger2 FROM filterruangan a INNER JOIN filterpengguna b ON a.koderuangan = '9125' AND a.kodematkul = b.kodematkul AND a.kelas = b.kelas INNER JOIN pengguna c ON b.nim = c.nim ORDER BY a.hari asc, a.jam asc;

// pool.query(`SELECT a.hari, a.jam, a.durasi, a.kodematkul, a.kelas, b.nim, b.nama, c.finger1, c.finger2 FROM filterruangan a INNER JOIN filterpengguna b ON a.koderuangan = '${koderuangan}' AND a.kodematkul = b.kodematkul AND a.kelas = b.kelas INNER JOIN pengguna c ON b.nim = c.nim ORDER BY a.hari asc, a.jam asc`, (error, results) => {
//   if (error) {
//     response.status(400).send({
//       status: 0,
//       pesan: 'Failed to GET',
//     })
//   }
//   else{
//     response.status(200).json({
//       status: 1,
//       count: results.rowCount,
//       hasil: results.rows
//     })
//   }
// })
// }

const getDeviceCounterMatkulPengguna = (request, response) => {
  var { kodematkul, kelas } = request.params
  pool.query(`SELECT a.nim FROM filterpengguna a INNER JOIN pengguna b ON a.nim = b.nim AND kodematkul = '${kodematkul}' AND kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT a.nip FROM filterdosen a INNER JOIN dosen b ON a.nip = b.nip AND kodematkul = '${kodematkul}' AND kelas = '${kelas}'`, (error, resultss) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET',
          })
        }
        else {
          pool.query(`SELECT a.nip FROM filterdosen a INNER JOIN pengguna b ON a.nip = b.nim AND kodematkul = '${kodematkul}' AND kelas = '${kelas}'`, (error, resultsss) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: 'Failed to GET',
              })
            }
            else {
              response.status(200).json({
                status: 1,
                counter_dosen: resultss.rowCount,
                counter_asisten: resultsss.rowCount,
                counter_pengguna: results.rowCount
              })
            }
          })
        }
      })
    }
  })
}

const getDeviceMatkulPengguna = (request, response) => {
  var { koderuangan } = request.params
  pool.query(`SELECT hari, jam, durasi, kodematkul, kelas FROM filterruangan WHERE koderuangan = '${koderuangan}' ORDER BY hari asc, jam asc`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const getDevicePengguna = (request, response) => {
  var { kodematkul, kelas, offset } = request.params
  pool.query(`SELECT a.nim, a.nama, b.finger1, b.finger2 FROM filterpengguna a INNER JOIN pengguna b ON a.kodematkul = '${kodematkul}' AND a.kelas = '${kelas}' AND a.nim = b.nim ORDER BY a.nim asc LIMIT 5 OFFSET '${offset}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const getDeviceAsisten = (request, response) => {
  var { kodematkul, kelas, offset } = request.params
  pool.query(`SELECT a.nip, a.nama, b.finger1, b.finger2 FROM filterdosen a INNER JOIN pengguna b ON a.kodematkul = '${kodematkul}' AND a.kelas = '${kelas}' AND a.nip = b.nim ORDER BY a.nip asc LIMIT 5 OFFSET '${offset}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const getAllPengguna = (request, response) => {
  pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna ORDER BY nim asc`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const getPengguna = (request, response) => {
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getPenggunaByFakultas = (request, response) => {
  var fakultas = removeSpace(request.params.fakultas)
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%')`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}


const createPengguna = (request, response) => {
  var { fakultas, jurusan, nim, nama, finger1, finger2 } = request.body
  pool.query('INSERT INTO pengguna (fakultas, jurusan, nim, nama, finger1, finger2) VALUES ($1, $2, $3, $4, $5, $6)', [fakultas, jurusan, nim, nama, finger1, finger2], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updatePengguna = (request, response) => {
  var { oldnim, newnim, newnama, newfinger1, newfinger2 } = request.body
  pool.query(`UPDATE pengguna set nim='${newnim}', nama='${newnama}', finger1='${newfinger1}', finger2='${newfinger2}' WHERE nim='${oldnim}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  }
  )
}

const deletePengguna = (request, response) => {
  var { nim } = request.body
  pool.query(`DELETE FROM pengguna WHERE nim = '${nim}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getDeviceDosen = (request, response) => {
  var { kodematkul, kelas, offset } = request.params
  pool.query(`SELECT a.nip, a.nama, b.finger1, b.finger2 FROM filterdosen a INNER JOIN dosen b ON a.kodematkul = '${kodematkul}' AND a.kelas = '${kelas}' AND a.nip = b.nip ORDER BY a.nip asc LIMIT 5 OFFSET '${offset}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const getDosen = (request, response) => {
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT fakultas,jurusan,nip,nama FROM dosen WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nip LIKE '%${search}%' OR nama LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT fakultas,jurusan,nip,nama FROM dosen WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nip LIKE '%${search}%' OR nama LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const getDosenByFakultas = (request, response) => {
  var fakultas = removeSpace(request.params.fakultas)
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT fakultas,jurusan,nip,nama FROM dosen WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nip LIKE '%${search}%' OR nama LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT fakultas,jurusan,nip,nama FROM dosen WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nip LIKE '%${search}%' OR nama LIKE '%${search}%')`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}


const createDosen = (request, response) => {
  var { fakultas, jurusan, nip, nama, finger1, finger2 } = request.body
  pool.query('INSERT INTO dosen (fakultas, jurusan, nip, nama, finger1, finger2) VALUES ($1, $2, $3, $4, $5, $6)', [fakultas, jurusan, nip, nama, finger1, finger2], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateDosen = (request, response) => {
  var { oldnip, newnip, newnama, newfinger1, newfinger2 } = request.body
  pool.query(`UPDATE dosen set nip='${newnip}', nama='${newnama}', finger1='${newfinger1}', finger2='${newfinger2}' WHERE nip='${oldnip}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  }
  )
}

const deleteDosen = (request, response) => {
  var { nip } = request.body
  pool.query(`DELETE FROM dosen WHERE nip = '${nip}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getRuangan = (request, response) => {
  var { sortby, ascdsc, search, page, limit } = request.body
  var offset = page * limit - limit;
  pool.query(`SELECT * FROM ruangan WHERE kodedevice LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR alamat LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      pool.query(`SELECT * FROM ruangan WHERE kodedevice LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR alamat LIKE '%${search}%'`, (error, result) => {
        response.status(200).json({
          status: 1,
          count: result.rowCount,
          hasil: results.rows
        })
      })
    }
  })
}

const createRuangan = (request, response) => {
  var { kodedevice, koderuangan, alamat } = request.body
  var lastseen = new Date().toLocaleString() + "+0"
  var status = 1
  pool.query('INSERT INTO ruangan (kodedevice, koderuangan, alamat, lastseen, status) VALUES ($1, $2, $3, $4, $5)', [kodedevice, koderuangan, alamat, lastseen, status], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateRuangan = (request, response) => {
  var { oldkodedevice, newkoderuangan, newalamat } = request.body
  pool.query(`UPDATE ruangan set koderuangan='${newkoderuangan}', alamat='${newalamat}' WHERE kodedevice='${oldkodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  }
  )
}

const updateDevice = (request, response) => {
  var { kodedevice } = request.body
  var { kode } = request.body
  pool.query(`UPDATE ruangan set status='${kode}' WHERE kodedevice='${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Updated"
      })
    }
  })
}

const updateLastseenRuangan = (request, response) => {
  var { kodedevice } = request.body
  var lastseen = new Date().toLocaleString() + "+0"
  pool.query(`SELECT * FROM ruangan WHERE kodedevice='${kodedevice}'`, (error, results_counter_device) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else if (results_counter_device.rowCount == 0) {
      response.status(400).send({
        status: 0,
        pesan: "Kode Device Not Found"
      })
    }
    else {
      pool.query(`UPDATE ruangan set lastseen='${lastseen}' WHERE kodedevice='${kodedevice}'`, (error, results) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: "Input data is incorrect"
          })
        }
        else {
          pool.query(`SELECT * FROM ruangan WHERE kodedevice='${kodedevice}'`, (error, resultss) => {
            if (error) {
              response.status(400).send({
                status: 0,
                pesan: "Input data is incorrect"
              })
            }
            else {
              var token = jwt.sign({ kodedevice: kodedevice },
                config.secret,
                { expiresIn: '3600000' }); //1 hour
              if (resultss.rowCount > 0) {
                response.status(200).json({
                  status: resultss.rows[0].status,
                  token: token
                })
              }
              else {
                response.status(400).send({
                  status: 0
                })
              }
            }
          })
        }
      })
    }
  })
}

const deleteRuangan = (request, response) => {
  var { kodedevice } = request.body
  pool.query(`DELETE FROM ruangan WHERE kodedevice = '${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getCoba = (request, response) => {
  // var client = new net.Socket();
  // client.on('error', function(err) {
  //   console.log(err);
  //   response.status(200).json({
  //     status: 1,
  //     pesan: err
  //   })
  // });

  // client.connect(8088, '192.168.0.116', function() {
  //   client.write("1");
  //   response.status(200).json({
  //     status: 1,
  //   })
  //   client.destroy(); 
  // });

  // // client.on('data', function(data) {
  // //   console.log('Received: ' + data);
  // //   response.status(200).json({
  // //     status: 1,
  // //     pesan: String(data)
  // //   })
  // //   client.destroy(); // kill client after server's response
  // // });

  // client.on('close', function() {
  // });
  // pool.query(`SELECT * FROM coba`, (error, results) => {
  //   if (error) {
  //     response.status(400).send({
  //       status: 0,
  //       pesan: 'Failed to GET',
  //     })
  //   }
  //   else{
  //     response.status(200).json({
  //         status: 1,
  //         count: results.rowCount,
  //         hasil: results.rows
  //     })
  //   }
  // })
}

const createCoba = (request, response) => {
  var { nama, waktu } = request.body
  pool.query('INSERT INTO coba (nama, waktu) VALUES ($1, $2)', [nama, waktu], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const getDataFingerprint = (request, response) => {
  pool.query(`SELECT * FROM datafingerprint`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const createDataFingerprint = (request, response) => {
  var { no, template } = request.body
  pool.query('INSERT INTO datafingerprint (no, template) VALUES ($1, $2)', [no, template], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateDataFingerprint = (request, response) => {
  var { no, template } = request.body
  pool.query(`UPDATE datafingerprint set template='${template}' WHERE no='${no}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  }
  )
}

const deleteDataFingerprint = (request, response) => {
  var { no } = request.body
  pool.query(`DELETE FROM datafingerprint WHERE no = '${no}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFingerprintDevice = (request, response) => {
  var { kodedevice } = request.params
  pool.query(`SELECT kodedevice FROM ruangan WHERE kodedevice='${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      if (results.rowCount == 0) {
        response.status(400).json({
          status: 0,
          pesan: 'Kode Device Not Found',
        })
      }
      else {
        response.status(200).json({
          status: 1,
          pesan: 'Device Found',
        })
      }
    }
  })
}

const getFingerprint = (request, response) => {
  var { kodedevice } = request.params
  pool.query(`SELECT template FROM fingerprint WHERE device='${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else {
      response.status(200).json({
        status: 1,
        hasil: results.rows
      })
    }
  })
}

const createFingerprint = (request, response) => {
  var { device, template } = request.body

  pool.query('INSERT INTO fingerprint (device, template) VALUES ($1, $2)', [device, template], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteFingerprint = (request, response) => {
  var { kodedevice } = request.body
  pool.query(`DELETE FROM fingerprint WHERE device = '${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const testread = (request, response) => {
  pool.query(`select * from test`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: results.rows
      })
    }
  })
}

const testcreate = (request, response) => {
  var { no, isi } = request.body
  pool.query(`insert into test (no, isi) values (${no}, '${isi}')`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Create finish"
      })
    }
  })
}
const testupdate = (request, response) => {
  var { no_new, no_old, isi_new, isi_old } = request.body
  pool.query(`update test set no = ${no_new}, isi = '${isi_new}' where no = ${no_old} and isi = '${isi_old}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "Update finish"
      })
    }
  })
}
const testdelete = (request, response) => {
  var { no } = request.body
  pool.query(`delete from test where no = ${no}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      response.status(200).json({
        status: 1,
        pesan: "delete finish"
      })
    }
  })
}

const testingAPI = (request, response) => {
  var { kodematkul, startDate, endDate } = request.body
  pool.query(`select namamatkul, kodematkul, kelas from matkul where kodematkul = '${kodematkul}'`, (error, result_matkul) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else {
      if (result_matkul.rowCount === 0) {
        response.status(200).json({
          status: 0,
          pesan: "Matkul not found"
        })
      }
      else {
        pool.query(`select a.kelas, b.nim, b.nama from matkul a inner join filterpengguna b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and a.kodematkul = '${kodematkul}' order by a.kelas asc, b.nim asc`, (error, result_pengguna_matkul) => {
          if (error) {
            response.status(400).send({
              status: 0,
              pesan: "get data pengguna matkul failed"
            })
          }
          else {
            pool.query(`select waktu, kodematkul, kelas, status from log where kodematkul = '${kodematkul}' and status != 'Mahasiswa' order by kodematkul asc, kelas asc, waktu asc`, (error, result_pengajar) => {
              if (error) {
                response.status(400).send({
                  status: 0,
                  pesan: "get data pengajar failed"
                })
              }
              else {
                pool.query(`select waktu, kodematkul, kelas, status from log where kodematkul = '${kodematkul}' and status = 'Mahasiswa' order by kodematkul asc, kelas asc, waktu asc`, (error, result_mahasiswa) => {
                  if (error) {
                    response.status(400).send({
                      status: 0,
                      pesan: "get data mahasiswa failed"
                    })
                  }
                  else {
                    response.status(200).json({
                      status: 1,
                      result_matkul: result_matkul.rows,
                      result_pengguna_matkul: result_pengguna_matkul.rows,
                      result_log_pengajar: result_pengajar.rows,
                      result_log_mahasiswa: result_mahasiswa.rows,
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  })
}

module.exports = {
  //device
  // getDevice,
  // createDevice,
  // updateDevice,
  // deleteDevice,
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
  //filterdosen
  getFilterDosen,
  getMatkulByNip,
  createFilterDosen,
  deleteFilterDosen,
  //filterruangan
  getFilterRuangan,
  createFilterRuangan,
  deleteFilterRuangan,
  //log
  getLog,
  getLogByNimDate,
  getStatistikMatkul,
  getLogMatkul,
  getStatistikAll,
  getStatistikByNimDate,
  getLogPengajarByNimDate,
  getSolveMahasiswa,
  createSolveMahasiswa,
  deleteSolveMahasiswa,
  getKonfigurasiMahasiswa,
  createKonfigurasiMahasiswa,
  updateKonfigurasiMahasiswa,
  deleteKonfigurasiMahasiswa,
  createLog,
  deleteLog,
  //matkul
  getMatkul,
  getMatkulPengguna,
  getMatkulRuangan,
  createMatkul,
  updateMatkul,
  deleteMatkul,
  getMatkulTambahan,
  createMatkulTambahan,
  deleteMatkulTambahan,
  //pengguna
  getDeviceCounterMatkulPengguna,
  getDeviceMatkulPengguna,
  getDevicePengguna,
  getDeviceAsisten,
  getAllPengguna,
  getPengguna,
  getPenggunaByFakultas,
  createPengguna,
  updatePengguna,
  deletePengguna,
  //dosen
  getDeviceDosen,
  getDosen,
  getDosenByFakultas,
  createDosen,
  updateDosen,
  deleteDosen,
  //ruangan
  getRuangan,
  createRuangan,
  updateRuangan,
  updateLastseenRuangan,
  updateDevice,
  deleteRuangan,
  //Data Fingerprint
  getDataFingerprint,
  createDataFingerprint,
  updateDataFingerprint,
  deleteDataFingerprint,
  //Fingerprint
  getFingerprint,
  getFingerprintDevice,
  createFingerprint,
  deleteFingerprint,
  //Get time ruangan (jam dan hari)
  getFilterTime,
  getCoba,
  createCoba,

  testread,
  testcreate,
  testupdate,
  testdelete,
  testingAPI
}

//
//select a.hari, a.jam, b.kodematkul, c.nim, c.nama, c.finger1, c.finger2 from filterruangan a inner join filterpengguna b on a.koderuangan = '9125' and  a.kodematkul = b.kodematkul inner join pengguna c on b.nim = c.nim order by a.hari asc, a.jam asc;

//Matkul


//Ruangan
//dapetin matkul apa aja yg pernah kelas disitu
//select b.kodematkul, b.kelas from ruangan a inner join log b on a.koderuangan = b.koderuangan and a.koderuangan = '9125' and b.keterangan = 'Hadir' group by a.koderuangan, b.kodematkul, b.kelas order by kodematkul asc, kelas asc;
//for 1 sampai hasil.length
//select count(*) from filterpengguna where kodematkul = 'EL0001' and kelas = 'K01';
//jsonstringify
// const testingAPI = (request, response) => {
//   var { koderuangan, startDate, endDate } = request.body
//   pool.query(`select koderuangan from ruangan where koderuangan = '${koderuangan}'`, (error, result_check_ruangan) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "get data failed"
//       })
//     }
//     else {
//       if (result_check_ruangan.rowCount === 0) {
//         response.status(200).json({
//           status: 0,
//           pesan: "Ruangan not found"
//         })
//       }
//       else {
//         pool.query(`select waktu, kodematkul, kelas, status from log where koderuangan = '${koderuangan}' and status != 'Mahasiswa' and keterangan = 'Hadir' and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by kodematkul asc, kelas asc, waktu asc`, (error, result_pengajar) => {
//           if (error) {
//             response.status(400).send({
//               status: 0,
//               pesan: "get data pengajar failed"
//             })
//           }
//           else {
//             pool.query(`select waktu, kodematkul, kelas, status from log where koderuangan = '${koderuangan}' and status = 'Mahasiswa' and keterangan = 'Hadir' and (waktu::date BETWEEN '${startDate}' AND '${endDate}') order by kodematkul asc, kelas asc, waktu asc`, (error, result_mahasiswa) => {
//               if (error) {
//                 response.status(400).send({
//                   status: 0,
//                   pesan: "get data mahasiswa failed"
//                 })
//               }
//               else {
//                 response.status(200).json({
//                   status: 1,
//                   result_log_pengajar: result_pengajar.rows,
//                   result_log_mahasiswa: result_mahasiswa.rows,
//                 })
//               }
//             })
//           }
//         })
//       }
//     }
//   })
// }



//SELECT a.waktu::date as date, (case when EXTRACT(MINUTE from a.waktu) >= 40 then EXTRACT(hour from a.waktu + interval '1 hour') when EXTRACT(MINUTE from a.waktu) < 40 then EXTRACT(hour from a.waktu) end ) as hour, a.kodematkul, a.kelas, a.status FROM log a inner join filterpengguna b on a.kodematkul = b.kodematkul and a.kelas = b.kelas and b.nim = '${nim}' and (a.status = 'Dosen' or a.status = 'Asisten') order by a.kodematkul asc, a.kelas asc, a.waktu asc
// const createLog = (request, response) => {
//   var {waktu, nama, nim, koderuangan, kodematkul, status} = request.body
//   pool.query(`select * from pengguna a inner join filterpengguna b on a.nim = '${nim}' and  a.nim = b.nim  inner join filterruangan c on b.kodematkul='${kodematkul}' and c.koderuangan='${koderuangan}' and b.kodematkul = c.kodematkul`, (error, results) => {
//     if (error) {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//     else if (results.rowCount!==0){
//       pool.query('INSERT INTO log (waktu, nama, nim, koderuangan, kodematkul, status) VALUES ($1, $2, $3, $4, $5, $6)', [waktu, nama, nim, koderuangan, kodematkul, status], (error, results) => {
//         if (error) {
//           response.status(400).send({
//             status: 0,
//             pesan: "Input data is incorrect"
//           })
//         }
//         else{
//           response.status(200).json({
//             status: 1,
//             pesan: "Data added"
//           })
//         }
//       })
//     }
//     else {
//       response.status(400).send({
//         status: 0,
//         pesan: "Input data is incorrect"
//       })
//     }
//   })
// }