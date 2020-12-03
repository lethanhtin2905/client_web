// Models
var Product = require('../models/product');

// Function
var functions = require('./functions');


// Store
exports.displayProducts = (req, res) => {
	// Validate query string
	const category = (typeof req.query.category != 'undefined') ? (req.query.category) : '';
	const producer = (typeof req.query.producer != 'undefined') ? (req.query.producer) : '';
	const min = (typeof req.query.min != 'undefined') ? parseInt(req.query.min) : 0;
	const max = (typeof req.query.max != 'undefined') ? parseInt(req.query.max) : 50000000;
	const sort = (typeof req.query.sort != 'undefined') ? (req.query.sort) : '';
	const count = (typeof req.query.count != 'undefined') ? parseInt(req.query.count) : 12;
	const page = (typeof req.query.page != 'undefined') ? parseInt(req.query.page) : 1;

	// Arguments for find and sort query
	let findParams = {};
	let sortParams = {};
	// URI query string
	let filterStr = '';
	let sortStr = '';

	if (category != '') {
		findParams.category = category;
		filterStr += ('category=' + category + '&');
	}
	if (producer != '') {
		findParams.producer = producer;
		filterStr += ('producer=' + producer + '&');
	}

	findParams.price = { $gte: min, $lte: max };
	filterStr += ('min=' + min + '&max=' + max + '&');

	if (sort != '') {
		sortStr += ('sort=' + sort + '&');
		switch (sort) {
			case 'name-asc':
				sortParams.name = 1; break;
			case 'name-des':
				sortParams.name = -1; break;
			case 'price-asc':
				sortParams.price = 1; break;
			case 'price-des':
				sortParams.price = -1;
		}
	}

	Product.countDocuments(findParams) // Count the total number of products
		.then(countAll => {
			Product.find(findParams).sort(sortParams).limit(count).skip((page - 1) * count) // Sorting and Pagination
				.then(products => {
					res.render('pages/product/store', {
						user: req.user, // User
						products: products,
						priceConverter: functions.numberWithCommas,
						// Query string
						filterStr: filterStr, sortStr: sortStr,
						// Remain selections
						category: category, producer: producer, min: min, max: max, sort: sort, count: count, page: page,
						// Creating page index
						countPages: parseInt(countAll / count +
							((countAll % count == 0) ? 0 : 1)),
						countAll: countAll
					});
				})
				.catch(err => {
					console.log('Error: ', err);
					throw err;
				});
		})
		.catch(err => {
			console.log('Error: ', err);
			throw err;
		});
}