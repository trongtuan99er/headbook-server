import { db } from "../connect.js";
import moment from "moment";
import jwt from 'jsonwebtoken'


export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`

  db.query(q,[req.query.postId], (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
}

export const addComment = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)"

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      data.id,
      req.body.postId
    ]
    db.query(q,[values], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Đã thêm bình luận!")
    })
  })
}