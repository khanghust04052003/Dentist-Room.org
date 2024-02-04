
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
let isSuccessLogined;
let IDNumber;
let idDoctor;
let isDoctor;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'dung2003@',
  database: 'nhom_4',
});


const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/listpatient', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'listpatient.html'));
});

app.get('/thongtin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thongtin.html'));
});

app.get('/doctorcheck', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'doctorcheck.html'));
});

app.get('/person', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'person.html'));
});

app.get('/api/getServerData', (req, res) => {
  res.json(isSuccessLogined);
});

app.get('/', (req, res) => {
  isSuccessLogined = false;
  IDNumber = undefined;
  idDoctor = undefined;
  isDoctor  = undefined;
  console.log(isSuccessLogined );
  res.sendFile(__dirname + '/index.html');
});

//đăng nhập
app.post('/login-check', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const query1 = `SELECT * FROM doctor WHERE UserName = '${username}' AND Password = '${password}'`;
  connection.query(query1,  (err, results) => {
      if (err) {
          console.error('Lỗi truy vấn MySQL:', err);
          res.json({ error: 'Đã xảy ra lỗi khi kiểm tra thông tin đăng nhập.' });
          return;
      }
      if (results.length > 0) {
        isSuccessLogined = true;
        isDoctor = true;
        idDoctor = results[0][`Doctor ID`];
        res.send(results);

      } else {
        // Thực hiện truy vấn để kiểm tra thông tin đăng nhập
        const query = `SELECT * FROM patient WHERE UserName =  '${username}' AND Password = '${password}'`;
        connection.query(query,  (err, results1) => {
            if (err) {
                console.error('Lỗi truy vấn MySQL:', err);
                res.json({ error: 'Đã xảy ra lỗi khi kiểm tra thông tin đăng nhập.' });
                return;
            }
            if (results1.length > 0) {
               isSuccessLogined = true;
              IDNumber = results1[0]['Patient ID'];
              isDoctor = false;
              res.send(results1);
            } else {
              isDoctor = false;

              res.send(false);   

            }


    });
      }
  });



  
});


app.post('/register', (req, res) => {
  const { username, password, email } = req.body;


  // Thêm thông tin đăng ký vào bảng "patient"
  const sql = 'INSERT INTO patient (username, password, email) VALUES (?, ?, ?)';
  connection.query(sql, [username, password, email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Xử lý khi khóa chính bị trùngs

        // Trích xuất tên của cột bị trùng từ thông điệp lỗi
        const duplicateEntryDetails = /Duplicate entry '(.+)' for key/.exec(err.message);

        if (duplicateEntryDetails && duplicateEntryDetails.length > 1) {
          const duplicateKeyName = duplicateEntryDetails[1];
          
          res.send(`Giá trị <span style='color: red;'>${duplicateKeyName}</span> đã được sử dụng, vui lòng thử lại.`);
        }
      }else{console.log(err)}
    }

    if(result) {
      res.send(`Đăng kí thành công`);
    }
    


  });
});
//gửi thông tin
app.post('/submit-form', (req, res) => {
  const { name, birthday, email , numberphone } = req.body;
  const checkExistQuery = `SELECT * FROM patient WHERE \`Patient ID\`=${IDNumber}`;
  

  connection.query(checkExistQuery, (error, results, fields) => {
    if (error) {
      console.error('Error checking existence:', error);
    
      return;
    }
    if (results.length > 0) {
      const updateQuery = `UPDATE patient SET \`Full Name\`='${name}', Birth='${birthday}', email='${email}', \`Phone Number\`=${numberphone}  WHERE \`Patient ID\`=${IDNumber}   `;
      connection.query(updateQuery, (err, results, fields) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            // Xử lý khi khóa chính bị trùngs
    
            // Trích xuất tên của cột bị trùng từ thông điệp lỗi
            const duplicateEntryDetails = /Duplicate entry '(.+)' for key/.exec(err.message);
    
            if (duplicateEntryDetails && duplicateEntryDetails.length > 1) {
              const duplicateKeyName = duplicateEntryDetails[1];
              
              res.send(`Giá trị <span style='color: red;'>${duplicateKeyName}</span> đã được sử dụng, vui lòng thử lại.`);
            }
          } else {
            // Xử lý lỗi khác
            console.log(err);
          }
        } else {
          res.send('Gửi thông tin thành công');
        }
      
      
      });
    } 
  

  });

});


