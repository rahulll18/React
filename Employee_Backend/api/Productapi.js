const addProducts = async (connection, product) => {
  const {
    productheading,
    productDescription,
    productPrice,
    productStrike,
    productOffer,
    ProductImage,
  } = product;

  try {
    const response = await connection.query(
      `INSERT INTO Products 
             (productheading, productDescription, productPrice, productStrike, productOffer , ProductImage) 
             VALUES (?, ?, ?, ?, ? , ?)`,
      [
        productheading,
        productDescription,
        productPrice,
        productStrike,
        productOffer,
        ProductImage,
      ]
    );
    //   console.log(response);
    return response[0];
  } catch (error) {
    console.error("Error In Fetching Product controller:", error);
  }
};

const getAllproducts = async (connection) => {
  try {
    const products = await connection.query("select * from Products");
    
    return products[0];
  } catch (error) {
    console.log("Database query failed while fetching products ", error);
  }
};

const getProductById = async (connection, productId) => {
  try {
    const [results] = await connection.query(
      `select * from Products where productId = ${productId}`
    );
    return results;
  } catch (error) {
    console.log("Error in controller while fetching product", error);
  }
};

const updateProductById = async (connection, productId, product) => {
  const {
    productheading,
    productDescription,
    productPrice,
    productStrike,
    productOffer,
    ProductImage,
  } = product;

  try {
    // Use parameterized query to avoid SQL injection and handle special characters
    const query = `
        UPDATE Products
        SET
          productheading = ?,
          productDescription = ?,
          productPrice = ?,
          productStrike = ?,
          productOffer = ?,
          ProductImage = ?
        WHERE productId = ?
      `;

    const values = [
      productheading,
      productDescription,
      productPrice,
      productStrike,
      productOffer,
      ProductImage,
      productId,
    ];

    const [result] = await connection.query(query, values);
    return result;
  } catch (error) {
    console.error("Error while updating product:", error);
  }
};

const deleteProductById = async (connection, productId) => {
  try {
    const [results] = await connection.query(
      `delete from Products where productId = ${productId}`
    );
    return results;
  } catch (error) {
    console.error("Error in controller while deleting Product:", error);
  }
};

module.exports = {
  addProducts,
  getAllproducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
