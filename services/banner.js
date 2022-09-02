const Banner = require("../models/banner");
const { exists } = require("../models/user");


exports.createBanner = (bannerName, bannerURL)=>{
    return new Promise((resolve, reject)=>{
        Banner.find({name: bannerName}, (err, result)=>{
            if(err) return reject(err);
            console.log(result);
            if( result.length != 0){
                return reject("banner name already exists.");
            }
            new Banner({
                name: bannerName,
                url: bannerURL
            }).save((err, result)=>{
                console.log(err);
                if(err) return reject(err);
                resolve(result);
            })
        })
    })
}

exports.getBanner = (bannerName)=>{
    return new Promise((resolve, reject)=>{
        Banner.findOne({name: bannerName}, (err, result)=>{
            if(err || !result) return reject(err || "Banner doesn't exist: Check banner name again.");
            resolve(result);
        })
    })
}

exports.deleteBanner = (bannerName)=>{
    return new Promise((resolve, reject)=>{
        Banner.deleteOne({name: bannerName}, (err, result)=>{
            if(err || result.deletedCount == 0) return reject(err || "Banner doesn't exists. Check banner name again");
            resolve(result);
        })
    })
}