import User from "../model/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class UserAdmin {
  index(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await User.findAllUser(db);
        console.log("check user",result);
        res.render("userAdmin/userAll", { userAll: result });
      } catch (e) {
        console.log("check error: ", e);
      }
    });
  }
  async delete(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await User.delUser(db, new ObjectId(req.body._id));
        console.log(result);
        res.redirect("/user");
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
        const result = await User.findByIdUser(db, new ObjectId(req.params.id));
        res.render("userAdmin/editUser", { user: result });
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

    connection.connect().then(async (db) => {
      try {
        const user = new User(
          undefined,
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.role
        );

        const result = await user.updates(db, new ObjectId(req.params.id));
        console.log("Updated post:", result);

        res.redirect("/user");
      } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).send("An error occurred");
      } finally {
        await connection.close();
      }
    });
  }

}

export default new UserAdmin;