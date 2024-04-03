import User from "../model/User.js";
import connection from "../../config/db/index.js";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";

class AuthControllers {
  /* REGISTER
   ** path: /auth/resgister
   ** method: POST
   */

  async signup(req, res) {
    res.render("users/sign");
  }
  async register(req, res) {
    // check if email is available
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    console.log(`Email: ${email}`);
    connection.connect().then(async (db) => {
      try {
        // check if email is already taken
        const result = await User.isAvailable(db, email);
        console.log(`Result: ${result}`);
        if (result) {
          console.log("Email is already taken");
          res.json({ message: "Email is already taken" }, result);
        } else {
          // hashing password - saltRound = 10
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              console.error(`Error: ${err}`);
            } else {
              console.log(`Hash: ${hash}`);
              // create new user
              connection.connect().then(async (db) => {
                console.log("Creating new user");
                const user = new User(
                  undefined,
                  req.body.name,
                  req.body.email,
                  hash
                );
                user.save(db).then((result) => {
                  res.redirect("/auth");
                  console.log(`User created with ID: ${result.insertedId}`);
                  // res.json(result);
                });
              });
            }
          });
          /* ### Old Code: separeted genSalt and hashing
                    bcrypt.genSalt(10, function(err, salt) {
                        if (err) {
                            console.error(`Error: ${err}`);
                        } else {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                // Store hash and salt in database here
                                if (err) {
                                    console.error(`Error: ${err}`);
                                } else {
                                    console.log(`Hash: ${hash}`);
                                    console.log(`Salt: ${salt}`);
    
                                    if (hash) { // if hash is not null
                                        // create new user
                                        connection.connect().then(async (db) => {
                                            console.log('Creating new user');
                                            const user = new User(undefined, req.body.name, req.body.email, hash, salt);
                                            user.save(db).then(() => {
                                                // res.redirect('/login');
                                                console.log('User created');
                                                res.json({ message: 'User created' });
                                            });
                                        });
                                        
                                    }
                                }
                            });
                        }
                    });
                    */
        }
      } catch (err) {
        console.error(err);
      } finally {
        await connection.close();
      }
    });
  }

  /* LOGIN
   ** path: /auth/login
   ** method: POST
   */
  async loginpage(req, res) {
    res.render("users/login");
  }
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Email: ${email} | Password: ${password}`);
    connection.connect().then(async (db) => {
      try {
        const user = await User.findByEmail(db, email);
        if (!user) {
          console.log("User not found");
          return res.status(404).json({ message: "User not found" });
        }
        console.log(typeof user);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error("check err", err);
            return res.status(500).json({ message: "Internal server error" });
          } else {
            if (result) {
              // create token
              const token = Auth.createJWTToken(email);
              res.cookie("token", token, {
                httpOnly: true,
                secure: false, // false if not using https | true if using https
                sameSite: "strict", // use 'strict', 'lax', or 'none'
                maxAge: 3600000, // expired time, should set to match token expiry (1h)
              });
              console.log("Login successful");
              // res.json({ message: "Login successful", token: token });
              res.redirect("/posts");
            } else {
              console.log("Login failed");
              res.json({ message: "Login failed" });
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  }
  async logout(req, res) {
    res.clearCookie("token");
    res.redirect("/");
  }
}

export default new AuthControllers();
