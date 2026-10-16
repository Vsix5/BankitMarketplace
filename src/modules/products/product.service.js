import pool from '../../../utils/db.js';

export async function getAllProducts() {
  const result = await pool.query(`
    SELECT id,
           name,
           description,
           price,
           discounted_price,
           category,
           stock,
           image_url,
           seller_id,
           rating,
           sales_count,
           created_id
           FROM products ORDER BY created_id DESC`);
           return result.rows;
}