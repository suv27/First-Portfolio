const express = require(`express`);
const app = express();
const port = 3000;
const { Pool, Client } = require('pg');
const parser = require('body-parser');
app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: '#BeastMode27',
//     port: 5432,
// });

const pool = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

let newObj = {};

app.get(`/`, (req, res) => {
  res.render('index', {
    skills: ['Java', 'Android', 'C++', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL', 'MySQLite', 'NodeJS','ExpressJS']
  });
});

app.get('/blog', (req, res) => {
  pool.query('SELECT * FROM opinions', (req2, res2) => {

    console.log(req2 + "ddd");
    console.log(res2 + 'aaa');
    newObj = res2.rows;

    res.render('blog', {
      data: newObj
    });
  });
});

// GETTING INFORMATION AND INSERTING IT INTO THE DATABASE
app.post('/post', (req, res) => {

  var inserQuery = {
    text: 'INSERT INTO opinions(title, message) VALUES($1, $2)',
    values: [req.body.title, req.body.message]
  }

  pool.query(inserQuery, (req, res) => {
    console.log('Data inserted to opinios table');
  });

  res.redirect('/blog');

});

app.get('*', (req, res) => {
  res.status(404);
  res.send('PAGE NOT FOUND');
});


app.listen(process.env.PORT || port, (req, res) => {
  console.log(`Listening to port ${port}...`);
});
