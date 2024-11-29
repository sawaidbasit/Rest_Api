const Products = require('../models/product')


const getAllProducts = async (req, res) => {
    const {company, name, featured} = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    if (featured) {
        queryObject.featured = featured;
    }
    console.log(queryObject);

    const myData = await Products.find(queryObject)
    res.status(200).json({myData})
}

const getAllProductsTesting = async (req, res) => {
    const myData = await Products.find()
    res.status(200).json({myData})
}

module.exports = {getAllProducts, getAllProductsTesting}