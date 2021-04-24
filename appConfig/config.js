const mongoose = require('mongoose');
let appconfig = {}
appconfig.port = 5000;
appconfig.db = `mongodb+srv://atharva_2807:test@groomers.z5t4s.mongodb.net/Groomers?retryWrites=true&w=majority`;
appconfig.mongoconnect = async()=> {
try{
    await mongoose.connect(appconfig.db)
    console.log('Connected to mongodb');
}
catch(err){
    console.log(err);
    process.exit(1);
}
}

module.exports = appconfig;