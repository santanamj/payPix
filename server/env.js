const fs = require('fs');
const gerarToken = require('./controllers/gerarToken');
if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://msantana:0211ms11d4@ds018258.mlab.com:18258/burguer'; // Databse URI and database name
  process.env.databaseName = 'production database: burguer-service'; // Database name
  process.env.user2 =  'cZckWzxX0xsy0',
   process.env.pdw2 = '9a6a013b-54df-49a5-bf99-f674761f5775'
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://msantana:0211ms11d4@ds018258.mlab.com:18258/burguer'; // Databse URI and database name
  process.env.databaseName = 'development database: burguer-service'; // Database name
  process.env.user2 =  'cZckWzxX0xsy0',
   process.env.pdw2 = '9a6a013b-54df-49a5-bf99-f674761f5775'
   process.env.TOKEN = '9CBEB7FB7AAF269C9A8C011742AB36689A51344261101728894F9A7D33673F2F';
}
