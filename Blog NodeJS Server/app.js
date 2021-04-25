const express = require("express");
const app = express();
const Post = require("/Users/dungvoduc/Desktop/Javascript/pwj-module-8-my-blog-api-master/exercise/api/models/posts.js")

var multer = require('multer')
var upload = multer({ storage: storage})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })


const getExt = (mimeType) => {
    switch(mimeType){

        case "image/png":
            return ".png";

        case "Image/jpeg":
            return ".jpeg";
    }

}



const postsData = new Post();

app.use(express.json());

app.use((req, res, next) => {


    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use('/uploads', express.static('uploads'));



app.get("/api/posts", (req, res) => {

    res.status(200).send(postsData.get());

})


app.get("/api/posts/:post_id", (req, res) => {
    
    const postID = req.params.post_id;

    const foundPost = postsData.getIndividualBlog(postID);

    if (foundPost){

        res.status(200).send(foundPost);
    } else {

        res.status(404).send("Not found");
    }
    
})  

app.post("/api/posts", upload.single("post-image"), (req, res) => {
console.log(req.body);

const newPost = {

    "id": `${Date.now()}`,
    "title": req.body.title,
    "content": req.body.content,
    "post_image": req.file.path,
    "added_date": `${Date.now()}`

}
res.send("ok");
postsData.add(newPost);
res.status(201).send(newPost);

})
app.listen(3000, ()=> console.log("Listening on Localhost 3000"));