import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comments.js'

const app = express()
const port = process.env.PORT || 5000

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/comments', commentRoutes)

app.listen(port, () => {
  console.log(`server start at port: ${port}`);
})