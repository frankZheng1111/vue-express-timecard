"use strict"

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');

let Model = require('./models');

let app = express();

app.set('port', process.env.PORT || 8888);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.all("*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.post('/create', (req, res, next) => {
  //接收前端发送的字段
  let timeCard = req.body;
  //如果我们需要的字段不存在，返回前端信息
  if(!timeCard.description || !timeCard.startTime || !timeCard.duration) {
    res.send({errcode:-1,errmsg:"params missed"});
    return;
  }
  //如果存在就插入数据库，返回OK
  new Model.TimeCard({description: timeCard.description, duration: timeCard.duration, startTime: timeCard.startTime}).save((err, ret) => {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      console.log(ret);
      res.send({errcode:0, errmsg:"ok", timeCard: ret});
    }
  });
});


  //app.js
let ObjectID = require('mongodb').ObjectID

//获取总时长
app.get('/time-full-duration', (req, res, next) => {
  //获取数据表
  // let collection = _db.collection('my_time_card');
  let time = 0;
  //查询出所有计划
  Model.TimeCard.find((err, ret) => {
    if(err) {
      console.error(err);
      return;
    }
    //所有计划累加时长
    ret.forEach(function (item, index) {
      time += +item.duration;
    });
    //返回时长
    res.json({errcode:0,errmsg:"ok",time:time});
  });
});

//获取列表
app.get('/time-cards', (req, res, next) => {
  // let collection = _db.collection('my_time_card');
  Model.TimeCard.find((err, ret) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(ret);
    res.json(ret);
  });
});

//删除计划
app.delete('/delete/:id', (req, res, next) => {
  let _id = req.params.id;
  // let collection = _db.collection('my_time_card');
  console.log(_id)
  //使用mongodb的唯一ObjectId字段查找出对应id删除记录
  Model.TimeCard.remove({_id: new ObjectID(_id)}, (err, result) => {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.send({errcode:0,errmsg:"ok"});
    }
  });
});

// 定制404页
// 404 catch-all 处理器(中间件)
app.use((req, res) => {
  res.status(404).end();
});

// 定制500页面
// 500错误处理器(中间件)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end();
});

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
// });
