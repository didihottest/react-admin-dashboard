const Admin = require('../models').admin
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');


const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName) {
      throw new appError(400, 'Harap Isi firstName')
    }
    if (!lastName) {
      throw new appError(400, 'Harap Isi lastName')
    }
    if (!email) {
      throw new appError(400, 'Harap Isi email')
    }
    if (!password) {
      throw new appError(400, 'Harap Isi password')
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword

    })

    res.status(201).json({
      message: "SUCCESS",
      data: newAdmin
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {

  try {
    const { email, password } = req.body
    console.log(req.body)
    if (!email) {
      throw new appError(400, "Harap Input Email")
    }
    if (!password) {
      throw new appError(400, "Harap Input Password")
    }

    const adminData = await Admin.findOne({
      where: {
        email: email.toLowerCase()
      }
    })

    if (!adminData) {
      throw new appError(404, "Your Email Is Not Registered")
    }

    const correctPassword = bcrypt.compareSync(password, adminData.password)

    if (!correctPassword) {
      throw new appError(403, "Wrong Password")
    } else {

      const token = jwt.sign(
        // data yang mau kita kunci kedalam token
        {
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          email: adminData.email,

        }, process.env.JWT_SECRET);


      res.json({
        message: "SUCCESS",
        data: {
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          email: adminData.email,
          token: token
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

// middleware untuk verifikasi token user
const verifyToken = (req, res, next) => {
  try {
    let tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
      throw new appError(401, "Authorization Token Is Required")
    }
    // bentuk token
    "Bearer eyasdaalsdfasd.asdasdasd.asdasdasdasd"

    // ambil tokennya saja, buang text bearer
    let token = tokenHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        throw new appError(401, err)
      } else {
        req.user = decodedToken
        next()
      }
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  signUp,
  login,
  verifyToken
}