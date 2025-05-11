const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: String,
    color: String,
    quantity: {
        type: Number,
        required: true,
    },
},
    { _id: false }
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderitems: [orderItemSchema],
    shipingAdress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDeliverd: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Deliverd", "Cancelled"],
        default: "Processing",
    },
},
    {timeseries: true}
);

module.exports = mongoose.model("order", orderSchema);