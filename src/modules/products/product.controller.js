import { getAllProducts } from './product.service.js';

export async function getProducts(req, res) {
  const products = await getAllProducts();
  res.status(200).json({
    products
  })
}