const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const BodyParser = require('body-parser');
const app = express();
const port = 3500;


//body parser
app.use(BodyParser.urlencoded({extended: true}));

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
  port: 3306,
  user: 'root',
  password: '!23Trioganas',
  database: 'db_pths'
})

connection.connect((err) =>{
  if(err) throw err
  console.log('Database Connected')
})

app.get('/laporan-penjualan', (req, res) => {
  connection.connect((err) =>{
    if(err) throw err
    console.log('Database Connected')
  })
  const sqlGetPenjualan = 'select * from laporan_penjualan'
  connection.query(sqlGetPenjualan, (err, resultLaporanPenjualan) =>{
    if(err) throw err
    console.log('Hasil get penjualan -->',resultLaporanPenjualan)
    res.render('laporan-penjualan',{
      layout: 'layouts/main-layouts',
      title: 'Laporan Penjualan',
      resultLaporanPenjualan: resultLaporanPenjualan
    })
  })
  
})


app.post('/tambahpenjualan', (req, res) => {
  const sqlInsertPenjualan = `INSERT INTO laporan_penjualan(qty_bawa, qty_sisa, harga_jual) VALUES ('${req.body.qtybawaPenjualan}, ${req.body.qtysisaPenjualan}, ${req.body.hargajualPenjualan}');`
  connection.query(sqlInsertPenjualan, (err, result) =>{
    if(err) throw err
    res.redirect('/laporan-penjualan')
  })
})


//main route
app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('index',{
    layout: 'layouts/main-layouts',
    title: 'Home Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    layout: 'layouts/main-layouts',
    title: 'About Page'
  })
})

// app.get('/laporan-penjualan', (req, res) => {
//   res.render('laporan-penjualan',{
//     layout: 'layouts/main-layouts',
//     title: 'Laporan Penjualan',
//     resultLaporanPenjualan: resultLaporanPenjualan
//   })
// })

app.get('/contact',(req, res) =>{
  res.render('contact', {
    layout:'layouts/main-layouts',
    title: 'Contact Page'});
})