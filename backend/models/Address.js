const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
  userId: {
    type: String,
    ref: "user",
  },
  addresses: [
    {
      country: {
        type: String,
        require: true,
      },
      fullName: {
        type: String,
        require: true,
      },
      mobileNumber: {
        type: String,
        require: true,
      },
      pincode: {
        type: String,
        require: true,
      },
      houseNumber: {
        type: String,
        require: true,
      },
      area: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      state: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = Address = mongoose.model("address", AddressSchema);
