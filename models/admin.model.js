var db = require('../utils/db');
module.exports = {
    getallUsers: () =>{
        return db.load('SELECT USERs.*,BAIVIETs.IDTacGia,COUNT(BAIVIETs.IDTacGia) AS count FROM USERs,BAIVIETs WHERE USERs.ID = BAIVIETs.IDTacGia GROUP BY BAIVIETs.IDTacGia')
    },
    getallNews: ()=>{
        return db.load('SELECT BAIVIETs.*,LOAIs.TenLoai,KINDs.Ten as kind from BAIVIETs,LOAIs,KINDs WHERE LOAIs.ID = BAIVIETs.IDCategory and KINDs.IDKind= BAIVIETs.IDKind')

    },
    updateUser: entity => {
        return db.update('USERs', 'ID', entity);
      },

}  