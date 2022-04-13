const User = require('../models').user
const appError = require('../utils/appError')
const { checkBodyUserCreate, updateUserCondition } = require('../utils/helper')
const { getPagination, getPagingData } = require('../utils/pagination')


const getUserList = async (req, res, next) => {
  try {
    const {
      pageNumber,
      pageSize
    } = req.body

    const { limit, offset } = getPagination(pageNumber + 1, pageSize)

    const userList = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['created_at', "asc"]]
    })

    const responseData = getPagingData(userList, pageNumber, limit)


    res.json({
      message: "SUCCESS",
      data: responseData
    })
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const id = req.params.id
  try {
    const userData = await User.findByPk(id)
    if (!userToUpdate) {
      throw new appError(404, "User Not Found")
    }
    res.json({
      message: "SUCCESS",
      data: userData
    })
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      avatar,
      age,
      status,
      phone,
      address,
      country, } = req.body

    checkBodyUserCreate(req.body)

    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      avatar,
      age,
      status,
      phone,
      address,
      country
    })

    res.json({
      message: "SUCCESS",
      data: newUser
    })

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const userToUpdate = await User.findByPk(id)

    if (!userToUpdate) {
      throw new appError(404, "User Not Found")
    }

    const updateData = updateUserCondition(req.body)

    await userToUpdate.update(updateData)

    res.json({
      message: "SUCCESS",
      data: userToUpdate
    })




  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const userData = await User.findByPk(id)
    if (!userToUpdate) {
      throw new appError(404, "User Not Found")
    }
    await userData.destroy()

    res.json({
      message: "SUCCESS",
      data: userData
    })
  } catch (error) {
    next(error)
  }
}





module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserList,
  deleteUser,
}
