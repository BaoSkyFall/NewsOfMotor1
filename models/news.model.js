var db = require('../utils/db');
module.exports = {
    getallnews: () =>{
      return db.load('SELECT BAIVIETs.*,LOAIs.TenLoai,KINDs.Ten as kind from BAIVIETs,LOAIs,KINDs WHERE LOAIs.ID = BAIVIETs.IDCategory and KINDs.IDKind= BAIVIETs.IDKind');
    },
    get8newset: () => {
      return db.load('SELECT BAIVIETs.*,LOAIs.TenLoai,KINDs.Ten as kind from BAIVIETs,LOAIs,KINDs WHERE LOAIs.ID = BAIVIETs.IDCategory and KINDs.IDKind= BAIVIETs.IDKind ORDER BY ID DESC LIMIT 0,12');
    },
    get2newset: () => {
      return db.load('SELECT BAIVIETs.*,LOAIs.TenLoai,KINDs.Ten as kind from BAIVIETs,LOAIs,KINDs WHERE LOAIs.ID = BAIVIETs.IDCategory and KINDs.IDKind= BAIVIETs.IDKind \
       ORDER BY ID DESC LIMIT 12,2');
    },
    getnewsbyTitle: title =>{
      return db.load(`SELECT BAIVIETs.*, USERs.HoTen as author,USERs.avatar FROM BAIVIETs,USERs WHERE BAIVIETs.title ="${title}" and  BAIVIETs.IDTacGia = USERs.ID  `)

    },
    getnewsbyCATEGORY: category =>{
      return db.load(`SELECT BAIVIETs.*, USERs.HoTen,USERs.avatar FROM BAIVIETs, LOAIs,USERs \
      WHERE LOAIs.TenLoai = "${category}" AND BAIVIETs.IDCategory = LOAIs.ID and BAIVIETs.IDTacGia = USERs.ID`)
    },
    getallnewsbyKIND: kind=>{
      return  db.load(`SELECT BAIVIETs.*,USERs.HoTen,USERs.avatar FROM BAIVIETs, KINDs,USERs \
      WHERE KINDs.Ten = "${kind}" AND BAIVIETs.IDKind = KINDs.IDKind  and BAIVIETs.IDTacGia = USERs.ID`)
    },
    getcommentbyID: id =>{
      return db.load(`SELECT BINHLUANs.* ,USERs.avatar,USERs.HoTen FROM BINHLUANs,USERs WHERE \ 
      BINHLUANs.IDDocGia = USERs.ID AND BINHLUANs.IDBaiViet = ${id}`)
    },
    getauthorbyID: id =>{
      return db.load(`SELECT USERs.* FROM BAIVIETs, USERs \
      WHERE BAIVIETs.ID = ${id} AND BAIVIETs.IDTacGia = USERs.ID`)
    },
    deletePostbyID: id =>{
      return db.delete('BAIVIETs', 'ID', id);
 
    },
    getallUsers: ()=>{
      return db.load('SELECT * FROM USERs')
    },
    getallKinds: ()=>{
      return db.load('SELECT * FROM KINDs')
    }


}  