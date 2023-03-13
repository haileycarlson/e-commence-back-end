// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category)

// Categories have many Products
Category.hasMany(Products)

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: 'product_id',
})

// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, {
  thorugh: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: 'product_id',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
