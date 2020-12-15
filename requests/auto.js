var db = require('../db')

exports.findAll = function(req, res, next) {
      db.pool.query("SELECT car.id_car, " +
      " (SELECT mark.name_mark FROM mark WHERE mark.id_mark = model.id_mark)  AS name_mark, " +
      " model.name_model, " + 
      " car.data_output, motor.volume_motor, "  +
      " (SELECT fuel.name_fuel FROM fuel WHERE fuel.id_fuel = motor.id_fuel) " +
      " AS name_fuel,color.name_color,car.cost " + 
      " FROM car INNER JOIN model ON car.id_model = model.id_model " +
      " INNER JOIN motor ON car.id_motor = motor.id_motor " +
      " INNER JOIN color ON car.id_color = color.id_color " +
      " ORDER BY id_car;" , function (err, result, fields) {
      if (err) { return next(err); }
      res.send(result);
    });
};


exports.delete = function(req, res, next) {
  //console.log(req.params.id)
  db.pool.query("delete from car " + 
    "where id_car = " + req.params.id + ";", function (err, result, fields) {
    if (err) { return next(err); }
    res.send(result);
  });
}



exports.add = function(req, res, next) {
  if (!req.body) return res.sendStatus(400)

  var id_mark;
  var id_model;
  var id_color;
  var id_motor;
db.pool.query("INSERT INTO mark (name_mark) " + 
    "VALUES ( \"" + req.body.name_mark + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_mark = result.insertId;
      
db.pool.query("INSERT INTO model (`name_model`,`id_mark`) " + 
    "VALUES ( \"" + req.body.name_model + "\", " + id_mark + " );", function (err, result, fields) {
        if (err) { return next(err); }
        id_model = result.insertId;
      
db.pool.query("INSERT INTO color (name_color) " + 
    "VALUES ( \"" + req.body.name_color + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_color = result.insertId;
      
db.pool.query("INSERT INTO fuel (name_fuel) " + 
    "VALUES ( \"" + req.body.name_fuel + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_fuel = result.insertId;
      
db.pool.query("INSERT INTO motor (volume_motor,id_fuel) " + 
    "VALUES ( \"" + req.body.volume_motor + "\" , " + id_fuel + " );", function (err, result, fields) {
        if (err) { return next(err); }
        id_motor = result.insertId;      
db.pool.query("INSERT INTO car (id_model, id_color, id_motor, data_output, cost) " +
        " VALUES ( " + id_model + ", " + id_color + " , " + id_motor + " , \"" + req.body.data_output + "\" , \"" + req.body.cost + "\" );", function (err, result, fields) {
          if (err) { return next(err); }
          res.send(result);
      });});});});});
    });
};




exports.update = function(req, res, next) {
  if (!req.body) return res.sendStatus(400)

  var id_mark_up;
  var id_model_up;
  var id_color_up;
  var id_motor_up;
db.pool.query("INSERT INTO mark (name_mark) " + 
    "VALUES ( \"" + req.body.name_mark + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_mark_up = result.insertId;      
db.pool.query("INSERT INTO model (`name_model`,`id_mark`) " + 
    "VALUES ( \"" + req.body.name_model + "\", " + id_mark_up + " );", function (err, result, fields) {
        if (err) { return next(err); }
        id_model_up = result.insertId;      
db.pool.query("INSERT INTO color (name_color) " + 
    "VALUES ( \"" + req.body.name_color + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_color_up = result.insertId;      
db.pool.query("INSERT INTO fuel (name_fuel) " + 
    "VALUES ( \"" + req.body.name_fuel + "\" );", function (err, result, fields) {
        if (err) { return next(err); }
        id_fuel_up = result.insertId;      
db.pool.query("INSERT INTO motor (volume_motor,id_fuel) " + 
    "VALUES ( \"" + req.body.volume_motor + "\" , " + id_fuel_up + " );", function (err, result, fields) {
        if (err) { return next(err); }
        id_motor_up = result.insertId;     
db.pool.query("UPDATE car SET " +
        " id_model = " + id_model_up + " , " +
        " data_output = " + req.body.data_output + " , " +
        " id_motor = " + id_motor_up + " , " +
        " id_color = " + id_color_up + " , " +
        " cost = " + req.body.cost + 
        " WHERE car.id_car = '" + req.body.id_car + "';", function (err, result, fields) {
          if (err) { return next(err); }
          res.send(result);
      });});});});});
    }); 
};
