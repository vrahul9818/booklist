const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bookstor = require('../model/bookSchema');
const cors = require('cors');


const app = express();
const router = express.Router();
const SECRET_KEY = 'j';

app.use(bodyParser.json());
app.use(cors())

router.post('/bookstore', async (req, res) => {
    console.log(req.body , req.headers.authorization.split("Bearer")[1])
   
    const decoded = jwt.verify(req.headers.authorization.split("Bearer")[1], SECRET_KEY);
    console.log(decoded ,"decoded");
  try {
    const newBook = await bookstor.create({
        uniqueId:decoded.data.unique_id,
        isbn : req.body.book_isbn,
        title : req.body.book_title,
        author: req.body.author,
        description: req.body.book_description,
        date: req.body.book_date,
        publisher: req.body.book_publisher,
    });
   console.log(newBook);
    res.status(201).json({ newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/bookstore', async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split("Bearer")[1], SECRET_KEY);
    const uniqueId = decoded.data.unique_id;
    console.log(uniqueId)
    const data = await bookstor.find({ uniqueId: uniqueId });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching coupons');
  }
});

router.delete("/bookstore/delete", async (req, res) => {
  console.log(req.body)
  try {
    const deleteData = await bookstor.findOneAndDelete({ _id: req.body.id });
    res.status(200).send("deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting coupon');
  }
});




router.put("/bookstore/edit", async (req, res) => {
  console.log(req.body._id);
  console.log(req.body, "reqbody");
  const uniqueUpdateId = req.body._id;
  const newuserdata = req.body;
  const putData = await bookstor.findOneAndUpdate(
    { _id: uniqueUpdateId },
    newuserdata,
    { new: true }
  );

  res.send(putData);
});




module.exports = router;
