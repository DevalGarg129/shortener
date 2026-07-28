const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
        index: true,
    },
    customAlias: {
        type: String,
        default: null,
        trim: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        default: null
    },
},{
    timestamps: true,
});

const Url = mongoose.model("Url", urlSchema);
export default Url;