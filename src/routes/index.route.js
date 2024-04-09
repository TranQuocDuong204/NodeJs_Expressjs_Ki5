import homeRouter from "./home.route.js";
import postRouter from "./post.route.js";
import authRoute from './auth.route.js';
import userRoute from './users.route.js';
import Auth from "../app/helpers/Auth.js";

const route = (app) => {
  app.use('/user', userRoute);
  app.use('/auth', authRoute);
  app.use('/posts',  Auth.verifyJWTToken, postRouter);
  app.use('/',homeRouter);
};

export default route;
