// import customerModel from "../model/customer.model.js";

// // Create new customer
// export const createCustomer = async (req, res) => {
//   try {
//     const customer = new customerModel(req.body);
//     await customer.save();
//     res.status(201).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch all customers
// export const fetchCustomer = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;
//   const skip = (page - 1) * limit;

//   try {
//     const [customers, total] = await Promise.all([
//       customerModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
//       customerModel.countDocuments()
//     ]);

//     res.status(200).json({
//       customers,     
//       total,         
//       currentPage: page,
//       totalPages: Math.ceil(total / limit)
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Fetch customer by ID
// export const fetchCustomerById = async (req, res) => {
//   try {
//     const customer = await customerModel.findById(req.params.id);
//     if (!customer) return res.status(404).json({ error: "Customer not found" });

//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update customer by ID
// export const updateCustomer = async (req, res) => {
//   try {
//     const customer = await customerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!customer) return res.status(404).json({ error: "Customer not found" });

//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete customer by ID
// export const deleteCustomer = async (req, res) => {
//   try {
//     const customer = await customerModel.findByIdAndDelete(req.params.id);
//     if (!customer) return res.status(404).json({ error: "Customer not found" });

//     res.status(200).json({ message: "Customer deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




import customerModel from "../model/customer.model.js";

// Create new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = new customerModel(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all customers
export const fetchCustomer = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const [customers, total] = await Promise.all([
      customerModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      customerModel.countDocuments()
    ]);

    res.status(200).json({
      customers,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch customer by ID
export const fetchCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update customer by ID
export const updateCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete customer by ID
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🧾 Bulk Import Customers from Excel (New)
export const importCustomers = async (req, res) => {
  try {
    const customers = req.body;

    if (!Array.isArray(customers) || customers.length === 0) {
      return res.status(400).json({ error: "No customer data provided" });
    }

    // Clean and validate incoming records
    const validCustomers = customers
      .filter(c => c.fullname && c.email && c.phone)
      .map(c => ({
        fullname: String(c.fullname).trim(),
        email: String(c.email).trim(),
        phone: String(c.phone).trim(),
      }));

    if (validCustomers.length === 0) {
      return res.status(400).json({ error: "No valid customer records found" });
    }

    // Prevent duplicate customers based on email
    const inserted = [];

    for (const cust of validCustomers) {
      const exists = await customerModel.findOne({ email: cust.email });
      if (!exists) {
        const newCustomer = await customerModel.create(cust);
        inserted.push(newCustomer);
      }
    }

    res.status(200).json({
      message: `Successfully imported ${inserted.length} customer(s).`,
      importedCount: inserted.length,
    });
  } catch (error) {
    console.error("Error importing customers:", error);
    res.status(500).json({ error: "Server error while importing customers" });
  }
};
