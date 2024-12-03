const Products = require('../models/product')


const getAllProducts = async (req, res) => {
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = Products.find(queryObject);

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

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 100;

    let skip = (page - 1)* limit;

    apiData = apiData.skip(skip).limit(limit);
    
    console.log(queryObject);

    const myData = await apiData;
    res.status(200).json({myData})
}

const getAllProductsTesting = async (req, res) => {
    const myData = await Products.find().select("name")
    res.status(200).json({myData})
}

const AddProducts = async (req, res) => {
    const myData = await Products.create(req.body);
      res.status(200).json({myData})
}

// const deleteProduct = async (req, res) => {
//     console.log(req.query, "request")
//     res.status(200)
// }

const deleteProduct = async (req, res) => {
    try {
      const { name } = req.query; 
      if (!name) {
        return res.status(400).json({ error: "Product name is required" });
      }
  
      const data = await Products.deleteOne({ name }); 
  
      if (data.deletedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      console.log(data);
      res.status(200).json({ message: "Product deleted successfully", data });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {getAllProducts, getAllProductsTesting, AddProducts, deleteProduct}