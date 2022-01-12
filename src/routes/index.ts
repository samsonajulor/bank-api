import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1> Transfer Service </h1><a href="/documentation">Documentation</a>');
})

export default router;
