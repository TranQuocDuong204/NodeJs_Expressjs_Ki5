import Post from "../model/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class homeController {
    index(req, res) {
        res.render('home');
    }

   
   
}

export default new homeController();