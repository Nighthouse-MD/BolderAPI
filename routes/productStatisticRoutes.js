import { Router } from 'express';
const router = Router();
import { list, listByProductIds, } from '../services/productStatisticService.js';

router.get('/:onlyAllSellers?', function (req, res, next) {
    try {
        res.json(list(!!req.params.onlyAllSellers));
    } catch (err) {
        console.error(`Error while getting statistics:`, err.message);
        next(err);
    }
});

router.post('/byProductIds', function (req, res, next) {
    try {
        const body = req.body;
        res.json(listByProductIds(body.productIds, body.onlyAllSellers));
    } catch (err) {
        console.error(`Error while getting statistics byproductids`, err.message);
        next(err);
    }

});
export default router;