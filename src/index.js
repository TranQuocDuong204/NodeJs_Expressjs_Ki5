import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/index.route.js';
const app = express();
const port = 8080;
import connection from "../src/config/db/index.js";
import bodyParser  from 'body-parser';
import Post from './app/model/Post.js';
import cookieParser from 'cookie-parser';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/resources/views');
app.use(cookieParser());

app.use(express.static('public'));









routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});