import mysql from "mysql";
import express from "express";
import cors from "cors";


const app = express();
const port = 8801;
const db = mysql.createConnection({
    host:"localhost",
    user:"ashwin",
    password:"StrongPassword123!",
    database:"smart_card_users"
});

app.use(express.json()) // express.json converts the json object that is being sended from postman to normal text so req.body can easily use the data
app.use(cors())

app.get("/" , (req,res)=>{
    res.json("This is the backend")
})
app.get("/users",(req,res)=>{
    const q = "select * from users";
    db.query(q,(err,data)=>{
        if (err) res.json(err)
        return res.json(data)
    })
})

app.post("/users",(req,res)=>{
    const q = "insert into users ( `account_holder` , `balance`) values (? , ?  )  "
    const values = [
        req.body.account_holder,
        req.body.balance,
    ]
    db.query(q,values,(err,data)=>{
        if(err) res.json(err)
        return res.json("user created succesfully in DB")
    } )
})


app.put("/users/:uid",(req,res)=>{
    const uid = req.params.uid;
    console.log(uid)
    const q = "UPDATE users SET account_holder = ?, balance = ? WHERE uid = ?";
    const values = [
        req.body.account_holder,
        req.body.balance,
        uid
    ];
    db.query(q,values,(err,data)=>{
        if (err) res.json(err)
        else return res.json("user updated successfully ")
    })

})

app.delete("/users/:uid",(req,res)=>{
    const uid =  req.params.uid;
    console.log("deleted uid")
    const q ="DELETE FROM users WHERE uid = ? ";
    db.query(q,uid,(err,data)=>{
        if(err) res.json(err)
        else return res.json("User deleted succesfully")
    })
})

app.listen(port , () =>{
    console.log ("Connected to backend ")
    
})




