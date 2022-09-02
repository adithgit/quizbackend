const Questions = require('../models/questions');
const Subcat = require('../models/subcat');
const Category = require('../models/category');


exports.getCategories = ()=>{
    return new Promise((resolve, reject)=>{
        Category.find({}, (err, docs)=>{
            if(err) return resolve(false);
            resolve(docs);
        })
    })
}

exports.addCategory = (catName)=>{
    return new Promise((resolve, reject)=>{
        new Category({
            catName,
            subCategories:[]
        }).save((err, result)=>{
            if(err) return resolve(false);
            resolve(result);
        })
    })
}

exports.addSubCategory = (catId, subcatName)=>{
    return new Promise((resolve, reject)=>{
        new Subcat({
            subcatName,
            questions:[]
        }).save((err, result)=>{
            if(err) return resolve(false);
            Category.updateOne({_id:catId},{ $push :{ subCategories : result._id }}, (err, result)=>{
             if(err) return resolve(false);
            }) 
            resolve(result);
        })
    })
}

exports.getSubCategory = (categoryId)=>{
    return new Promise((resolve, reject)=>{
        Category.find({_id: categoryId}, (err, docs)=>{
            if(err || docs.length==0) return resolve(err || 'categoryId not valid');
            resolve(docs[0].subCategories);
        })
    })
}

exports.getQuestions = (subId)=>{
    return new Promise((resolve, reject)=>{
        Questions.find({subCat:subId}, (err, docs)=>{
            if(err) return reject(err);
            return resolve(docs);
        })
    })
}


exports.addQuestions = (subId, questionData)=>{
    return new Promise((resolve, reject)=>{
        new Questions({
            questionDef: questionData.questionDef,
            options: questionData.options,
            answerIndex: questionData.answerIndex,
            subCat: questionData.subCat
        }).save((err, results)=>{
            if(err) return resolve(false);
            Subcat.updateOne({_id: subId}, {$push: {questions: results._id}}, (err, res)=>{
                resolve(results);
            });
        })
    })
}


exports.removeQuestion = (questionId)=>{
    return new Promise((resolve, reject)=>{
        Questions.findOne({_id: questionId}, (err, question)=>{
            if(err || !question) return reject("question not found");
            Subcat.updateOne({_id: question.subCat},{$pull: {questions: questionId}}, (err, result)=>{
                if(err) return reject(err);
                Questions.deleteOne({_id:questionId}, (err, result)=>{
                    if(err) return reject(err);
                    resolve(result)
                })
            })
        })
    })
}

exports.removeCategory = (categoryId)=>{
    return new Promise((resolve, reject)=>{
        Category.findOneAndDelete({_id: categoryId}, (err, result)=>{
            if(err || !result ) return reject(err || "Cannot find category");
            if(result.subCategories.length == 0) return resolve({message: 'Category removed'});
            let message = 'Category removed';
            const subCatIds = result.subCategories;
            Subcat.deleteMany({_id: {$in: result.subCategories}}, (err, result)=>{
                if(err) return reject(err);
                message += `\n Number of subcategory removed : ${result.deletedCount}`
                Questions.deleteMany({subCat: {$in: subCatIds}},(err, result)=>{
                    if(err) return reject(err);
                    message += `\n Number of questions removed : ${result.deletedCount}`;
                    resolve(message)
                })
            })
        })
    })
}


exports.removeSubCategory = (subCatId)=>{
    return new Promise((resolve, reject)=>{
        Category.updateOne({subCategories: subCatId}, {$pull : {subCategories : subCatId}}, (err, result)=>{
            if(err || !result.acknowledged) return reject(err || 'cannot find subcategory');
            Subcat.deleteOne({_id: subCatId}, (err, result)=>{
                if(err || !result) return reject(err  || 'subcategory id incorrect')
                let message = "Subcategory removed"
                Questions.deleteMany({subCat: subCatId},(err, result)=>{
                    if(err) return reject(err);
                    message += `\n Number of questions removed : ${result.deletedCount}`;
                    resolve(message)
                })
            })
        })
    })
}