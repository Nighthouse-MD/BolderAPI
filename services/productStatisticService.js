import { query } from '../services/trackerDBService.js';
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
  const productsToTrack = query(`SELECT * FROM productToTrack WHERE ean IN (${eans.map(x => `'${x}'`).toString()})`, []);
  const productStatistics = query(`SELECT * FROM dailyParse WHERE ean IN (${eans.map(x => `'${x}'`).toString()})${(allSellersOnly ? " AND sellerId = 'ALL'" : '')} ORDER BY ean, dayStart`, []);
  const groupedByEAN = groupBy(productStatistics, 'ean');

  return productsToTrack.map(p => {
    const productStats = groupedByEAN.find(x => p.ean == x[0].ean)
    return {
      ean: p.ean,
      inactive: p.inactive == 1,
      inactivatedOn: p.inactivatedOn,
      reasonForInactivating: p.reasonForInactivating,
      productStatistics: productStats || []
    };
  });
}

export {
  list,
  listByProductIds,
  listByEANs
}