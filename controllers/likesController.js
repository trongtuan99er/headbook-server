import { db } from "../connect.js";
import jwt from 'jsonwebtoken'

export const getLikes = (req, res) => {
  const q = `SELECT userId FROM likes WHERE postId = ?`

  db.query(q,[req.query.postId], (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data.map(like => like.userId))
  })
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"
    const values = [
      data.id,
      req.body.postId 
    ]
    db.query(q,[values], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Liked!")
    })
  })
}

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"

    db.query(q,[data.id, req.query.postId], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("un Like!")
    })
  })
}