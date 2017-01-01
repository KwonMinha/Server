var express = require('express');
var mysql = require('mysql');
var db_config = require('../config/db_config.json');
var awsinfo_config = require('../config/awsinfo_config.json');
var router = express.Router();

var pool = mysql.createPool({
  host : db_config.host,
  port : db_config.port,
  user : db_config.user,
  password : db_config.password,
  database : db_config.database,
  connectionLimit : db_config.connectionLimit
});

router.get('/', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
        sql = 'select big_category, small_category from category order by big_category ASC';
      connection.query(sql, function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          // res.status(201).send({result : 'create'});
          connection.release();
          console.log(rows);
          res.render('category',
            {
              title : '바스켓 카테고리 설정 페이지',
              categorys : rows
            }
          );
        }
      });
    }
  });
});

module.exports = router;
