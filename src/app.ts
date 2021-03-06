import createError, {HttpError} from 'http-errors'
import express, {Request, Response, NextFunction} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// import connectDB from './db/db'
import indexRouter from './routes/index'
import usersRouter from './routes/users.routes'
import transactionsRouter from './routes/transactions.routes'
import balancesRouter from './routes/balances.routes'
import dotenv from 'dotenv'

import { connectDB, connectTestDB } from './db/db'



const app = express();
dotenv.config()
//documentation rendering
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('document.yaml')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'test'){
  connectTestDB()
}
else{
  connectDB()
}



app.use('/', indexRouter)
app.use('/', usersRouter)
app.use('/', transactionsRouter)
app.use('/', balancesRouter)
app.use('/transfer-service', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

export default app
