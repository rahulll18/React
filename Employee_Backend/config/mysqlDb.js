const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
      const connection = await mysql.createConnection({
          host: '127.0.0.1',
          user: 'root', 
          password: 'Mysql@123', 
          database: 'gymX' 
      });
  
      console.log('Connected to the MySQL server.');
      return connection;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  };

  //const connection = connectDB()

  module.exports = connectDB;