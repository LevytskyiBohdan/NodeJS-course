import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from './routes/index';
import path from "path";

const app: Express = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use((req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
})
app.listen(process.env.PORT || 3002, () => {
    console.log(`Listening on port - ${process.env.PORT || 3002}`);
});