//lấy trạng thái đăng nhập của bác sĩ
app.get('/Login-doctor', (req, res) => {
  // Thực hiện truy vấn để lấy thông tin từ cơ sở dữ liệu
  if (isDoctor== undefined ) {
    isDoctor = false;
  }

  res.json(isDoctor);

});

app.get('/options-out', (req, res) => {
  // Thực hiện truy vấn để lấy thông tin từ cơ sở dữ liệu
  isSuccessLogined = false;
  res.json(isSuccessLogined);

});



// lấy dữ liệu bác sĩ
app.get('/options', (req, res) => {
  // Thực hiện truy vấn để lấy thông tin từ cơ sở dữ liệu
  connection.query('SELECT * FROM nhom_4.doctor', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Trả về dữ liệu dưới dạng JSON
    res.json(results);
  });
});

//lấy dữ liệu bệnh nhân
app.get('/get-info-app', (req, res) => {
    connection.query(`SELECT * FROM appointment WHERE \`Doctor ID\` = ${idDoctor}`, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Trả về dữ liệu dưới dạng JSON
    res.json(results);
  });
});

app.get('/get-patient-app', (req, res) => {
  connection.query(`SELECT * FROM patient  `, (err, results) => {
  if (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
  // Trả về dữ liệu dưới dạng JSON
  res.json(results);
});
});

app.get('/get-patient-info', (req, res) => {
  connection.query(`SELECT * FROM patient WHERE  `, (err, results) => {
  if (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
  // Trả về dữ liệu dưới dạng JSON
  res.json(results);
});
});

var doctor_check;
app.get('/doctor', (req, res) => {
  // Trả về trang cho các bác sĩ và truyền biến name
  const name = req.query.ID || 'Unknown';
  doctor_check = name;
  res.sendFile(path.join(__dirname, 'public', 'doctor.html'));
});

app.get('/doctor_id', (req, res) => {

  res.json( doctor_check);

});

app.get('/info_doctor_check', (req, res) => {
  // Thực hiện truy vấn để lấy thông tin từ cơ sở dữ liệu
  connection.query(`SELECT * FROM nhom_4.doctor WHERE \`Doctor ID\`= ${doctor_check}`, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Trả về dữ liệu dưới dạng JSON
    res.json(results);
  });
});





//Gủi thông tin đăng nhập thành công
app.get('/Login-success', (req, res) => {
  // Thực hiện truy vấn để lấy thông tin từ cơ sở dữ liệu
  if (isSuccessLogined== undefined) {
    isSuccessLogined = false;
  }

  res.json(isSuccessLogined);

});

// lấy thông tin thời gian
app.get('/get-time', (req, res) => {
  connection.query('SELECT * FROM appointment', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Trả về dữ liệu dưới dạng JSON
    res.json(results);
  });
});


//lấy thông tin buổi khám bệnh
app.get('/get-info', (req, res) => {
    // Thực hiện truy vấn SQL để lấy dữ liệu
    const query = `SELECT * FROM patient WHERE \`Patient ID\` = ${IDNumber}`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Lỗi khi thực hiện truy vấn:', error);
        return;
      }
      else{
        res.send(results);
      }
  
      // Đóng kết nối sau khi thực hiện truy vấn

    });
  
});

//gửi thông tin buổi khám bệnh
app.post('/post-app', (req, res) => {
  const data = req.body;

  // Thực hiện truy vấn SQL để chèn dữ liệu vào bảng timeapp
  const sql = 'INSERT INTO appointment (`Appointment ID`,`Start Time`, `Appoint Date`,  `Doctor ID`,`Patient ID`) VALUES (?, ?, ?, ?, ?)';

  const values = [IDNumber, data.inputSymptoms,data.inputTimeDay,data.inputDoctorName, IDNumber];
  if(IDNumber === undefined){
    res.json('Bác sĩ không thể đặt lịch');

  }
  if(isSuccessLogined == true){
    connection.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
  
          res.json('Bạn đã có hẹn với một bác sĩ khác');
        } else {
          // Xử lý lỗi khác
          console.log(err);
        }
      } else {
        res.json('Gửi thông tin thành công');
        
      }
  
      
    });
  }
  else{
    res.json('Yêu cầu đăng nhập để đặt lịch');

  }

});

