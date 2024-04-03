import Post from "../model/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";


class postControllers {
  index(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await Post.findAll(db);
        res.render("posts/post", { posts: result });
      } catch (e) {
        console.log("check error: ", e);
      }
    });
  }

  // GET /user/:id
  details(req, res) {
    connection.connect().then(async (db) => {
        try {
            const result = await Post.findById(db, new ObjectId(req.params.id));
            console.log(result);
            res.render('posts/detail', { post: result });
        } catch (err) {
            console.error("check err",err);
        }
    });
}

  create(req, res) {
    res.render("posts/createpost");
  }

  store(req, res) {
    console.log(req.body);
    connection.connect().then(async (db) => {
      try {
        const post = new Post(
          undefined,
          req.body.title,
          req.body.content,
          req.body.author
        );
        const result = await post.save(db);
        console.log(result);
        res.redirect("/posts");
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }
    });
  }
  //   delete(req, res) {
  //     connection.connect().then(async (db) => {
  //       try {
  //         const userId = req.params.id;
  //         const results = await Post.del(db, new ObjectId(userId));
  //         console.log(results);
  //         res.redirect("/posts");
  //       } catch (err) {
  //         console.error(err);
  //       } finally {
  //         await connection.close();
  //       }
  //     });
  //   }

  async edit(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await Post.findById(db, new ObjectId(req.params.id));
        res.render("posts/edit", { post: result });
      } catch (err) {
        console.error(err);
      } finally {
        await connection.close();
      }
    });
  }

  async updates(req, res) {
    console.log(res.body);
    connection.connect().then(async (db) => {
      try {
        const post = new Post(
          undefined,
          req.body.title,
          req.body.content,
          req.body.author
        );
        console.log(post);
        const result = await post.update(db);
        console.log("check result",result);
        res.redirect("/posts");
      } catch (err) {
        console.error("check error",err);
        res.status(500).send("An error occurred");
      } finally {
        await connection.close();
      }
    });
  }
}

export default new postControllers();
