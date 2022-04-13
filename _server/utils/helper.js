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

module.exports = {
  checkBodyUserCreate,
  updateUserCondition
}