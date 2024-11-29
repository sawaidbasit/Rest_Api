const mongoose = require('mongoose');

// uri = "mongodb+srv://sawaidbasijt221:SawaidBasit0522@cluster0.vggpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = (uri) =>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;