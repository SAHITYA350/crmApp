import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'cold', 'hot', 'closed', 'denied'],
    default: 'pending'
  }
}, { timestamps: true });

// Hot-reload safe
const customerModel = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default customerModel;