//bác sĩ tự đặt lịch
app.post('/post-app-doctor', (req, res) => {
  const data = req.body;

  // Thực hiện truy vấn SQL để chèn dữ liệu vào bảng timeapp
  const sql = 'INSERT INTO appointment (`Appointment ID`,`Start Time`, `Appoint Date`,  `Doctor ID`,`Patient ID`) VALUES (?, ?, ?, ?, ?)';

  const values = [data.inputID, data.inputSymptoms,data.inputTimeDay,idDoctor, data.inputID];


  connection.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {

        res.json('Bệnh nhân đã có lịch hẹn');
      } else {
        // Xử lý lỗi khác
        res.json('Đã xảy ra lỗi vui lòng thử lại sau');
      }
    } else {
      res.json('Gửi thông tin thành công');
      
    }

    
  });
  

});

app.post('/delete-patient', (req, res) => {
  const data = req.body;
  console.log(data);
  const sql2 = `DELETE FROM nhom_4.appointment WHERE \`Patient ID\` = ${data.id}`;
  const sql1 = `DELETE FROM nhom_4.disease WHERE \`Patient ID\` = ${data.id}`;
  const sql3 = `DELETE FROM nhom_4.patient WHERE \`Patient ID\` = ${data.id}`;



  


  connection.query(sql1, (err, result) => {
    if (err) {
      console.log(err);
      res.json('Đã xảy ra lỗi vui lòng thử lại sau');

    } else {
      connection.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
          res.json('Đã xảy ra lỗi vui lòng thử lại sau');
    
        } else {
          connection.query(sql3, (err, result) => {
            if (err) {
              console.log(err);
              res.json('Đã xảy ra lỗi vui lòng thử lại sau');
        
            } else {
              res.json('Xóa thông tin thành công');
            }
          });
        }
      });
    }
  });


    
      

    
  

});

//gửi thuốc từ bác sĩ
app.post('/post-medi', (req, res) => {
  const data = req.body;

  // Thực hiện truy vấn SQL để chèn dữ liệu vào bảng timeapp
  
  var soNguyen = parseInt(data.id_patient, 10);
  const medi = [data.medicine,data.dosage,data.price];
  const disease = [data.disease,soNguyen,data.medicine];
  console.log(medi, disease);
  connection.query( 'INSERT INTO medicine (`Medicine Name`,`Dosage`, `Price`) VALUES ( ?, ?, ?) ', medi, (err, results)=> {
    if (err) {
      console.log(err)
    }
    else{

      connection.query('INSERT INTO disease (`Disease Name`,`Patient ID`, `Medicine Name`) VALUES ( ?, ?, ?)', disease, (err, results1) => {
        if (err) {
          console.log(err)
        }
        else{res.json('Gửi thành công')}
      });
    }
    
  
    // Chèn dữ liệu vào bảng 2 với khóa chính từ bảng 1


  });
});

//lấy thuốc
app.get('/get-medi', (req, res) => {
  // Thực hiện truy vấn SQL để lấy dữ liệu


  const query = `
    SELECT *
    FROM medicine
    INNER JOIN disease ON medicine.\`Medicine Name\` = disease.\`Medicine Name\`
    WHERE \`Patient ID\` = ${IDNumber};
  `;

  // Thực hiện truy vấn
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn: ', err);
      throw err;
    }


    res.send(results);

  });

});

// lấy thông tin lịch hẹn
app.get('/get-app-patient', (req, res) => {
  // Thực hiện truy vấn SQL để lấy dữ liệu

  const query = `
    SELECT *
    FROM nhom_4.appointment
    INNER JOIN nhom_4.doctor ON nhom_4.appointment.\`Doctor ID\` = nhom_4.doctor.\`Doctor ID\`
    WHERE \`Patient ID\` = ${IDNumber};
  `;

  // Thực hiện truy vấn
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn: ', err);
      throw err;
    }


    res.send(results);

  });

});

app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});

//