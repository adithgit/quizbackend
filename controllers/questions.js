const Subcat = require('../models/subcat');
const questionsServices = require('../services/questions');


exports.addCategory = async (req, res) => {
    if (!req.body.catName) return res.status(400).json({ message: 'catName not defined' });
    try {
        let result = await questionsServices.addCategory(req.body);
        res.status(200).json({ message:'Category added', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getCategories = async (req, res) => {
    try {
        let result = await questionsServices.getCategories();
        res.status(200).send({ message:'Categories', data: result });
    } catch (e) {
        res.status(401).send({ message: e.toString() });
    }
}

exports.addSubCategories = async (req, res) => {
    if (!req.body.catId || !req.body.subName || !req.body.time) return res.status(401).json({ message: 'catId or subName or time not defined' });
    try {
        const result = await questionsServices.addSubCategory(req.body.catId, req.body.subName, req.body.time);
        res.status(200).json({ message:'Subcategory added', data: result });

    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getSubCategories = async (req, res) => {
    if (!req.params.catId) return res.status(401).json({ message: 'catId not defined' })
    try {
        const result = await questionsServices.getSubCategory(req.params.catId);
        res.status(200).json({ message:'Subcategories', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.addQuestion = async (req, res) => {
    const { questionDef, options, answerIndex, subCat,  points } = req.body;
    if (!questionDef || !options || !answerIndex || !subCat) return res.status(401).json({ message: 'questionData not defined' });
    try {
        const result = await questionsServices.addQuestions(subCat, { questionDef, options, answerIndex, subCat, points });
        res.status(200).json({ message:'questoin added', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getQuestions = async (req, res) => {
    if (!req.params.subId) return res.status(401).send({ message: 'subId not defined' });
    try {
        const result = await questionsServices.getQuestions(req.params.subId);
        res.status(200).json({ message:'questions', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.removeCategory = async (req, res) => {
    if (!req.params.catId) return res.status(401).send({ message: 'Category id not defined' });
    try {
        const result = await questionsServices.removeCategory(req.params.catId);
        res.status(200).send({ message:'Category removed', data: result });
    } catch (e) {
        res.status(401).send({ message: e.toString() })
    }
}

exports.removeSubCategory = async (req, res) => {
    if (!req.params.subId) return res.status(401).send({ message: 'Subcategory id not defined' });
    try {
        const result = await questionsServices.removeSubCategory(req.params.subId);
        res.status(200).send({ message:'Subcategory removed', data: result })
    } catch (e) {
        res.status(500).send({ message: e.toString() })
    }
}
exports.removeQuestion = async (req, res) => {
    if (!req.params.questionId) return res.status(401).send({ message: 'Question id is not defined' });
    try {
        await questionsServices.removeQuestion(req.params.questionId);
        res.status(200).send({ message:'question removed', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.triggerSubCategory = async (req, res) => {
    if (!req.params.subId) return res.status(401).send({ message: 'Subcategory id not defined' });
    try {
        const result = await questionsServices.triggerSubCategory(req.params.subId);
        res.status(200).send({ message:'Subcategory updated', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.getActiveSubCategories = async (req, res)=>{
    if(!req.params.catId) return res.status(401).send({ message: 'Category id not defined' });
    try {
        const result = await questionsServices.getActiveSubCategories(req.params.catId);
        res.status(200).send({ message:'Active subcategories', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}


exports.editSubcategory = async(req, res)=>{
    if(!req.body.subId || !req.body.newName) return res.status(401).send({message: 'subcategory id or newName not defined'});
    try {
        const result = await questionsServices.editSubcategory(req.body.subId, req.body.newName);
        res.status(200).send({ message: 'Subcategory edited', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.editCategory = async(req, res)=>{
    if(!req.body.catId || !req.body.newName) return res.status(401).send({message: 'category id or newName not defined'});
    try {
        const result = await questionsServices.editCategory(req.body.catId, req.body.newName);
        console.log(result);
        res.status(200).send({ message:'category updated', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}

exports.addResult = async (req, res)=>{
    req.body.user = req.user._id
    try {
        const result = await questionsServices.addResult(req.body);
        res.status(200).send({ message: 'result added', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}