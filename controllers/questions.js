const Subcat = require('../models/subcat');
const questionsServices = require('../services/questions');


exports.addCategory = async (req, res) => {
    if (!req.body.catName) res.status(400).json({ message: 'catName not defined' });
    try {
        let result = await questionsServices.addCategory(req.body.catName);
        res.status(200).json({ message: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getCategories = async (req, res) => {
    try {
        let result = await questionsServices.getCategories();
        res.status(200).send({message: result});
    } catch (e) {
        res.status(401).send({ message: e.toString() });
    }
}

exports.addSubCategories = async (req, res) => {
    if (!req.body.catId || !req.body.subName) return res.status(401).json({ message: 'catId or subName not defined' });
    try {
        const result = await questionsServices.addSubCategory(req.body.catId, req.body.subName);
        res.status(200).json({message: result});
        
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getSubCategories = async (req, res) => {
    if (!req.params.catId) return res.status(401).json({ message: 'catId not defined' })
    try {
        const result = await questionsServices.getSubCategory(req.params.catId);
        res.status(200).json({ message: result });
    } catch (e) {
         res.status(500).send({ message: e.toString() });
    }
}

exports.addQuestion = async (req, res) => {
    const { questionDef, options, answerIndex, subCat } = req.body;
    if (!questionDef || !options || !answerIndex || !subCat) return res.status(401).json({ message: 'questionData not defined' });
    try {
        const result = await questionsServices.addQuestions(subCat, { questionDef, options, answerIndex, subCat });
        res.status(200).json({ message: result});
    } catch (e) {
        res.status(500).send({ message: e.toString()});
    }
}

exports.getQuestions = async (req, res) => {
    if (!req.params.subId) return res.status(401).send({ message: 'subId not defined' });
    try {
        const result = await questionsServices.getQuestions(req.params.subId);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.removeCategory = async (req, res) => {
    if (!req.params.catId) return res.status(401).send({ message: 'Category id not defined' });
    try {
        const result = await questionsServices.removeCategory(req.params.catId);
        res.status(200).send({ message: result });
    } catch (e) {
        res.status(401).send({ message: e.toString() })
    }
}

exports.removeSubCategory = async (req, res) => {
    if(!req.params.subId) return res.status(401).send({ message: 'Subcategory id not defined' });
    try {
        const result = await questionsServices.removeSubCategory(req.params.catId);
        res.status(200).send({ message: result })
    } catch(e){
        res.status(500).send({ message: e})
    }
}
exports.removeQuestion = async (req, res) => {
    if (!req.params.questionId) return res.status(401).send({ message: 'Question id is not defined' });
    try {
        await questionsServices.removeQuestion(req.params.questionId);
        res.status(200).send({ message: 'Question removed' });
    } catch (e) {
         res.status(500).send({message: e });
    }
}