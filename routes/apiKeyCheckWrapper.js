import { getActiveUser } from '../services/apiUserService.js';
import { logRequest } from '../services/requestService.js';

const apiKeyCheckWrapper = (req, res, fn) => {
    const user = getActiveUser(req.params.apiKey);
    logRequest(req, user ? req.params.apiKey : 'ApiKey is not valid: ' + req.params.apiKey)

    if (user)
        fn();
    else
        res.json("Get the fuck out");
}

export default apiKeyCheckWrapper;