import { Router } from 'express';
const router = Router({ mergeParams: true });
import { listByFilter, listBySellerId } from '../services/productService.js';
import apiKeyCheckWrapper from './apiKeyCheckWrapper.js';

router.post('/byFilter', function (req, res, next) {
    apiKeyCheckWrapper(req, res, () => {
        try {
            const body = req.body;
            res.json(listByFilter(body.searchWord, body.showActiveOnly, body.page));
        } catch (err) {
            console.error(`Error while products listByFilter`, err.message);
            next(err);
        }
    });
});

router.get('/bySellerId/:sellerId', function (req, res, next) {
    apiKeyCheckWrapper(req, res, () => {
        try {
            res.json(listBySellerId(req.params.sellerId));
        } catch (err) {
            console.error(`Error while products bySellerId: `, err.message);
            next(err);
        }
    });
});

export default router;