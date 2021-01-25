const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const DbService = require("moleculer-db");
const folderModel = require("./folder.model");

module.exports = {
    name: "folderservice",
    mixins: [DbService],
    adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost:27017/test"),
    model : folderModel,
    actions: {
            create : {
                async handler(ctx) {
                        let folder = new folderModel({
                            folderName: ctx.params.folderName,
                            folderNumber: ctx.params.folderNumber,
                            folderOwner: ctx.params.folderOwner
                        })
                    return await folder.save() 
                    }   
            },
            read : {
                async handler(ctx) {
                   return await folderModel.find(ctx.params.folderName)
                }
            },
            update : {
                async handler(ctx) {
                    return await folderModel.findOneAndUpdate({ folderName: ctx.params.folderName }, { "folderNumber": ctx.params.folderNumber 
                                                                                                , "folderName" : ctx.params.folderName })
                }
            },
            delete : {
                async handler(ctx) {
                    return await folderModel.findOneAndDelete({ "folderName": ctx.params.folderName })
                }
            },
            findafolderofuser: {
                async handler(ctx) {
                   let user = await ctx.broker.call("userservice.read",{userName : ctx.params.name})
                    return folderModel.aggregate([
                        {
                            $match : {
                                folderOwner : user.userName
                            }
                        }
                    ])
                }
            }
        },
    }

