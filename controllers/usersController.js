import { db } from "../connect.js";
import jwt from 'jsonwebtoken'

export const getUser = (req, res) => {
  const q = `SELECT * FROM users WHERE id = ?`

  db.query(q,[req.params.userId], (err, data) => {
    if(err) return res.status(500).json(err)
    const { password, ...info } = data[0]
    return res.status(200).json(info)
  })
}

export const updateUser = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")

    const q = "UPDATE users SET `name`=?, `email`=?, `city`=?, `gender`=?, `interest`=? ,`maritalStatus`=?, `phone`=? ,`website`=?, `coverPic`=?, `profilePic`=? WHERE `id` =?"

    db.query(q,[
      req.body.name,
      req.body.email,
      req.body.city,
      req.body.gender,
      req.body.interest,
      req.body.maritalStatus,
      req.body.phone,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      data.id
    ], (err, data) => {
      if(err) return res.status(500).json(err)
      if(data.affectedRows > 0) return res.status(200).json("Cập nhập thành công!")
      return res.status(403).json("Chỉ có thể cập nhập thông tin của mình!")
    })
  
  })
}
