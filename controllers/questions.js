const Subcat = require('../models/subcat');
const questionsServices = require('../services/questions');


exports.addCategory = async (req, res) => {
    if (!req.body.catName) res.status(400).json({ message: 'catName not defined' });
    let result = await questionsServices.addCategory(req.body.catName);
    if (!result) return res.status(500).send({ message: "unforseen error while fetching data" });
    res.status(200).json({ message: result });
}

exports.getCategories = async (req, res) => {
    let result = await questionsServices.getCategories();
    if (result) return res.status(200).send({message: result});
    res.status(401).send({ message: 'unforseen error while fetching data' });
}

exports.addSubCategories = async (req, res) => {
    if (!req.body.catId || !req.body.subName) return res.status(401).json({ message: 'catId or subName not defined' });
    let result = await questionsServices.addSubCategory(req.body.catId, req.body.subName);
    if (!result) return res.status(500).send({ message: "unforseen error while fetching data" });
    res.status(200).json({message: result});
}

exports.getSubCategories = async (req, res) => {
    if (!req.params.catId) return res.status(401).json({ message: 'catId not defined' })
    let result = await questionsServices.getSubCategory(req.params.catId);
    if (!result) return res.status(500).send({ message: "unforseen error while fetching data" });
    res.status(200).json({
        message:result
    });
}

exports.addQuestion = async (req, res) => {
    const { questionDef, options, answerIndex, subCat } = req.body;
    if (!questionDef || !options || !answerIndex || !subCat) return res.status(401).json({ error: 'questionData not defined' });
    let result = await questionsServices.addQuestions(subCat, { questionDef, options, answerIndex, subCat });
    if (!result) return res.status(500).send({ error: "unforseen error while adding data" });
    res.status(200).json(result);
}

exports.getQuestions = async (req, res) => {
    if (!req.params.subId) return res.status(401).send({ error: 'subId not defined' });
    try {
        const result = await questionsServices.getQuestions(req.params.subId);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e });
    }
}

exports.removeCategory = async (req, res) => {
    if (!req.params.catId) return res.status(401).send({ error: 'category id not defined' });
    try {
        const result = await questionsServices.removeCategory(req.params.catId);
        res.status(200).send({message:result});
    } catch (e) {
        res.status(401).send({message:e})
    }
}

exports.removeSubCategory = async (req, res) => {
    if(!req.params.subId) return res.status(401).send({ error: 'subcategory id not defined' });
    try {
        const result = await questionsServices.removeSubCategory(req.params.catId);
        res.status(200).send({message:result})
    } catch(e){
        res.status(500).send({message:e})
    }
}
exports.removeQuestion = async (req, res) => {
    if (!req.params.questionId) return res.status(401).send({ message: 'question id is not defined' });
    try {
        await questionsServices.removeQuestion(req.params.questionId);
        res.status(200).send({ message: 'Question removed' });
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}