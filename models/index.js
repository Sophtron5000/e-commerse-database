// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});
Category.belongsTo(Product)

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag,{
  through: {
    model: 'productTag',
    unique: false
  }
})

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
