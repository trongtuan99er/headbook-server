import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js'

export const getPosts = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const userId = req.query.userId

    const q = userId !== 'undefined' ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC` :  `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`
    
    const values = userId !== 'undefined' ? [userId] : []
    db.query(q,values,(err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addPost = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)"

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      data.id
    ]
    db.query(q,[values], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Tạo thành công!")
    })
  })
}

export const deletePost = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")

    const q = "DELETE FROM posts WHERE `id`= ? AND `userId`= ?"

    db.query(q,[req.params.id, data.id], (err, data) => {
      if(err) return res.status(500).json(err)
      if(data.affectedRows>0) return res.status(200).json("Xóa thành công!")
      return res.status(403).json("Không thể xóa post của người khác")
    })
  })
}