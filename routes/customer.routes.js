// import { Router } from "express";
// import { createCustomer, fetchCustomer, fetchCustomerById, updateCustomer, deleteCustomer } from "../controller/customer.controller.js";
// const router = Router();

// router.post('/', createCustomer);
// router.get('/', fetchCustomer);
// router.get('/:id', fetchCustomerById);
// router.put('/:id', updateCustomer);
// router.delete('/:id', deleteCustomer);


// export default router;


import { Router } from "express";
import {
  createCustomer,
  fetchCustomer,
  fetchCustomerById,
  updateCustomer,
  deleteCustomer,
  importCustomers,
} from "../controller/customer.controller.js";

const router = Router();

router.post("/", createCustomer);
router.get("/", fetchCustomer);
router.get("/:id", fetchCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

// ✅ Excel Import Route
router.post("/import", importCustomers);

export default router;
