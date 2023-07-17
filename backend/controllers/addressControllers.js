const Address = require("../models/Address");
module.exports.getAddress = async (req, res) => {
  const userId = req.params.id;
  try {
    let address = await Address.findOne({ userId });
    res.status(201).send(address);
  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong");
  }
};

module.exports.addAddress = async (req, res) => {
  const userId = req.params.id;

  const {
    country,
    fullName,
    mobileNumber,
    pincode,
    houseNumber,
    area,
    city,
    state,
  } = req.body;
  try {
    let address = await Address.findOne({ userId });
    if (address) {
      address.addresses.push({
        country,
        fullName,
        mobileNumber,
        pincode,
        houseNumber,
        area,
        city,
        state,
      });
      address = await address.save();
      res.status(201).send(address);
    } else {
      const newAddress = await Address.create({
        userId,
        addresses: [
          {
            country,
            fullName,
            mobileNumber,
            pincode,
            houseNumber,
            area,
            city,
            state,
          },
        ],
      });

      res.status(201).send(newAddress);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong");
  }
};
