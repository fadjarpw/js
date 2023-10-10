const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3500;


//server start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

//view engine
app.set('view engine', 'ejs');

//layouts ejss
app.use(expressLayouts);


//db connection mysql
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  port: 2000,
  user: 'root',
  password: '!23System',
  database: 'db_pths'
})

connection.connect((err) =>{
  if(err) throw err
  console.log('Database Connected')
})


//main route
app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('index',{
    layout: 'layouts/main-layouts',
    title: 'Home Page'
  })
})

app.get('/contact',(req, res) =>{
  res.render('contact', {
    layout:'layouts/main-layouts',
    title: 'Contact Page'});
})