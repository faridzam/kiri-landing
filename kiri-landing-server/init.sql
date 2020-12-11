UPDATE products
SET category_name = categories.category_name
FROM categories
WHERE products.category_id = categories.category_id;
