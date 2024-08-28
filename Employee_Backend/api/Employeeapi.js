const employeeModel = require("../mongoDbmodel/EmployeeModel");

async function getAllEmployees() {
  try {
    const employees = await employeeModel.find({});
    return employees;
  } catch (error) {
    console.error("Error retrieving employees:", error);
  }
}

async function insertEmployees() {
  try {
    const employees = await employeeModel.create({
      _id: 116,
      emp_name: "hi",
      emp_email: "hello",
      emp_salary: 1000,
    });
    console.log("All Employees:", employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
  }
}

// getEmployee
async function getEmployee(empId) {
  try {
    const employees = await employeeModel.findOne({ _id: empId }).exec();
    return employees;
  } catch (error) {
    console.error("Error retrieving employees:", error);
  }
}

async function updateEmployee(empId, updateUser) {
  try {
    const { deptCode, basicSalary } = updateUser;
    const filter = { _id: empId };
    const employee = await employeeModel.updateOne(filter, {
      deptCode: deptCode,
      basicSalary: basicSalary,
    });

    return employee;
  } catch (error) {
    console.log("Error while updating the user", error);
  }
}

async function deleteEmployee(empId) {
  try {
    return await employeeModel.deleteOne({ _id: empId });
  } catch (error) {
    console.log("error whild delteing ", error);
  }
}

async function addEmployee(employee) {
  try {
    const EmployeeDoc = new employeeModel(employee);
    return await EmployeeDoc.save();
  } catch (error) {
    console.log("Error while adding user", error);
  }
}

module.exports = {
  getAllEmployees,
  insertEmployees,
  getEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee,
};
