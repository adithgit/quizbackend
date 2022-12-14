const bannerServices = require('../services/banner');


exports.createBanner = async (req, res) => {
        if (!req.body.bannerURL || !req.body.bannerName) return res.status(400).send({ message: 'bannerURL or bannerName not specified' });
        try {
            const result = await bannerServices.createBanner(req.body.bannerName, req.body.bannerURL);
            res.status(200).send({ message: 'banner created', data: result });
        } catch (e) {
            res.status(401).send({ message: e.toString() });
        }
}

exports.deleteBanner = async (req, res)=>{
    if(!req.params.bannerName) return res.status(400).send({ message: 'bannerName not specified' });
    try {
        const result = await bannerServices.deleteBanner(req.params.bannerName)
        res.status(200).send({message: 'banner deleted', data: result});
    } catch (e) {
        res.status(401).send({ message: e.toString() });
    }
}

exports.getAll = async (req, res)=>{
    try {
        const result = await bannerServices.getAll();
        res.status(200).send({message: `Total banners: ${result.length}`, data: result});
    } catch (e) {
        res.status(401).send({ message: e.toString() });
    }
}