const appError = require('./appError')

const checkBodyUserCreate = (body) => {
  const {
    firstName,
    lastName,
    email,
    avatar,
    age,
    status,
    phone,
    address,
    country, } = body
  if (!firstName) {
    throw new appError(400, "Harap Input Firstname")
  }
  if (!lastName) {
    throw new appError(400, "Harap Input lastName")
  }
  if (!email) {
    throw new appError(400, "Harap Input email")
  }
  if (!age) {
    throw new appError(400, "Harap Input age")
  }
  if (!avatar) {
    throw new appError(400, "Harap Input avatar")
  }
  if (!status) {
    throw new appError(400, "Harap Input status")
  }
  if (!address) {
    throw new appError(400, "Harap Input address")
  }
  if (!country) {
    throw new appError(400, "Harap Input country")
  }
  if (!phone) {
    throw new appError(400, "Harap Input phone")
  }
}

const updateUserCondition = (body) => {
  const {
    firstName,
    lastName,
    email,
    avatar,
    age,
    status,
    phone,
    address,
    country, } = body

  const updateData = {}

  if (firstName) {
    updateData.firstName = firstName
  }

  if (lastName) {
    updateData.lastName = lastName
  }

  if (email) {
    updateData.email = email
  }

  if (avatar) {
    updateData.avatar = avatar
  }

  if (age) {
    updateData.age = age
  }

  if (status) {
    updateData.status = status
  }

  if (phone) {
    updateData.phone = phone
  }

  if (address) {
    updateData.address = address
  }

  if (country) {
    updateData.country = country
  }

  return updateData
}

const checkBodyProductCreate = (body) => {
  const {
    product,
    img_url,
    price,
  } = body
  if (!product) {
    throw new appError(400, "Harap Input product")
  }
  if (!img_url) {
    throw new appError(400, "Harap Input img_url")
  }
  if (!price) {
    throw new appError(400, "Harap Input price")
  }

}

const updateProductCondition = (body) => {
  const {
    product,
    img_url,
    price, } = body

  const updateData = {}

  if (product) {
    updateData.product = product
  }

  if (img_url) {
    updateData.img_url = img_url
  }

  if (price) {
    updateData.price = price
  }

  return updateData
}

const checkBodyOrderCreate = (body) => {
  const {
    tracking_id,
    product_uuid,
    user_uuid,
    qty,
    price_qty,
    total,
    status,
    date } = body
  if (!tracking_id) {
    throw new appError(400, "Harap Input Tracking ID")
  }
  if (!product_uuid) {
    throw new appError(400, "Harap Input Produk")
  }
  if (!user_uuid) {
    throw new appError(400, "Harap Input User")
  }
  if (!qty) {
    throw new appError(400, "Harap Input qty")
  }
  if (!price_qty) {
    throw new appError(400, "Harap Input price_qty")
  }
  if (!total) {
    throw new appError(400, "Harap Input total")
  }
  if (!status) {
    throw new appError(400, "Harap Input status")
  }
  if (!date) {
    throw new appError(400, "Harap Input date")
  }
}

const updateOrderCondition = (body) => {
  const {
    tracking_id,
    product_uuid,
    user_uuid,
    qty,
    price_qty,
    total,
    status, } = body

  const updateData = {}

  if (tracking_id) {
    updateData.tracking_id = tracking_id
  }

  if (product_uuid) {
    updateData.product_uuid = product_uuid
  }

  if (user_uuid) {
    updateData.user_uuid = user_uuid
  }

  if (qty) {
    updateData.qty = qty
  }

  if (price_qty) {
    updateData.price_qty = price_qty
  }

  if (status) {
    updateData.status = status
  }

  if (total) {
    updateData.total = total
  }

  return updateData
}

module.exports = {
  checkBodyUserCreate,
  updateUserCondition,
  checkBodyProductCreate,
  updateProductCondition,
  checkBodyOrderCreate,
  updateOrderCondition
}