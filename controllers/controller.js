// Import
const {v4: uuidv4} = require('uuid');
const Item = require('../models/item');


// =====================================================================================
// Get all items
// app.get('/', controller.getAllItem);
exports.getAllItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const items_db = await Item.find();
    if (req.route.path === '/items') {
        console.log(items_db);
    }
    res.render('home', {items: items_db});
};


// =====================================================================================
// CREATE
// [GET] app.get('/items-add', controller.addItem);      // Form page
exports.addItem = (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const uuid = uuidv4();
    res.render('add_item', {_uuid: uuid});
};

// [POST] app.post('/items', controller.createItem);      // Create item
exports.createItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const addItem = req.body;
    try {
        const item = new Item(addItem);
        await item.save();
        const resp = {
            "message": "Item created successfully.",
            "item": item
        }
        console.log(resp);
        const notif = {
            "message": `[${req.method}]: Item created successfully!`
        };
        res.render('notification', {notif});
    } catch (error) {
        const notif = {
            "message": `[${req.method}]: ${error}`
        };
        res.render('notification', {notif});
    }
};


// =====================================================================================
// READ
// [GET] app.get('/items/v/:id', controller.readItem);
exports.readItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const itemId = req.params.id;
    try {
        const item = await Item.findOne({_uuid: itemId});
        if (!item) {
            const notif = {
                "message": `[${req.method}]: Item not found.`
            };
            res.render('notification', {notif}); 
        } else {
            res.render('read_item', {item});
        }
    } catch (error) {
        const notif = {
            "message": `[${req.method}]: ${error}`
        };
        res.render('notification', {notif});
    }
};


// =====================================================================================
// UPDATE
// [GET] app.get('/items/:id', controller.editItem);     // Form page
exports.editItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const itemId = req.params.id;
    try {
        const item = await Item.findOne({_uuid: itemId});
        if (!item) {
            const notif = {
                "message": `[${req.method}]: Item not found.`
            };
            res.render('notification', {notif}); 
        } else {
            res.render('edit_item', {item});
        }
    } catch (error) {
        const notif = {
            "message": `[${req.method}]: ${error}`
        };
        res.render('notification', {notif});
    }
};

// [PUT] app.put('/items/:id', controller.updateItem);   // Update item
exports.updateItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    try {
        const itemId = req.params.id;
        const updatedItem = {
            _uuid: itemId,
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
        };

        const item = await Item.findOne({_uuid: itemId});
        if (!item) {
            const notif = {
                "message": `[${req.method}]: Item not found.`
            };
            res.render('notification', {notif}); 
        } else {
            const result = await Item.updateOne({ _uuid: itemId }, { $set: updatedItem });
            // console.log(result);
            if (result['modifiedCount'] > 0) {
                const resp = {
                    "message": "Item updated successfully.",
                    "item": updatedItem
                }
                console.log(resp);
                const notif = {
                    "message": `[${req.method}]: Item updated successfully!`
                };
                res.render('notification', {notif});
            } else {
                const notif = {
                    "message": `[${req.method}]: Item not found or already up to date.`
                };
                res.render('notification', {notif});            
            }
        }
    } catch (error) {
        const notif = {
            "message": `[${req.method}]: ${error}`
        };
        res.render('notification', {notif});
    }
};


// =====================================================================================
// DELETE
// app.delete('/items/:id', controller.deleteItem);
exports.deleteItem = async (req, res) => {
    console.log(`[${req.method}] Currently at ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    try {
        const itemId = req.params.id;
        const item = await Item.findOne({_uuid: itemId});
        if (!item) {
            const notif = {
                "message": `[${req.method}]: Item not found.`
            };
            res.render('notification', {notif}); 
        } else {
            const result = await Item.deleteOne({_uuid: itemId});
            // console.log(result);
            if (result['deletedCount'] > 0) {
                const resp = {
                    "message": "Item deleted successfully.",
                }
                console.log(resp);
                const notif = {
                    "message": `[${req.method}]: Item deleted successfully!`
                };
                res.render('notification', {notif});
            } else {
                const notif = {
                    "message": `[${req.method}]: Item not found or already deleted.`
                };
                res.render('notification', {notif});            
            }
        }
    } catch (error) {
        const notif = {
            "message": `[${req.method}]: ${error}`
        };
        res.render('notification', {notif});
    }
};

