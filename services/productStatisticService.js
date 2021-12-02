import { query } from '../services/dbService.js';
import config from '../config.js';
import groupBy from '../tools/groupBy.js';

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

const listByEANs = (eans, allSellersOnly = true) => {
  const productStatistics = query(`SELECT * FROM dailyParse WHERE ean IN (${eans.map(x => `'${x}'`).toString()})${(allSellersOnly ? " AND sellerId = 'ALL'" : '')} ORDER BY ean, dayStart`, []);
  const groupedByEAN = groupBy(productStatistics, 'ean');

  return groupedByEAN.map(x => { return { ean: x[0].ean, productStatistics: x }; });
}

export {
  list,
  listByProductIds,
  listByEANs
}