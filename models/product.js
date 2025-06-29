window.Product = class Product {
    constructor(id, quantity, isAvailable, isDeleted, imageUrl, price, name, description, createdAt, updatedAt, categoryId) {
        this.id = id;
        this.quantity = quantity;
        this.isAvailable = isAvailable;
        this.isDeleted = isDeleted;
        this.imageUrl = imageUrl;
        this.price = price;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
    }

    static fromJSON(json) {
        return new Product(
            json.id || null,
            json.quantity || 0,
            json.isAvailable || false,
            json.isDeleted || false,
            json.imageUrl || '',
            json.price || 0,
            json.name || '',
            json.description || '',
            json.createdAt || Date.now(),
            json.updatedAt || Date.now(),
            json.categoryId || null,
        );
    }

    toJSON() {
        return {
            id: this.id,
            quantity: this.quantity,
            isAvailable: this.isAvailable,
            isDeleted: this.isDeleted,
            imageUrl: this.imageUrl,
            price: this.price,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            categoryId: this.categoryId,
        };
    }
}