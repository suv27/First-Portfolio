const express = require(`express`);
const app = express();
const port = 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get(`/`, (req, res) => {
  res.render('index', {
    skills: ['Java', 'Android', 'C++','HTML','CSS', 'JavaScript', 'PostgreSQL', 'MySQLite', 'NodeJS','ExpressJS']
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', {

  });
});

app.listen(process.env.PORT || port, (req, res) => {
  console.log(`Listening to port ${port}...`);
});
