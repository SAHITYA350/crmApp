import logModel from "../model/log.model.js";

// Create new log
export const createLogs = async (req, res) => {
  try {
    const log = new logModel(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch all logs with customer name
export const fetchLogs = async (req, res) => {
  try {
    const logs = await logModel.find().populate('customer', 'fullname'); 
    // 'fullname' fetches only the customer's name
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch log by ID
export const fetchLogsById = async (req, res) => {
  try {
    const log = await logModel.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update log by ID
export const updateLogs = async (req, res) => {
  try {
    const log = await logModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ error: "Log not found" });

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete log by ID
export const deleteLogs = async (req, res) => {
  try {
    const log = await logModel.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
