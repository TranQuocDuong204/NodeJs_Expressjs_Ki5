import User from "../model/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class UserAdmin {
  index(req, res) {
    connection.connect().then(async (db) => {
      try {
        const result = await User.findAllUser(db);
        console.log("check user", result);
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
    const userId = req.params.id; // Lấy ID của user từ các tham số URL
    console.log(userId);

    try {
      const db = await connection.connect(); // Kết nối đến MongoDB

      const updatedRole = req.body.role; // Lấy giá trị mới của role từ body của request

      const user = new User(); // Tạo một instance của model User (nếu cần)
      const result = await user.updates(db, new ObjectId(userId), updatedRole); // Gọi phương thức updates từ model User

      console.log("Updated user:", result);

      res.redirect("/user"); // Chuyển hướng sau khi cập nhật thành công
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("An error occurred");
    } finally {
      await connection.close(); // Đóng kết nối với MongoDB
    }
  }
}

export default new UserAdmin();
