import { db } from "../connect.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const register = (req,res) => {

  //check user exist ? 
  const q = `SELECT * from users WHERE username = ?`

  db.query(q, [req.body.username], (err, data) => {
      if(err) return res.status(500).json(err)
      if(data.length) return res.status(409).json("Tài khoản đã tồn tại!")
      //create new user
      //hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashPassord = bcrypt.hashSync(req.body.password, salt)

      const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"
      const values = [req.body.username, req.body.email, hashPassord, req.body.name]

      db.query(q, [values], (err,data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("Tạo tài khoản thành công!")
      })
  })
}
export const login = (req,res) => {

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, req.body.username, (err, data) => {
    if(err) return res.status(404).json(err)
    if(data.length == 0) return  res.status(404).json("Không tìm thấy tài khoản!")

    const checkPass = bcrypt.compareSync(req.body.password, data[0].password)

    if(!checkPass) return res.status(400).json("Sai tài khoản hoặc mật khẩu")
    const token = jwt.sign({id: data[0].id}, process.env.SECRET_KEY, {expiresIn: '1d'})

    const { password, ...info} = data[0]
    res.status(200).json({...info, token})
  })
}
export const logout = (req,res) => {
  res.status(200).json("Đã đăng xuất!")
}