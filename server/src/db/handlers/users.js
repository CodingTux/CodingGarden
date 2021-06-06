'use strict';

module.exports = class {
    constructor(userModel){
        this.userModel = userModel;
    };
    
    register(userId){
        return new Promise((resolve, reject) => {
            this.userModel.findOne({
                'userId': userId
            }, (err, user) => {
                if (err) {
                    console.error(err)
                    reject("UNABLE_TO_REGISTER");
                }
                if (user) {
                    resolve("USER_ALREADY_REGISTERED");
                } else {
                    console.log("Registering User: ", userId)
                    let user = new this.userModel({
                        userId: userId,
                        files: []
                    });
                    try {
                        user.save((err) => {
                            if (err){
                                console.error(err)
                                reject("ERROR_REGISTERING_USER");
                            }else{
                                resolve("USER_REGISTERED")
                            };
                        });
                    } catch (err) {
                        console.error(err)
                        reject("ERROR_REGISTERING_USER");
                    }
                }
            })
        })
    }

    fetchFiles(userId){
        return new Promise((resolve, reject) => {
            this.userModel.findOne({
                'userId': userId
            }, (err, user) => {
                if (err) {
                    console.error(err)
                    reject("UNABLE_TO_FETCH_USER");
                }
                if (user) {
                    resolve(user.files);
                }
            })
        }) 
    }

    pushFiles(userId, file){
        return new Promise((resolve, reject) => {
            this.userModel.findOneAndUpdate({ userId: userId },
                {
                  $set: {
                    files: file
                  }
                }, { upsert: false, multi: true }, (err, chat) => {
                  if (err || !chat) {
                    console.error(err)
                    reject("UPDATE_ERROR")
                    return
                  };;
                  resolve({ success: true, message: 'files is updated successfully...' });
                  return
                });
        }) 
    }
};