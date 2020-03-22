const express =require("express");

const serverless =require("serverless-http");

const app = express();

const router = express.Router();

app.use("/.netlify/functions/api",router)

module.exports.handler =serverless(app);

let infor = require('../src/updateData.json');

// console.log(infor);

  router.get("/", (req,res)=>{
    res.json(infor);
  });
