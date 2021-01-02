const functions = require('../controllers/functions');
var Order = require('../models/order');

// Order Management
exports.orderManagement = (req, res) => {
    Order.find({ userID: req.user._id })
        .then(orders => {
            res.render('pages/order/order-management', {
                user: req.user,
                orders: orders,
                priceConverter: functions.numberWithCommas,
                changeDateFormat: functions.changeDateFormat
            });
        })
        .catch(err => console.log(err));
}