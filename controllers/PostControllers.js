import PostModel from "../model/projects.js"

export const getAll  = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get all projects!"});
    }
}

export const getOne  = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
            _id: postId
            }, {
                $inc: {viewsCount: 1}
            }, {
                returnDocument: "after",
            }, (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({message: "Failed to return the project!"});
                }

                if(!doc){
                    return res.status(404).json({message: "Project not found!"});
                }

                res.send(doc);
            }
        ).populate("user");
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get all projects!"});
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            user: req.userId
        });

        const post = await doc.save();
        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to create a project!"});
    }
}

export const remove  = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findByIdAndDelete({
            _id: postId
        }, (err, doc) =>{
            if(err){
                console.log(err);
                return res.status(500).json({message: "Failed to delete the project!"});
            }

            if(!doc){
                return res.status(404).json({message: "Project not found!"});
            }

            res.json({success: true});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to get all projects!"});
    }
}

export const update = async (req, res) =>{
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            user: req.userId,
        });
        res.json({success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to update the project!"});
    }
}