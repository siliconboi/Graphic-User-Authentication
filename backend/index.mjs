import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.mjs";

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use('/user/api', authRouter);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('../frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build','index.html')));
  }

const port = process.env.PORT || 8080;
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}).then(
app.listen(port, ()=>{
    console.log(`listening on ${process.env.PORT}`);
}));

