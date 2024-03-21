import Post from "../model/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class postController {
    post(req, res) {
        connection.connect().then(async (db) => {
          try {
            const result = await Post.findAll(db);
            res.render("post", { posts: result });
          } catch (e) {
            console.log("check error: ", e);
          } finally {
            await connection.close();
          }
        });
      }
    detail(req, res) {
        res.render('detail');
    }
}

export default new postController();