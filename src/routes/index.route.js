import homeRouter from "./home.route.js";
import postRouter from "./post.route.js";
import signRouter from "./sign.route.js";
const route = (app) => {
  app.use("/sign", signRouter);
  app.use("/posts", postRouter);
  app.use("/", homeRouter);
};

export default route;
