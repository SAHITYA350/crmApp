import mongoose, { model, Schema } from "mongoose";
const logSchema = new Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    startsAt: {
        type: Date
    },
    endsAt: {
        type: Date
    }, 
    followUp: {
        type: Date
    },
    status: {
        type: String,
        enum: ['calling','busy', 'waiting ', 'not received', 'switched off', 'not reachable'],
        default: 'calling'
    }
}, {timestamps: true})


// 🧩 Middleware: Automatically set start and end time before saving
logSchema.pre('save', function(next) {
    this.startsAt = Date.now();
    this.endsAt = Date.now();
    next();
});

// const logModel = model("Customer", logSchema);
const logModel = mongoose.models.Log || model("Log", logSchema);
export default logModel;