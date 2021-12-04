import { run } from '../services/apiDBService.js';

const logRequest = (request, apiKey) => {
  const result = run('INSERT INTO request(apiUserId,url,body,requestedOn) VALUES (@apiUserId, @url, @body, @requestedOn)',
    { apiUserId: apiKey, url: request.originalUrl, body: JSON.stringify(request.body), requestedOn: (new Date().toISOString()) });
}

export {
  logRequest
}