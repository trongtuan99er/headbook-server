import express from "express";
import {  } from '../controllers/postsController.js'
const router = express.Router()

router.get("/", getPosts)
export default router