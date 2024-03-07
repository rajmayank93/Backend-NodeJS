const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rajmayank93:kaTn6vniB2C7wDVS@cluster0.lwutprh.mongodb.net"
  )
  .then(function (db) {
    console.log("plan db connected");
  })
  .catch(function (err) {
    console.log("Error in DB Connections");
  });

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [20, "Name should not exceed 20 characters"],
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price Not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function (value) {
        return value < 100;
      },
      "Discount should not exceed 100%",
    ],
  },
});

//Model
const planModel = mongoose.model("planModel", planSchema);

(async function createPlan() {
  let planObj = {
    name: "superFood",
    duration: 60,
    price: 1000,
    ratingsAverage: 5,
    discount: 20,
  };

  let data = await planModel.create(planObj);
  console.log(data);
})();

module.exports = planModel;
