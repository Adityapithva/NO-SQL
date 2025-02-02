const Post = require('./../models/Post');

//Create Post
const createPost = async() => {
    const {title,content} = req.body;
    try{
        const newPost = new Post({
            title,
            content,
            author:req.user._id
        });
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error while creating post' });
    }
}