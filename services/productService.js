import { query } from '../services/trackerDBService.js';
import config from '../config.js';

const listByFilter = (searchWord, showActiveOnly, page = 1) => {
  const offset = (page - 1) * config.listPerPage;
  const products = query("SELECT * FROM productToTrack WHERE name LIKE '%" + searchWord + "%'" + (showActiveOnly ? " AND inactive IS NULL OR inactive = '0'" : "") + " LIMIT ?,?", [offset, config.listPerPage]);
  const meta = { page };

  return {
    products,
    meta
  }
}

const listBySellerId = (sellerId) => {
  const products = query("SELECT * FROM productToTrack WHERE id in (SELECT DISTINCT productToTrackId FROM productSnapshot WHERE sellerId = ?)", [sellerId]);

  return {
    products
  }
}

export {
  listByFilter,
  listBySellerId
}