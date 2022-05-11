const Product_Order = require('../models').product_order
const appError = require('../utils/appError')
const { checkBodyOrderCreate, updateOrderCondition } = require('../utils/helper')
const { getPagination, getPagingData } = require('../utils/pagination')


const getOrderList = async (req, res, next) => {
  try {
    const {
      pageNumber,
      pageSize
    } = req.body

    const { limit, offset } = getPagination(pageNumber + 1, pageSize)

    const orderList = await Product_Order.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['created_at', "asc"]]
    })

    const responseData = getPagingData(orderList, pageNumber, limit)


    res.json({
      message: "SUCCESS",
      data: responseData
    })
  } catch (error) {
    next(error)
  }
}

const getOrderById = async (req, res, next) => {
  const id = req.params.id
  try {
    const orderData = await Product_Order.findByPk(id)
    if (!orderData) {
      throw new appError(404, "Order Not Found")
    }
    res.json({
      message: "SUCCESS",
      data: orderData
    })
  } catch (error) {
    next(error)
  }
}

const createOrder = async (req, res, next) => {
  try {
    const {
      tracking_id,
      product_uuid,
      user_uuid,
      qty,
      price_qty,
      total,
      status,
      date } = req.body

    checkBodyOrderCreate(req.body)

    const newOrder = await Product_Order.create({
      tracking_id,
      product_uuid,
      user_uuid,
      qty,
      price_qty,
      total,
      status,
      date
    })

    res.json({
      message: "SUCCESS",
      data: newOrder
    })

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error)
  }
}

const updateOrder = async (req, res, next) => {
  const id = req.params.id
  try {
    const orderToUpdate = await Product_Order.findByPk(id)

    if (!orderToUpdate) {
      throw new appError(404, "Order Not Found")
    }

    const updateData = updateOrderCondition(req.body)

    await orderToUpdate.update(updateData)

    res.json({
      message: "SUCCESS",
      data: orderToUpdate
    })




  } catch (error) {
    next(error)
  }
}

const deleteOrder = async (req, res, next) => {
  const id = req.params.id
  try {
    const orderData = await Product_Order.findByPk(id)
    if (!orderData) {
      throw new appError(404, "Order Not Found")
    }
    await orderData.destroy()

    res.json({
      message: "SUCCESS",
      data: orderData
    })
  } catch (error) {
    next(error)
  }
}





module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getOrderList,
  deleteOrder,
}
