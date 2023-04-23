const bodyParser = require("body-parser");
const express = require("express");
const book_user = require("../model/signupSchema")
var jwt = require('jsonwebtoken');
const cors = require('cors')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const SECRET_ID = "j";
const app = express();
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await book_user.create({
        name: name,
        password: hashedPassword,
        email: email,
      });
      res.send("user stored");
    } catch (error) {
      console.log(error);
      res.send("error in hashing");
    }
  });
  
  router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const user = await book_user.findOne({ email });
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log(user,isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).send("Invalid email or password");
    }
    const token  = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60*60),
      data: {unique_id:user._id}
    }, SECRET_ID);
    res.status(200).json({
      status : "SUCESS",
      token : token
    })
});

///just to check
router.get("/login", ((req,res)=>{
  res.send("world")
}))

module.exports = router;