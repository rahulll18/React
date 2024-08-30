 const addProducts = async(connection , product)=>{
    const {productheading , productDescription , productPrice ,productStrike , productOffer } = product;

    try {
        const response = await connection.query(
            `INSERT INTO Products 
             (productheading, productDescription, productPrice, productStrike, productOffer) 
             VALUES (?, ?, ?, ?, ?)`,
            [
                productheading,
                productDescription,
                productPrice,
                productStrike,
                productOffer
            ]
          );
        //   console.log(response);
          return response[0];
    } catch (error) {
        console.error("Error In Fetching Product controller:", error);
    }
}

const getAllproducts = async(connection)=>{
    try {
        const products = await connection.query("select * from Products");
        return products[0];
    } catch (error) {
        console.log("Database query failed while fetching products ",error)
    }
}

module.exports = {addProducts , getAllproducts}
