const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//import models
const Product = require('./models/productModel');

//routers
app.get('/', (req, res) => {
  res.send('Hello node peps');
});

app.get('/blog', (req, res) => {
  res.send('Hellow blog');
});

//Add products to database => POST request
app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Fetch all data from the DB => GET all data
app.get('/product', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Fetch 1 data by id from the DB => GET all data
app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Update a product
app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: `Not found ${id} product` });
    } else {
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Delete data by id
app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: `Not found ${id} product` });
    } else {
      const deletedProduct = await Product.findById(id);
      res.status(200).json(deletedProduct);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//setup mongodb and port
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://kavindadissanayake1999:MbxsGw7HZbEVynmF@cluster0.9i3yvcx.mongodb.net/Node-API'
  )
  .then(() => {
    console.log('connected to mongodb');
    app.listen(3000, () => {
      console.log('Node is running on port 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
