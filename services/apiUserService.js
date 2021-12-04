import { query } from '../services/apiDBService.js';

const getActiveUser = (userId) => {
  const result = query("SELECT * FROM apiUser WHERE (inactive is null or inactive <> 1) AND id = ?", [userId]);
  const user = result && result.length ? result[0] : undefined;

  return user;
}

export {
  getActiveUser
}