var mysql = require('mysql');

var createConnection = () => {
  return mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: '0aym5x8nPp',
    password: 'J6LJVOIc0H',
    database: '0aym5x8nPp',
    dateStrings:true,
    timezone: 'Z',
    typeCast: function castField(field, useDefaultTypeCasting) {

      // We only want to cast bit fields that have a single-bit in them. If the field
      // has more than one bit, then we cannot assume it is supposed to be a Boolean.
      if ((field.type === "BIT") && (field.length === 1)) {

        var bytes = field.buffer();

        // A Buffer in Node represents a collection of 8-bit unsigned integers.
        // Therefore, our single "bit field" comes back as the bits '0000 0001',
        // which is equivalent to the number 1.
        return (bytes[0] === 1);

      }

      return (useDefaultTypeCasting());

    }
  });
}

module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
        connection.end();
      });
    });
  },
  addnewPost: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.insertId);
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {
      var id = entity[idField];
      delete entity[idField];

      var sql = `update ${tableName} set ? where ${idField} = ?`;
      console.log(sql);
      console.log(id);

      var connection = createConnection();
      connection.connect();
      connection.query(sql, [entity, id], (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      console.log((Number.isInteger(parseInt(id))));
      sql = `delete from ${tableName} where ${idField} = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql,id, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },
}