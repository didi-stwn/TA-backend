const path = require('path');
const config = require(path.join(__dirname,'..','config'));
const Pool = require('pg').Pool
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
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM fakultasjurusan WHERE fakultas LIKE '%${fakultas}%' AND jurusan LIKE '%${search}%'  ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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
  pool.query('INSERT INTO fakultasjurusan (fakultas, jurusan) VALUES ($1, $2)', [fakultas,jurusan], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
  })
}

const deleteFakultasJurusan = (request, response) => {
  var {fakultas, jurusan} = request.body
  pool.query(`DELETE FROM fakultasjurusan WHERE fakultas = '${fakultas}' and jurusan = '${jurusan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFilterPengguna = (request, response) => {
  var {sortby, ascdsc, search, page, limit, nimfilter} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT a.nim, a.nama, a.kodematkul, b.namamatkul, a.kelas FROM filterpengguna a inner join matkul b on a.kodematkul = b.kodematkul AND a.kelas = b.kelas and a.nim LIKE '%${nimfilter}%' WHERE a.kodematkul LIKE '%${search}%' OR b.namamatkul LIKE '%${search}%' OR a.kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteFilterPengguna = (request, response) => {
  var {nim, nama, kodematkul, kelas} = request.body
  pool.query(`DELETE FROM filterpengguna WHERE nim = '${nim}' and nama ='${nama}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
    else{
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
  pool.query(`SELECT * from ruangan where koderuangan = '${koderuangan}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else if (results.rowCount===0){
      response.status(200).json({
        status: 2,
      })
    }
    else {
      pool.query(`SELECT a.hari, a.jam, a.durasi, a.koderuangan, a.kodematkul, b.namamatkul, a.kelas FROM filterruangan a inner join matkul b on a.kodematkul = b.kodematkul and a.koderuangan LIKE '%${koderuangan}%'`, (error, resultss) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: 'Failed to GET',
          })
        }
        else{
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
  var { hari, jam, durasi, koderuangan, kodematkul, kelas  } = request.body
  pool.query(`SELECT * from filterruangan where koderuangan = '${koderuangan}' and hari = '${hari}' and jam = '${jam}'`, (error, resultss) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to Add',
      })
    }
    else if (resultss.rowCount!==0){
      response.status(200).json({
        status: 0,
        pesan: "Input data is incorrect",
      })
    }
    else {
      if (durasi==="1"){
        pool.query('INSERT INTO filterruangan (hari, jam, durasi, koderuangan, kodematkul, kelas) VALUES ($1, $2, $3, $4, $5, $6)', [hari, jam, durasi, koderuangan, kodematkul, kelas], (error, resultsss) => {
          if (error) {
            response.status(400).send({
              status: 0,
              pesan: "Input data is incorrect"
            })
          }
          else{
            response.status(200).json({
              status: 1,
              pesan: "Data added"
            })
          }
        })
      }
      else if (durasi==="2"){
        pool.query(`SELECT * from filterruangan where koderuangan = '${koderuangan}' and hari = '${hari}' and jam = '${jam+1}'`, (error, resultssss) => {
          if (error) {
            response.status(400).send({
              status: 0,
              pesan: 'Failed to Add',
            })
          }
          else if (resultssss.rowCount!==0){
            response.status(200).json({
              status: 0,
              pesan: "Input data is incorrect",
            })
          }
          else{
            pool.query('INSERT INTO filterruangan (hari, jam, durasi, koderuangan, kodematkul, kelas) VALUES ($1, $2, $3, $4, $5, $6)', [hari, jam, durasi, koderuangan, kodematkul, kelas], (error, resultsssss) => {
              if (error) {
                response.status(400).send({
                  status: 0,
                  pesan: "Input data is incorrect"
                })
              }
              else{
                response.status(200).json({
                  status: 1,
                  pesan: "Data added"
                })
              }
            })
          }
        })
      }
    }
  })
}

const deleteFilterRuangan = (request, response) => {
  var {hari, jam, koderuangan, kodematkul, kelas } = request.body
  pool.query(`DELETE FROM filterruangan WHERE hari = '${hari}' and jam = '${jam}' and koderuangan = '${koderuangan}' and kodematkul = '${kodematkul}' and kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getLog = (request, response) => {
  var {startDate,endDate, sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit
  var deaddate = new Date().toLocaleString()
  var date = deaddate + "+0"
  if ((startDate==null)&&(endDate==null)){
    pool.query(`SELECT * FROM log WHERE nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else{
        pool.query(`SELECT * FROM log WHERE nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%'`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
  else if ((startDate==null)&&(endDate!=null)){
    pool.query(`SELECT * FROM log WHERE (waktu NOT BETWEEN '${endDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else{
        pool.query(`SELECT * FROM log WHERE (waktu NOT BETWEEN '${endDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%')`, (error, result) => {
          response.status(200).json({
            status: 1,
            count: result.rowCount,
            hasil: results.rows
          })
        })
      }
    })
  }
  else if ((startDate!=null)&&(endDate==null)){
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else{
        pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${date}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%')`, (error, result) => {
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
    pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${endDate}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
      if (error) {
        response.status(400).send({
          status: 0,
          pesan: 'Failed to GET',
        })
      }
      else{
        pool.query(`SELECT * FROM log WHERE (waktu BETWEEN '${startDate}' AND '${endDate}') AND (nama LIKE '%${search}%' OR nim LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR kelas LIKE '%${search}%' OR status LIKE '%${search}%')`, (error, result) => {
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
  var {startDate,endDate} = request.body
  pool.query(`SELECT * FROM log WHERE (nim = '${nim}') AND (waktu BETWEEN '${startDate}' AND '${endDate}')`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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

const createLog = (request, response) => {
  var {waktu, nama, nim, koderuangan, kodematkul, kelas, status} = request.body
  pool.query('INSERT INTO log (waktu, nama, nim, koderuangan, kodematkul, kelas, status) VALUES ($1, $2, $3, $4, $5, $6, $7)', [waktu, nama, nim, koderuangan, kodematkul, kelas, status], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteLog= (request, response) => {
  var {startDate, endDate} = request.body
  pool.query(`DELETE FROM log WHERE waktu BETWEEN '${startDate}' AND '${endDate}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getMatkul = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM matkul WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR kodematkul LIKE '%${search}%' OR namamatkul LIKE '%${search}%' OR kelas LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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

const createMatkul = (request, response) => {
  var {fakultas, jurusan, kodematkul, namamatkul, kelas} = request.body
  pool.query('INSERT INTO matkul (fakultas, jurusan, kodematkul, namamatkul, kelas) VALUES ($1, $2, $3, $4, $5)', [fakultas, jurusan, kodematkul, namamatkul, kelas], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateMatkul = (request, response) => {
  var {oldkodematkul, oldkelas, newnamamatkul, newkelas} = request.body
  pool.query(`UPDATE matkul set namamatkul='${newnamamatkul}', kelas='${newkelas}' WHERE kodematkul='${oldkodematkul}' and kelas='${oldkelas}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
    }
  )
}

const deleteMatkul = (request, response) => {
  var {kodematkul, namamatkul, kelas} = request.body
  pool.query(`DELETE FROM matkul WHERE kodematkul = '${kodematkul}' AND namamatkul = '${namamatkul}' AND kelas = '${kelas}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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

const getDeviceMatkulPengguna = (request, response) => {
  var {koderuangan} = request.params
  pool.query(`SELECT hari, jam, durasi, kodematkul, kelas FROM filterruangan WHERE koderuangan = '${koderuangan}' ORDER BY hari asc, jam asc`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      response.status(200).json({
        status: 1,
        count: results.rowCount,
        hasil: results.rows
      })
    }
  })
}

const getDevicePengguna = (request, response) => {
  var {kodematkul, kelas, offset} = request.params
  pool.query(`SELECT a.nim, a.nama, b.finger1, b.finger2 FROM filterpengguna a INNER JOIN pengguna b ON a.kodematkul = '${kodematkul}' AND a.kelas = '${kelas}' AND a.nim = b.nim ORDER BY a.nim asc LIMIT 5 OFFSET '${offset}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      pool.query(`SELECT a.nim, a.nama, b.finger1, b.finger2 FROM filterpengguna a INNER JOIN pengguna b ON a.kodematkul = '${kodematkul}' AND a.kelas = '${kelas}' AND a.nim = b.nim ORDER BY a.nim asc`, (error, resultss) => {
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
            hasil: results.rows
          })
        }
      })
    }
  })
}

const getPengguna = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' OR finger1 LIKE '%${search}%' OR finger2 LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE fakultas LIKE '%${search}%' OR jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' OR finger1 LIKE '%${search}%' OR finger2 LIKE '%${search}%'`, (error, result) => {
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
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' OR finger1 LIKE '%${search}%' OR finger2 LIKE '%${search}%') ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      pool.query(`SELECT fakultas,jurusan,nim,nama FROM pengguna WHERE (fakultas = '${fakultas}') AND (jurusan LIKE '%${search}%' OR nim LIKE '%${search}%' OR nama LIKE '%${search}%' OR finger1 LIKE '%${search}%' OR finger2 LIKE '%${search}%')`, (error, result) => {
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
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updatePengguna = (request, response) => {
  var { oldnim, newnim, newnama, newfinger1, newfinger2 } = request.body
  pool.query(`UPDATE pengguna set nim='${newnim}', nama='${newnama}', finger1='${newfinger1}', finger2='${newfinger2}' WHERE nim='${oldnim}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
    }
  )
}

const deletePengguna = (request, response) => {
  var {nim} = request.body
  pool.query(`DELETE FROM pengguna WHERE nim = '${nim}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getRuangan = (request, response) => {
  var {sortby, ascdsc, search, page, limit} = request.body
  var offset = page*limit-limit;
  pool.query(`SELECT * FROM ruangan WHERE kodedevice LIKE '%${search}%' OR koderuangan LIKE '%${search}%' OR alamat LIKE '%${search}%' ORDER BY ${sortby} ${ascdsc} LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
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
  var {kodedevice, koderuangan, alamat} = request.body
  var lastseen = new Date().toLocaleString() + "+0"
  var status = 1
  pool.query('INSERT INTO ruangan (kodedevice, koderuangan, alamat, lastseen, status) VALUES ($1, $2, $3, $4, $5)', [kodedevice, koderuangan, alamat, lastseen, status], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateRuangan = (request, response) => {
  var { oldkodedevice, newkoderuangan, newalamat } = request.body
  pool.query(`UPDATE ruangan set koderuangan='${newkoderuangan}', alamat='${newalamat}' WHERE kodedevice='${oldkodedevice}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
  var {kode} = request.body
  pool.query(`UPDATE ruangan set status='${kode}' WHERE kodedevice='${kodedevice}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
  pool.query(`UPDATE ruangan set lastseen='${lastseen}' WHERE kodedevice='${kodedevice}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      pool.query(`SELECT status FROM ruangan WHERE kodedevice='${kodedevice}'`,(error, resultss) => {
        if (error) {
          response.status(400).send({
            status: 0,
            pesan: "Input data is incorrect"
          })
        }
        else{
          response.status(200).json({
            status: resultss.rows[0].status,
          })
        }
      })
    }
  })
}

const deleteRuangan = (request, response) => {
  var {kodedevice} = request.body
  pool.query(`DELETE FROM ruangan WHERE kodedevice = '${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
  var {nama, waktu} = request.body
  pool.query('INSERT INTO coba (nama, waktu) VALUES ($1, $2)', [nama, waktu], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
    else{
      response.status(200).json({
          status: 1,
	  count: results.rowCount,
          hasil: results.rows
      })
    }
  })
}

const createDataFingerprint = (request, response) => {
  var {no, template} = request.body
  pool.query('INSERT INTO datafingerprint (no, template) VALUES ($1, $2)', [no, template], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const updateDataFingerprint = (request, response) => {
  var { no, template } = request.body
  pool.query(`UPDATE datafingerprint set template='${template}' WHERE no='${no}'`,(error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data updated"
      })
    }
    }
  )
}

const deleteDataFingerprint = (request, response) => {
  var {no} = request.body
  pool.query(`DELETE FROM datafingerprint WHERE no = '${no}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data deleted"
      })
    }
  })
}

const getFingerprintDevice = (request, response) => {
  var {kodedevice} = request.params
  pool.query(`SELECT kodedevice FROM ruangan WHERE kodedevice='${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      if (results.rowCount==0){
        response.status(400).json({
          status: 0,
        })
      }
      else{
        response.status(200).json({
          status: 1,
        })
      }
    }
  })
}

const getFingerprint = (request, response) => {
  var {kodedevice} = request.params
  pool.query(`SELECT template FROM fingerprint WHERE device='${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: 'Failed to GET',
      })
    }
    else{
      response.status(200).json({
          status: 1,
          hasil: results.rows
      })
    }
  })
}

const createFingerprint = (request, response) => {
  var {device, template} = request.body
  console.log(device);
  console.log(template);
    
  pool.query('INSERT INTO fingerprint (device, template) VALUES ($1, $2)', [device, template], (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Data added"
      })
    }
  })
}

const deleteFingerprint = (request, response) => {
  var {kodedevice} = request.body
  pool.query(`DELETE FROM fingerprint WHERE device = '${kodedevice}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "Input data is incorrect"
      })
    }
    else{
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
    else{
      response.status(200).json({
        status: 1,
        pesan: results.rows
      })
    }
  })
}

const testcreate = (request, response) => {
  var {no, isi} = request.body
  pool.query(`insert into test (no, isi) values (${no}, '${isi}')`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Create finish"
      })
    }
  })
}
const testupdate = (request, response) => {
  var {no_new, no_old, isi_new, isi_old} = request.body
  pool.query(`update test set no = ${no_new}, isi = '${isi_new}' where no = ${no_old} and isi = '${isi_old}'`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "Update finish"
      })
    }
  })
}
const testdelete = (request, response) => {
  var {no} = request.body
  pool.query(`delete from test where no = ${no}`, (error, results) => {
    if (error) {
      response.status(400).send({
        status: 0,
        pesan: "get data failed"
      })
    }
    else{
      response.status(200).json({
        status: 1,
        pesan: "delete finish"
      })
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
  getDeviceMatkulPengguna,
  getDevicePengguna,
  getPengguna,
  getPenggunaByFakultas,
  createPengguna,
  updatePengguna,
  deletePengguna,
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
  testdelete
}

//
//select a.hari, a.jam, b.kodematkul, c.nim, c.nama, c.finger1, c.finger2 from filterruangan a inner join filterpengguna b on a.koderuangan = '9125' and  a.kodematkul = b.kodematkul inner join pengguna c on b.nim = c.nim order by a.hari asc, a.jam asc;

