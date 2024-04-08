import express from "express";
import { engine } from "express-handlebars";
import routes from "./routes/index.route.js";
const app = express();
const port = 8080;
import cookieParser from "cookie-parser";
import toastr from "express-toastr";
import flash from 'connect-flash';
import session from "express-session";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/resources/views");
app.use(express.static('src/public/uploads'))
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(toastr());
app.use(express.static("public"));

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
