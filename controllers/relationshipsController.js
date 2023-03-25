import { db } from "../connect.js";
import jwt from 'jsonwebtoken'

export const getRelationships = (req, res) => {
  const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`

  db.query(q,[req.query.followedUserId], (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data.map(relationship => relationship.followerUserId))
  })
}

export const addRelationship = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)"
    const values = [
      data.id,
      req.body.userId 
    ]
    db.query(q,[values], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Đang theo dõi!")
    })
  })
}

export const deleteRelationship = (req, res) => {
  const authHeader = req.headers.token
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(400).json("Chưa đăng nhập!")

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if(err) return res.status(403).json("token sai")
    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?"

    db.query(q,[data.id, req.query.userId], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Đã bỏ theo dõi!")
    })
  })
}