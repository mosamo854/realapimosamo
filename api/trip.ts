// import express from "express";
// import { conn, queryAsync } from "../dbconnect";


// export const router = express.Router();

// //trip
// //Get all trips from database
// router.get("/:id", (req, res) => {
//     // if(req.query.id){
//     const id = req.params.id;
//     //     const name = req.query.name;
//     //     res.send("Method GET in trip.is with "+ id + " " + name );
//     // }else {

//     const sql = "select * from user where uid = ?";
//     conn.query(sql, [id], (err, result) => {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }

//     });

// })

// router.get("/:id", (req, res) => {
//     // const id = req.params.id;
//     // res.send("Medthod GET in trip.ts is = "+ id);
// })

// // /trip post
// router.post("/", (req, res) => {
//     const body = req.body;
//     res.status(201).json(body);;
//     // res.send("Method GET in trip.ts with "+ JSON.stringify(body));

// })

// // /trip/search/field?name=ฟูจิ of /trip/search/field?id=3s
// router.get("/search/fields", (req, res) => {
//     const id = req.query.id;
//     const name = req.query.name;

//     const sql = "select * from trip where " + "(idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)";

//     conn.query(sql, [id, "%" + name + "%"], (err, result) => {
//         res.json(result);
//     });

// });

// router.get("/search/fields/price", (req, res) => {
//     const price = req.query.price;

//     const sql = "select * from trip where (price <= ?)";

//     conn.query(sql, [price], (err, result) => {
//         res.json(result);
//     });

// });

// import mysql from "mysql";
// import { TripGetResponse } from "../model/trip_post)req";

// // POST /trip
// router.post("/insert", (req, res)=>{
//     const trip : TripGetResponse= req.body;

//     let sql = "INSERT INTO `user`(`name`, `img_user`, `email`, `password`) VALUES (?,?,?,?)";

//     sql = mysql.format(sql, [

//         trip.name,
//         trip.img_user,
//         trip.email,
//         trip.password

//     ]);

//     //conn
//     //Send sql to database
//     conn.query(sql, (err, result) => {
//         if (err) throw err;
//         res
//           .status(201).json({ 
//             affected_row: result.affectedRows,
//             last_idx: result.insertId });
//       });
// });
// //return
// router.delete("/delete/:id", (req, res) => {
//   let id = +req.params.id;
//   conn.query("delete from trip where idx = ?", [id], (err, result) => {
//      if (err) throw err;
//      res
//        .status(200)
//        .json({ affected_row: result.affectedRows });
//   });
// });

// //Put /trip/1111
// // router.put("/update/:id", (req, res) => {
// //     let id = +req.params.id;
// //     let trip: TripGetResponse = req.body;
// //     let sql =
// //       "update  `trip` set `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? where `idx`=?";
// //     sql = mysql.format(sql, [
// //       trip.name,
// //       trip.country,
// //       trip.destinationid,
// //       trip.coverimage,
// //       trip.detail,
// //       trip.price,
// //       trip.duration,
// //       id
// //     ]);
// //     conn.query(sql, (err, result) => {
// //       if (err) throw err;
// //       res
// //         .status(201)
// //         .json({ affected_row: result.affectedRows });
// //     });
// //   });

// router.put("/update/:id",async (req, res) =>{
//     //Receive data
//     const id = req.params.id;
//     const trip : TripGetResponse = req.body;

//     //Get original data form table by id
//     let sql = "select * from user where uid = ?";
//     sql = mysql.format(sql, [id]);

//     //Query and Wait for result
//     const result = await queryAsync(sql);
//     const jsonStr = JSON.stringify(result);
//     const jsonObj = JSON.parse(jsonStr)
//     const tripOriginal : TripGetResponse = jsonObj[0];

//     // Merge new data to original 
//     const updateTrip = {...tripOriginal, ...trip};

//     sql =
//       "update  `user` set `name`=?, `email`=?, `password`=?, `img_user`=? where `uid`=?";
//     sql = mysql.format(sql, [

//       updateTrip.name,
//       updateTrip.email,
//       updateTrip.password,
//       updateTrip.img_user,
//       id,

//     ]);
//     conn.query(sql, (err, result) => {
//       if (err) throw err;
//       res.status(201).json({ affected_row: result.affectedRows });
//     });
//     // console.log(JSON.stringify(result));
//     // res.status(200).json({});

// });

import express, { Request, Response } from 'express';
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { ImageGetResponse, TripGetResponse, VoteGetResponse } from "../model/trip_post)req";
import { app } from '../app';

export const router = express.Router();

