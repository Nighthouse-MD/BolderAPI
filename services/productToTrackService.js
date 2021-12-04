import { query, run } from '../services/trackerDBService.js';
import config from '../config.js';
import axios from 'axios';
import { KEYS } from '../Constants.js';
import Barcoder from 'barcoder';


const addByEan = (ean) => {
  const existing = query(`SELECT * FROM productToTrack WHERE ean = ?`, [ean]);

  if (!Barcoder.validate(ean))
    return `The EAN ${ean} is not valid`;

  if (existing.length > 0)
    return `Already tracking the product: EAN ${ean} - ${existing[0].name}`;

  const apiKey = KEYS.BOL_API_KEY;
  const url = `https://api.bol.com/catalog/v4/search/?q=${ean}&offset=0&limit=2&dataoutput=products,categories&apikey=${apiKey}&format=json`;

  let productId = '';
  let name = '';
  let fetchedOn = new Date().toISOString();
  let fetchedByCategoryId = 'EAN API';

  return axios.get(url).then(response => {
    if (!response.data.products)
      return `Product with EAN ${ean} not found on BOL.COM`;

    productId = response.data.products[0].id;
    name = response.data.products[0].title;

    const result = run('INSERT INTO productToTrack(productId,ean,name,fetchedOn,fetchedByCategoryId) VALUES (@productId, @ean, @name, @fetchedOn, @fetchedByCategoryId)',
      { productId, ean, name, fetchedOn, fetchedByCategoryId });

    let message = 'Error in creating productToTrack';
    if (result.changes) {
      message = 'Product added to tracker';
    }

    return message;
  }).catch(error => {
    console.log(error);
  });
}

export {
  addByEan
}