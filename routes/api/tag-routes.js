const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({ include: [Product] })
    .then((tag) => res.json(tag))
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          }
        })
        return ProductTag.bulkCreate(productTagIdArr)
      }
      // if no product tags, just respond
      res.status(200).json(tag)
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    console.log("Tag has been posted!")
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
})

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!tagData[0]) {
      res.status(404).json
      // ({ message: 'No tag with this id!' })
      return
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
    console.log("Tag has been updated")
  }
})

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.json(tag))
    console.log("Tag has been deleted")
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
