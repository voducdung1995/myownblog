const fs = require('fs');


const PATH = "/Users/dungvoduc/Desktop/Javascript/data.json"



class Post{

get(){


    return this.readData();


}


getIndividualBlog(postID){

    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == postID);

    return foundPost;


}




add(newPost){
    const currentPosts = this.readData();
    
    currentPosts.unshift(newPost);

    this.storeData(currentPosts);

}

readData(){

let rawData = fs.readFileSync(PATH);
let jsonData = JSON.parse(rawData);

console.log(jsonData);

return jsonData;

}


storeData(rawData){

let data = JSON.stringify(rawData);
fs.writeFileSync(PATH, data);

}



}


module.exports = Post;