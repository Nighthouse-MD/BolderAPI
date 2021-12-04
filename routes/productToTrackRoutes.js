import { Router } from 'express';
const router = Router({ mergeParams: true });
import { addByEan } from '../services/productToTrackService.js';
import apiKeyCheckWrapper from './apiKeyCheckWrapper.js';

router.get('/addByEan/:ean', function (req, res, next) {
    apiKeyCheckWrapper(req, res, () => {
        try {
            const promiseOrString = addByEan(req.params.ean);

            Promise.resolve(promiseOrString).then((message) =>
                res.json({ message: message }));
        } catch (err) {
            console.error(`Error while products addByEan: `, err.message);
            next(err);
        }
    });
});

export default router;