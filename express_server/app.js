const mongoDB = "mongodb://localhost:27017/tweb2425";
import createError from 'http-errors';
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import swaggerUi from "swagger-ui-express";
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now read the file using a reliable relative path
const swaggerPath = path.join(__dirname, './swagger/swaggerDocumentation.json');
const swaggerJson = await readFile(swaggerPath, 'utf8');
const swaggerDocument = JSON.parse(swaggerJson);

mongoose.Promise = global.Promise;

/*
* @TODO better to use await
*/
mongoose.connect(mongoDB)
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! '+ JSON.stringify(error));
    });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json({ limit: '2mb' })); // increase the limit due to images uploading
app.use(express.urlencoded({ limit: '2mb', extended: true })); // increase the limit due to images uploading

app.use(logger('dev'));
app.use(
    cors({
      origin: "http://localhost:3000", // allow just React frontend
      methods: "GET, POST, PUT, DELETE, OPTIONS",
      credentials: true, // allow cookies and auth headers
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
