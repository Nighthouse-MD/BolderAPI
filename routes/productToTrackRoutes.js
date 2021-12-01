import { Router } from 'express';
const router = Router();
import { addByEan } from '../services/productToTrackService.js';

router.get('/addByEan/:ean', function (req, res, next) {
    try {
        const promiseOrString = addByEan(req.params.ean);

        Promise.resolve(promiseOrString).then((message) =>
            res.json({ message: message }));
    } catch (err) {
        console.error(`Error while products addByEan: `, err.message);
        next(err);
    }
});

export default router;