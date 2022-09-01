const Subcat = require('../models/subcat');
const questionsServices = require('../services/questions');


exports.addCategory = async (req, res) => {
    if (!req.body.catName) res.status(400).json({ error: 'catName not defined' });
    let result = await questionsServices.addCategory(req.body.catName);
    if (!result) return res.status(500).send({ error: "unforseen error while fetching data" });
    res.status(200).json({ created: true, result });
}

exports.getCategories = async (req, res) => {
    let result = await questionsServices.getCategories();
    if (result) return res.status(200).send(result);
    res.status(401).send({ error: 'unforseen error while fetching data' });
}

exports.addSubCategories = async (req, res) => {
    if (!req.body.catId || !req.body.subName) return res.status(401).json({ error: 'catId or subName not defined' });
    let result = await questionsServices.addSubCategory(req.body.catId, req.body.subName);
    if (!result) return res.status(500).send({ error: "unforseen error while fetching data" });
    res.status(200).json(result);
}

exports.getSubCategories = async (req, res) => {
    if (!req.params.catId) return res.status(401).json({ error: 'catId not defined' })
    let result = await questionsServices.getSubCategory(req.params.catId);
    if (!result) return res.status(500).send({ error: "unforseen error while fetching data" });
    res.status(200).json(result);
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
    await questionsServices.removeCategory(req.params.catId);
}

exports.removeSubCategory = async (req, res) => {
    // await questionsServices.re
}
exports.removeQuestion = async (req, res) => {
    if (!req.params.questionId) return res.status(401).send({ error: 'question id is not defined' });
    try {
        await questionsServices.removeQuestion(req.params.questionId);
        res.status(200).send({ removed: true });
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}