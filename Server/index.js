// always use 'npm run devStart'

/*
    As mysql module is old, we got an error of 
    "Client does not support authenticatication
    protocol requested by server"
    
    so following SQL command is used to rectify it

        "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
        Where root as your user localhost as your URL and password as your password
        Then run this query to refresh privileges:
        "flush privileges;""
        Try connecting using node after you do so.
        If that doesn't work, try it without @'localhost' part.
    
    But a new mysql2 module rectifies all these errors,
    so I used it on 1 June 2022.
*/



const express = require('express')
const app = express()

const mysql = require('mysql2')
const dataBase = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database: 'HOSPITAL'
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const cors = require('cors')
app.use(cors())
app.use(express.json())


app.get("/api/get", (req,res)=>{
    const sqlSELECT = "SELECT * FROM TREAT"
    dataBase.query(sqlSELECT, (err,result)=>{
        res.send(result)
    })
})


app.post("/api/insert", (req, res)=>{
    const patient_Name_server = req.body.patient_Name_client
    const doctor_Name_server = req.body.doctor_Name_client

    const SQLinsert = "INSERT INTO TREAT (PNAME, DNAME) VALUES (?,?)"
    dataBase.query(SQLinsert, [patient_Name_server, doctor_Name_server], (err, result)=>{
        console.log("DONE!!")
    })
})

app.delete("/api/delete/:Pname", (req, res)=>{
    const dele_pat_name = req.params.Pname;

    const SQLdelete = " DELETE FROM TREAT WHERE PNAME = ?"
    dataBase.query(SQLdelete, dele_pat_name, (err,result)=>{
        if (err) console.log(err)
        console.log(dele_pat_name,"deleted!!");
    })
})

//here we only update the
//doctor's name corresponding to a patient

app.put("/api/update", (req, res)=>{
    const update_pat_name = req.body.client_Pat_update
    const update_doc_name = req.body.client_Doc_update
    const SQLupdate = " UPDATE TREAT set DNAME = ? WHERE PNAME = ?"
    dataBase.query(SQLupdate,[update_doc_name, update_pat_name], (err,result)=>{
        if (err) console.log(err)
        console.log(update_pat_name,"updated!!");
    })
})



/*dataBase.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/ 


/*const sqlInsert = "INSERT INTO  TREAT (PNAME, DNAME) VALUES ('mit' , 'DR.mim');"
function dbms(){
    dataBase.query(sqlInsert, (err,result) =>{
        if (err) throw err;
        console.log("DONE")
    })
}*/


//I dont know why but the MySQL command runs(the dbms() function)
//runs only when you refresh the local host
//what I think now id node only runs express commands on refreshing
//the host.
//But remember to refresh the host if you do this get command below.

/*app.get("/",(req,res)=>{
    //dbms();
    res.send("jilo");
})*/


//As now here we are going to integrate front end and backend, 
//In front end the Axios API library delivers posts to the backend
//thus, now the backend should receive those posts


function print(){
    console.log("Hi, Divyam");
}
app.listen(3001,print())
