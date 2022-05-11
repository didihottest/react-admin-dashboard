const Product = require('../models').product
const appError = require('../utils/appError')
const { checkBodyProductCreate, updateProductCondition } = require('../utils/helper')
const { getPagination, getPagingData } = require('../utils/pagination')


const getProductList = async (req, res, next) => {
  try {
    const {
      pageNumber,
      pageSize
    } = req.body

    const { limit, offset } = getPagination(pageNumber + 1, pageSize)

    const productList = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['created_at', "asc"]]
    })

    const responseData = getPagingData(productList, pageNumber, limit)


    res.json({
      message: "SUCCESS",
      data: responseData
    })
  } catch (error) {
    next(error)
  }
}

const getProductAll = async (req, res, next) => {
  try {
    const productList = await Product.findAll({
      order: [['product', "asc"]]
    })
    res.json({
      message: "SUCCESS",
      data: productList
    })
  } catch (error) {
    next(error)
  }
}



const getProductById = async (req, res, next) => {
  const id = req.params.id
  try {
    const productData = await Product.findByPk(id)
    if (!productData) {
      throw new appError(404, "Product Not Found")
    }
    res.json({
      message: "SUCCESS",
      data: productData
    })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const {
      product,
      img_url,
      price,
    } = req.body

    checkBodyProductCreate(req.body)

    const newProduct = await Product.create({
      product,
      img_url,
      price,
    })

    res.json({
      message: "SUCCESS",
      data: newProduct
    })

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  const id = req.params.id
  try {
    const productToUpdate = await Product.findByPk(id)

    if (!productToUpdate) {
      throw new appError(404, "Product Not Found")
    }

    const updateData = updateProductCondition(req.body)

    await productToUpdate.update(updateData)

    res.json({
      message: "SUCCESS",
      data: productToUpdate
    })




  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  const id = req.params.id
  try {
    const productData = await Product.findByPk(id)
    if (!productData) {
      throw new appError(404, "Product Not Found")
    }
    await productData.destroy()

    res.json({
      message: "SUCCESS",
      data: productData
    })
  } catch (error) {
    next(error)
  }
}





module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  getProductList,
  deleteProduct,
  getProductAll
}
