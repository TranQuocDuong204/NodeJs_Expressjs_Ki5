import Post from "../model/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class homeController {
  index(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await Post.findAll(db);
        res.render("home", { posts: result });
      } catch (e) {
        console.log("check error: ", e);
      }
    });
  }
  login(req, res) {
    res.render("login");
  }
}

export default new homeController();
