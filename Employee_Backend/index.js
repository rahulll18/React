const express = require("express");
const app = express();
const cors = require("cors");
const {
  addProducts,
  getAllproducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("./api/Productapi");
const {
  getEmployee,
  getAllEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  uploadEmployeePic,
} = require("./api/Employeeapi");
const {
  getAllUsers,
  getAllUserById,
  updateUserwithId,
  addUsers,
  deleteUserById,
  updateProfilePicture,
} = require("./api/userApi");
const upload = require("./config/multer");

const PORT = 5000;

const mongoDb = require("./config/mongoDb");
// const db = require("./config/mysqlDb");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoDb();

// let connection;

app.get("/", function (req, res) {
  console.log(req);
  res.send("Node js ");
});

//api with mysql
app.get("/getAllUsers", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
  //console.log(users);
});

app.get("/getAllUsers/:userId", async (req, res) => {
  const users = await getAllUserById(req.params.userId);
  res.send(users);
  //console.log(users);
});

app.post("/addUsers", upload.single("profilePic"), async (req, res) => {
  try {
    // Extract the file and other user data from the request
    const { file } = req;
    console.log(file);
    const profilePic = file ? file.buffer : null;

    const user = {
      ...req.body, // Spread the properties from req.body
      profilePic, // Add the profilePic to the user object
    };

    const users = await addUsers(user);

    res.send(users); // Respond with the users data
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the user.");
  }
});

app.put(
  "/updateProfilePhoto/:userId",
  upload.single("profilePic"),
  async (req, res) => {
    const { file } = req;
    console.log(file);
    const profilePic = file ? file.buffer : null;

    const picture = await updateProfilePicture(req.params.userId, profilePic);
    res.send(picture);
  }
);

app.put("/updateUser/:userId", async (req, res) => {
  const newUser = req.body;
  //console.log(newUser);
  const user = await updateUserwithId(req.params.userId, newUser);
  res.send(user);
  //console.log(user)
});

app.delete("/deleteUser/:userId", async function (req, res) {
  const deleteUser = await deleteUserById(req.params.userId);
  res.json(deleteUser);
  //console.log(deleteUser);
});

//apis for products with mysql

app.get("/getAllProducts", async (req, res) => {
  try {
    const Products = await getAllproducts(connection);
    res.status(200).send(Products);
  } catch (error) {
    console.log("Error while fethcing Products", error);
  }
});

app.get("/getProduct/:productId", async (req, res) => {
  try {
    const product = await getProductById(connection, req.params.productId);
    res.status(200).send(product);
  } catch (error) {
    console.log("error while fetching product", error);
  }
});

app.post("/addProducts", upload.single("ProductImage"), async (req, res) => {
  try {
    const productBody = req.body;
    const ProductImage = req.file.buffer;

    const product = { ...productBody, ProductImage };
    const addedProducts = await addProducts(connection, product);

    res.status(200).send(addedProducts);
  } catch (error) {
    console.log("Got an error while adding product", error);
  }
});

app.put(
  "/updateProduct/:productId",
  upload.single("ProductImage"),
  async (req, res) => {
    try {
      const productBody = req.body;
      const ProductImage = req.file.buffer;

      const newProduct = { ...productBody, ProductImage };
      const updatedProduct = await updateProductById(
        connection,
        req.params.productId,
        newProduct
      );
      res.send(updatedProduct);
    } catch (error) {
      console.log("Error while Updating with Product",error);
    }
  }
);

app.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const deletedProduct = await deleteProductById(
      connection,
      req.params.productId
    );
    res.send(deletedProduct);
  } catch (error) {
    console.log("Error while deleting Product");
  }
});

//api with mongodb
app.get("/getEmployees", async function (req, res) {
  try {
    const employees = await getAllEmployees();
    res.send(employees);
  } catch (error) {
    console.log("Error while getting all employees", error);
  }
});

app.get("/getEmployees/:id", async function (req, res) {
  const data = await getEmployee(req.params.id);
  res.send(data);
});

app.post("/employees/add", async function (req, res) {
 try {
    const data = await addEmployee(req.body);
    res.send(data);
  } catch (error) {
    console.log("Error while adding employee:", error);
    res.status(500).send("Error adding employee");
  }
});

app.put(
  "/upload/:_id",
  upload.single("profilePic"),
  async function (request, response) {
    const data = await uploadEmployeePic(
      request.params._id,
      request.file.buffer
    );
    response.send(data);
  }
);

app.put("/update/:id", async function (req, res) {
  try {
    const { _id, ...updateUser } = req.body;
    const Employee = await updateEmployee(req.params.id, updateUser);

    res.send(Employee);
  } catch (error) {
    console.log("error while updating employee", error);
  }
});

app.delete("/delete/:id", async function (req, res) {
  try {
    const deleted = await deleteEmployee(req.params.id);
    res.send(deleted);
  } catch (error) {
    console.log("Error is ", error);
  }
});

app.listen(PORT, async () => {
  // connection = await db();
  console.log(`server is listening on port ${PORT}`);
});
