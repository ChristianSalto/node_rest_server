const mongoose = require('mongoose'); //  Es una biblioteca Node.js que proporciona la asignación de objetos MongoDB similar a ORM con una interfaz familiar dentro de Node.js. 
//  Mongoose es un gran ODM (Object Document Mapping), significa que Mongoose traduce los datos en la base de datos a objetos JavaScript para usar en su aplicación.


const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });


    console.log('online database');

  } catch (err) {
    console.log(err);
    throw new Error('There is an error in the database');
  }

};


module.exports = {
  dbConnection
}