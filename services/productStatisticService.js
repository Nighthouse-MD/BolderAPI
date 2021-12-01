import { query } from '../services/dbService.js';
import config from '../config.js';

const list = (allSellersOnly = false) => {
  const productStatistics = query(`SELECT * FROM dailyParse ${(allSellersOnly ? " WHERE sellerId = 'ALL'" : '')}`, []);

  return {
    productStatistics
  }
}

const listByProductIds = (productIds, allSellersOnly = true) => {
  const productStatistics = query(`SELECT * FROM dailyParse WHERE productToTrackId IN (${productIds.toString()})${(allSellersOnly ? " AND sellerId = 'ALL'" : '')} ORDER BY productToTrackId, dayStart`, []);

  return {
    productStatistics
  }
}

export {
  list,
  listByProductIds
}