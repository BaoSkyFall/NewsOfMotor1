var db = require('../utils/db');
module.exports = {


    getallUsers: () => {
        return db.load('SELECT * FROM USERs');
        // return db.load('SELECT USERs.*,BAIVIETs.IDTacGia,COUNT(BAIVIETs.IDTacGia) AS count FROM USERs,BAIVIETs WHERE USERs.ID = BAIVIETs.IDTacGia GROUP BY BAIVIETs.IDTacGia')
    },
    getallNews: () => {
        return db.load('SELECT BAIVIETs.*,LOAIs.TenLoai,KINDs.Ten as kind from BAIVIETs,LOAIs,KINDs WHERE LOAIs.ID = BAIVIETs.IDCategory and KINDs.IDKind= BAIVIETs.IDKind')

    },
    addUser: entity => {
        return db.add('USERs', entity);
    },
    updateUser: entity => {
        return db.update('USERs', 'ID', entity);
    },
    deleteUser: id => {
        return db.delete('USERs', 'ID', id);
    },
    checkUsers: (user, pass) => {
        return db.load(`SELECT * FROM USERs WHERE USERs.username = "${user}" and USERs.pass="${pass}"`)
    }

}  