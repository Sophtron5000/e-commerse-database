// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});
Category.belongsTo(Product)

Product.belongsToMany(Tag,{
  through: {
    model: 'productTag',
    unique: false
  }
});
Tag.belongsToMany(Product,{
  through: {
    model: 'productTag',
    unique: false
  }});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
//do i need to make a separate association for the reverse association