const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll();
    console.log(tagData);
    const tags = tagData.map((tag) => tag.get({ plain: true}));
    console.log("tags", tags);
    res.status(200).json(tagData);
    console.log()
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated tag data
});

router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: ProductTag, as: 'tag_productTags' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated tag data
});

router.post('/', async(req, res) => {
  try {
    const tagData = await Tag.create(
      {
      tag_name: req.body.tag_name,
      tagIds: req.body.tag_id
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

  
  Tag.create(req.body)
    .then((tag) => {
      // if there's tag tags, we need to create pairings to bulk create in the tagTag model
      if (req.body.tagIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
          };
        });
        return tag.bulkCreate(tagIdArr);
      }
      // if no tag tags, just respond
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async(req, res) => {
  const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  );

  return res.json(tagData);
});

router.delete('/:id', async(req, res) => {
  const deletedTag = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  });
  
  res.json(deletedTag);
});

module.exports = router;
