const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: [Product] })
    .then((category) => res.json(category))
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
    .then((category) => res.json(category))
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = Category.create(req.body)
    res.status(200).json(categoryData)
    // console.log("Category has been posted")
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!categoryData[0]) {
      res.status(404).json
      // ({ message: 'No category with this id!' })
      return
    }
    res.status(200).json(categoryData)
    // console.log("Category has been updated!")
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!categoryData) {
      res.status(404).json
      // ({ message: 'No category found with this id!' })
      return
    }

    res.status(200).json(categoryData)
    // console.log("Category has been deleted!")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
