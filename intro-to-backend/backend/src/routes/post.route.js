import { Router } from "express";
import { createPost, deletePost, readPosts, updatePost } from "../controllers/post.controllers.js";
const Postrouter = Router();

Postrouter.route('/create').post(createPost);
Postrouter.route('/readpost').get(readPosts);
Postrouter.route('/updatepost/:id').patch(updatePost)
Postrouter.route('/deletepost/:id').delete(deletePost)

export default Postrouter;