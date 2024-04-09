import connection from "../../config/db/index.js";
// import { result_kq } from "./User_author.js";
async function Check(req, res, next) {
  connection.connect().then(async (db) => {
    let result = await db.collection("users").find({}).toArray();
    let email = req.body.email;
    let result_role = result.filter((find) => find.email === email);
    if (result_role[0].role === "ADMIN") {
      res.cookie("value", result_role[0]);
      console.log("Admin");
      setTimeout(() => {
        next();
      });
    } else {
      res.cookie("value", result_role[0]);
      console.log("user");
      setTimeout(() => {
        next();
      });
    }
  });
}

export default Check;
