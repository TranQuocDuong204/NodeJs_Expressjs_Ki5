import Post from "../model/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class postControllers {
  index(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await Post.findAll(db);
        if (req.cookies.value.role === "ADMIN") {
          res.render("posts/post", { posts: result });
        } else {
          res.redirect("posts/postUser");
        }
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
        res.render("posts/detail", { post: result });
      } catch (err) {
        console.error("check err", err);
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
        if (!req.file) {
          return res.status(400).send("No");
        }
        const id_usser = req.cookies.value._id;
        const post = new Post(
          undefined,
          req.body.title,
          req.body.content,
          req.body.author,
          req.file.filename,
          id_usser
        );
        const result = await post.save(db);

        console.log(result);
        res.redirect("/posts");
        // await res.status(200).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      } finally {
        await connection.close();
      }
    });
  }

  async delete(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await Post.del(db, new ObjectId(req.body._id));
        console.log(result);
        res.redirect("/posts");
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      } finally {
        await connection.close();
      }
    });
  }

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
    const postId = req.params.id; // Get the post ID from the URL parameters
    console.log(postId);
    if (!req.file) {
      return res.status(400).send("No");
    }

    connection.connect().then(async (db) => {
      try {
        const post = new Post(
          undefined,
          req.body.title,
          req.body.content,
          req.body.author,
          req.file.filename
        );

        const result = await post.updates(db, new ObjectId(req.params.id));
        console.log("Updated post:", result);

        res.redirect("/posts");
      } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).send("An error occurred");
      } finally {
        await connection.close();
      }
    });
  }

  async postUser(req, res) {
    connection.connect().then(async (db) => {
      try {
        const userRole = req.cookies.value.role;
        const userId = req.cookies.value._id;
        console.log("check iduser", userId);
        console.log("check usesrRole", userRole);
        const posts = await Post.findAllPostsByUserId(db, userId); // Find all posts for the user

        res.render("posts/postUser", { posts: posts }); // Pass all posts to the template
      } catch (err) {
        console.error(err);
        // Handle errors appropriately (e.g., send an error response to the client)
      } finally {
        await connection.close();
      }
    });
  }
}

export default new postControllers();
