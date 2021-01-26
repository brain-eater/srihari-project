const db = require("./mongodb-client");

const userSchema= db.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true}
});

module.exports = { User: db.model('User',userSchema) };

