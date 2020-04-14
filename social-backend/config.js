const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  database: 'mongodb://localhost/social',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  facebook: {
    appId: '258324881869138',
    appSecret: '05c835994025507a671e86282567a7c6'
  }
};