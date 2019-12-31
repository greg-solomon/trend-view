const mongoose = require("mongoose");

module.exports = () => {
  const db = mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    () => {
      console.log(`Connected to mongodb`);
    }
  );

  return db;
};
