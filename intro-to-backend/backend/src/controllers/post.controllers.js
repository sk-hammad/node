import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;

        if(!name || !description || !age){
            res.status(400).json({
                message:"all fields are required"
            });
        };

        const post = await Post.create({
            name,
            description,
            age
        });

        res.status(200).json({
            message:"post created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        });
    };
}

const readPosts = async (req,res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
 
    } catch (error) {
        res.status(500).json({
            message:"internal server error", 
            error: error.message
        });
    };
}

const updatePost = async (req,res) => {
    try {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message:"no data found"
            });
        };

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});

        if(!post){
             return res.status(404).json({
            message: "Post not found"
            });
        };

        res.status(200).json({
            message:"post updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            error:error.message
        });
    };
}


const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted){
            res.status(400).json({
                message:"post not found"
            });
        };

        res.status(200).json({
            message:"post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:"internal server error", error:error.message
        });
    }
}
export {createPost, readPosts, updatePost, deletePost};