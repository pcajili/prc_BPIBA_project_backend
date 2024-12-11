// Import
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const controller = require('./controllers/controller');

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

// Middlewares
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());                            
app.use(express.urlencoded({ extended: true }));   
app.use(methodOverride('_method'));

// DB
mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error in database connection");
        console.log(err);
    })

// Homepage
app.get('/', controller.getAllItem);

// Create item
app.get('/items-add', controller.addItem);      // Form page
app.post('/items', controller.createItem);      // Create item

// Read item
app.get('/items', controller.getAllItem);
app.get('/items/v/:id', controller.readItem);

// Update item
app.get('/items/:id', controller.editItem);     // Form page
app.put('/items/:id', controller.updateItem);   // Update item

// Delete item
app.delete('/items/:id', controller.deleteItem);

// Listen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
