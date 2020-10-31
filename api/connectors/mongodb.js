const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
mongoose.set('useFindAndModify', false);
const mongodb = async () => {
  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.once('connected', () => console.log('connected'));

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  return db;
};

module.exports = mongodb;
