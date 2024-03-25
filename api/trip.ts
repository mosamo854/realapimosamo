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
import { TripGetResponse } from "../model/trip_post)req";
import { app } from '../app';

export const router = express.Router();

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

router.post("/image/:id/vote", async (req, res) => {
  const imageId = req.params.id;

  const sql = "UPDATE img SET score_img = score_img + 1 WHERE iid = ?";

  conn.query(sql, [imageId], (error, results, fields) => {
    if (error) {
      console.error('Error updating score:', error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log('Score updated successfully');
    res.status(200).json({ message: "Score increased successfully" });
  })
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

router.put("/update/:id", async (req, res) => {

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
    "update  `user` set `name`=?, `email`=?, `password`=?, `img_user`=? where `uid`=?";
  sql = mysql.format(sql, [

    updateTrip.name,
    updateTrip.email,
    updateTrip.password,
    updateTrip.img_user,
    id,

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


