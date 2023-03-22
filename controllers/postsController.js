import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js'

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken
  if(!token) return res.status(400).json("Chưa đăng nhập!")
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
  
    db.query(q,[data.id, data.id], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