router.get('/user', (req, res) => {
  const sql = 'SELECT * FROM user where type="user" ';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching ranked images:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

router.get('/ranking', (req, res) => {
  const sql = 'SELECT * FROM img ORDER BY score_img DESC';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching ranked images:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

router.get("/random", (req, res) => {
  const sql = "SELECT * FROM img ORDER BY RAND() LIMIT 2";
  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


router.get('/image/:id', (req, res) => {
  const uid = req.params.id; // ดึง uid จาก URL params

  const sql = 'SELECT * FROM img WHERE uid = ? ORDER BY score_img DESC';
  conn.query(sql, [uid], (err, result) => { // ส่ง uid ใน array ให้เป็น parameter ของ query
    if (err) {
      console.error('Error fetching ranked images:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});


router.get("/:id", (req, res) => {

  const id = req.params.id;


  const sql = "select * from user where uid = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }

  });

})

router.get("/image/:id", (req, res) => {

  const id = req.params.id;

  const sql = "select * from image where iid = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }

  });
})

router.get("/:id", (req, res) => {

})

router.post("/", (req, res) => {
  const body = req.body;
  res.status(201).json(body);;


})

//register  /trip
router.post("/insert", (req, res) => {
  const trip: TripGetResponse = req.body;

  let sql = "INSERT INTO `user`(`name`, `img_user`, `email`, `password`, `type`) VALUES (?,?,?,?,?)";

  sql = mysql.format(sql, [

    trip.name,
    trip.img_user,
    trip.email,
    trip.password,
    trip.type = "user"
  ]);


  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201).json({
        affected_row: result.affectedRows,
        last_idx: result.insertId
      });
  });
});

router.post("/insert/image", (req, res) => {
  const trip: ImageGetResponse = req.body;

  let sql = "INSERT INTO `img`(`uid`, `img`, `score_img`) VALUES (?,?,?)";

  sql = mysql.format(sql, [

    trip.uid,
    trip.img,
    trip.score_img = 0
  ]);


  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201).json({
        affected_row: result.affectedRows,
        last_idx: result.insertId
      });
  });
});

router.post("/image/:id/vote/:uid", async (req, res) => {
  const imageId = req.params.id;
  const userId = req.params.uid;

  // กำหนดวันที่ให้เป็นปัจจุบัน
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    INSERT INTO vote (iid, uid, date, score)
    VALUES (?, ?, ?, 1)`;

  conn.query(sql, [imageId, userId, currentDate], (error, results, fields) => {
    if (error) {
      console.error('Error inserting vote:', error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log('Vote inserted successfully');
    // เมื่อโหวตถูกเพิ่มเข้าไปใน vote table ก็สามารถเพิ่มคะแนนใน img table ได้
    const updateSql = "UPDATE img SET score_img = score_img + 1 WHERE iid = ?";
    conn.query(updateSql, [imageId], (updateError, updateResults, updateFields) => {
      if (updateError) {
        console.error('Error updating score:', updateError);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      console.log('Score updated successfully');
      res.status(200).json({ message: "Vote and score increased successfully" });
    });
  });
});

router.post("/image/vote/:id1/:id2/:uid", async (req, res) => {
  const imageId1 = req.params.id1;
  const imageId2 = req.params.id2;
  const userId = req.params.uid;
  const trip: ImageGetResponse = req.body;

  let img1 = "select * from img where iid = ?";
  img1 = mysql.format(img1, [imageId1]);
  const result = await queryAsync(img1);
  const jsonStr = JSON.stringify(result);
  const jsonObj = JSON.parse(jsonStr)
  const img_1: ImageGetResponse = jsonObj[0];
  const update = { ...img_1, ...trip };

  let img2 = "select * from img where iid = ?";
  img2 = mysql.format(img2, [imageId2]);
  const result2 = await queryAsync(img2);
  const jsonStr2 = JSON.stringify(result2);
  const jsonObj2 = JSON.parse(jsonStr2)
  const img_2: ImageGetResponse = jsonObj2[0];
  const update2 = { ...img_2, ...trip };

  const EWinner = 1 / (1 + 10 ** ((update.score_img - update2.score_img) / 400));
  const ELoser = 1 / (1 + 10 ** ((update2.score_img - update.score_img) / 400));
  const r1 = 32 * (1 - EWinner);
  const r2 = 32 * (0 - ELoser);
  const RWinner = update.score_img + r1;
  const RLoser = update2.score_img + r2;

  // กำหนดวันที่ให้เป็นปัจจุบัน
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    INSERT INTO vote (iid, uid, date, score)
    VALUES (?, ?, ?, ?)`;

  conn.query(sql, [imageId1, userId, currentDate, r1], (error, results, fields) => {
    if (error) {
      console.error('Error inserting vote:', error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const sql2 = `
    INSERT INTO vote (iid, uid, date, score)
    VALUES (?, ?, ?, ?)`;

    conn.query(sql2, [imageId2, userId, currentDate, r2], (error, results, fields) => {
      if (error) {
        console.error('Error inserting vote:', error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log('Vote inserted successfully');
      // เมื่อโหวตถูกเพิ่มเข้าไปใน vote table ก็สามารถเพิ่มคะแนนใน img table ได้
      const updateSql = "UPDATE img SET score_img = score_img + ? WHERE iid = ?";
      conn.query(updateSql, [r1, imageId1], (updateError, updateResults, updateFields) => {});
      const updateSql2 = "UPDATE img SET score_img = score_img + ? WHERE iid = ?";
      conn.query(updateSql2, [r2, imageId2], (updateError, updateResults, updateFields) => {});
    });
  });
});

router.delete("/delete/:id", (req, res) => {
  let id = +req.params.id;
  conn.query("delete from user where idx = ?", [id], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ affected_row: result.affectedRows });
  });
});

router.delete("/delete/image/:id", (req, res) => {
  let id = +req.params.id;

  // ลบข้อมูลในตาราง 'vote' ตาม iid ก่อน
  conn.query("delete from vote where iid = ?", [id], (err, voteResult) => {
    if (err) throw err;

    // หลังจากลบข้อมูลในตาราง 'vote' เรียบร้อยแล้ว
    // จึงลบข้อมูลในตาราง 'img' ตาม iid
    conn.query("delete from img where iid = ?", [id], (err, imgResult) => {
      if (err) throw err;

      res.status(200).json({
        vote_affected_rows: voteResult.affectedRows,
        img_affected_rows: imgResult.affectedRows
      });
    });
  });
});



router.put("/update/user/:id", async (req, res) => {

  const id = req.params.id;
  const trip: TripGetResponse = req.body;


  let sql = "select * from user where uid = ?";
  sql = mysql.format(sql, [id]);


  const result = await queryAsync(sql);
  const jsonStr = JSON.stringify(result);
  const jsonObj = JSON.parse(jsonStr)
  const tripOriginal: TripGetResponse = jsonObj[0];

  const updateTrip = { ...tripOriginal, ...trip };

  sql =
    "update  `user` set `name`=?, `email`=?, `password`=? where `uid`=?";
  sql = mysql.format(sql, [

    updateTrip.name,
    updateTrip.email,
    updateTrip.password,
    id

  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });

});

router.put("/update/image/:id", async (req, res) => {

  const id = req.params.id;
  const trip: ImageGetResponse = req.body;


  let sql = "select * from img where iid = ?";
  sql = mysql.format(sql, [id]);


  const result = await queryAsync(sql);
  const jsonStr = JSON.stringify(result);
  const jsonObj = JSON.parse(jsonStr)
  const tripOriginal: ImageGetResponse = jsonObj[0];

  const updateTrip = { ...tripOriginal, ...trip };

  sql =
    "update  `img` set `img`=?,`score_img`=? where `iid`=?";
  sql = mysql.format(sql, [

    updateTrip.img,
    updateTrip.score_img = 0,
    id

  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });

});

router.put("/update/avatar/:id", async (req, res) => {

  const id = req.params.id;
  const trip: ImageGetResponse = req.body;


  let sql = "select * from user where uid = ?";
  sql = mysql.format(sql, [id]);


  const result = await queryAsync(sql);
  const jsonStr = JSON.stringify(result);
  const jsonObj = JSON.parse(jsonStr)
  const tripOriginal: TripGetResponse = jsonObj[0];

  const updateTrip = { ...tripOriginal, ...trip };

  sql =
    "update  `user` set `img_user`=? where `uid`=?";
  sql = mysql.format(sql, [

    updateTrip.img_user,
    id

  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });

});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM user WHERE email = ? AND password = ?";

  sql = mysql.format(sql, [email, password]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length > 0) {
      res.status(200).json({ user: result[0] });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
});


// router.post('/login', async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
//       return;
//   }

//   try {
//       const sql = 'SELECT * FROM user WHERE email = ?';
//       const user = await queryAsync(sql, [email]);

//       if (user.length === 0) {
//           res.status(401).json({ error: 'ไม่พบผู้ใช้ในระบบ' });
//           return;
//       }

//       const matched = await bcrypt.compare(password, user[0].password);

//       if (matched) {
//           req.session.user_id = user[0].user_id; // หรืออะไรก็ตามที่คุณต้องการจะเก็บไว้ใน session
//           res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
//       } else {
//           res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
//       }
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
//   }
// });


