const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const DbService = require("moleculer-db");
const userModel = require("./user.model");

module.exports = {
    name: "userservice",
    mixins: [DbService],
    adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost:27017/test"),
    model : userModel,
    actions: {
            create : {
                async handler(ctx) {
                        let user = new userModel({
                            userName: ctx.params.userName,
                            userMobileNumber: ctx.params.userMobileNumber
                        })
                    return await user.save() 
                    }   
            },
            read : {
                async handler(ctx) {
                   return await userModel.find(ctx.params.userName)
                }
            },
            update : {
                async handler(ctx) {
                    return await userModel.findOneAndUpdate({ userName: ctx.params.userName }, { "userMobileNumber": ctx.params.userMobileNumber 
                                                                                                , "userName" : ctx.params.userName })
                }
            },
            delete : {
                async handler(ctx) {
                    return await userModel.findOneAndDelete({ "userName": ctx.params.userName })
                }
            },
        },
    }

