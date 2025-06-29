INSERT INTO products (quantity, isAvailable, isDeleted, imageUrl, price, name, description, categoryId)
VALUES (:quantity, true, false, :imageUrl, :price, :name, :description, :categoryId);