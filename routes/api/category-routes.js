const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll();
    console.log(categoryData);
    const categories = categoryData.map((category) => category.get({ plain: true}));
    console.log("categories", categories);
    res.status(200).json(categoryData);
    console.log()
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated to many Products
});

router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'category_products' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  );

  return res.json(categoryData);
});

router.delete('/:id', async(req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  
  res.json(deletedCategory);
});

module.exports = router;
