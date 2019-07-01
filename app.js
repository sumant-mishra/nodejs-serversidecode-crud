const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3100;



var cors = require('cors');
app.use(bodyParser.json());

app.use(cors());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'password',
  database : 'crud'
});


app.get('/employees', function (req, res) {
    
    connection.query('SELECT id, first_name as firstName, last_name as lastName, email, department, salary, gender, hire_date, region_id FROM employees', function (error, results, fields) {
        //console.log(fields);
        if (error) throw error;
        res.send(results);
    });

})

app.put('/employees/:id', function (req, res) {
    
    let objPostData = req.body;
    
    connection.query('UPDATE employees SET ? WHERE id=?', [{first_name: objPostData.firstName,
                                                            last_name: objPostData.lastName,
                                                            email: objPostData.email,
                                                            salary: objPostData.salary,
                                                            department: objPostData.department,
                                                            gender: objPostData.gender,
                                                            hire_date: objPostData.hire_date,
                                                            region_id: objPostData.region_id
                                                }, req.params.id], function (error, results, fields) {
        if (error) throw error;
        objPostData.id = results.insertId;
        res.send(objPostData);
    });
})

app.post('/employees', function (req, res) {
    
    let objPostData = req.body;

    connection.query('INSERT INTO employees SET ?', {first_name: objPostData.firstName,
                                                    last_name: objPostData.lastName,
                                                    email: objPostData.email,
                                                    salary: objPostData.salary,
                                                    department: objPostData.department,
                                                    gender: objPostData.gender,
                                                    hire_date: objPostData.hire_date,
                                                    region_id: objPostData.region_id
                                                }, function (error, results, fields) {
        if (error) throw error;
        objPostData.id = results.insertId;
        res.send(objPostData);
    });

})

app.put('/employees/addbulk', function (req, res) {
    //res.send('Got a PUT request at /user')

    let objPostData = req.body;

    connection.query('INSERT INTO employees SET ?', {first_name: objPostData.firstName,
                                                    last_name: objPostData.lastName,
                                                    email: objPostData.email,
                                                    salary: objPostData.salary,
                                                    department: objPostData.department,

                                                }, function (error, results, fields) {
        if (error) throw error;
        objPostData.id = results.insertId;
        res.send(objPostData);
    });

})

app.delete('/employees/:id', function (req, res) {
    
    connection.query('DELETE FROM employees WHERE id = '+ req.params.id, function (error, results, fields) {
        if (error) throw error;
        
        res.send({data:'SUCCESS'});
    })

})


app.get('/', (req, res) => res.send('Welcome!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))