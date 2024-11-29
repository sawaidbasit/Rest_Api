const Products = require('../models/product')


const getAllProducts = async (req, res) => {
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    let apiData = Products.find(queryObject);

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    if (featured) {
        queryObject.featured = featured;
    }
    console.log(queryObject);

    const myData = await apiData;
    res.status(200).json({myData})
}

const getAllProductsTesting = async (req, res) => {
    const myData = await Products.find().select("name")
    res.status(200).json({myData})
}

module.exports = {getAllProducts, getAllProductsTesting}