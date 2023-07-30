require("dotenv").config()
const product = require("../models/product")
const userDetails = require("../models/userDetails")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const heartbeat = async (req, res) => {
  res.send("Apis is up")
}

const create = async(req, res) => {
  product.create(req.body)
  .then((_) => res.send("Data created successfully"))
  .catch((err)=> res.status(404).send(err.message))
}

const update = async(req, res) => {
  var query = { product_name: req.body.product_name }
  const newReq = {
    ...req.body,
    updated_at: Date.now()
  }
  var newValues = {$set: newReq };
  product.updateOne(query, newValues)
  .then((_) => res.send("Data updated successfully"))
  .catch((err)=> res.status(404).send(err.message))
}

const remove = async(req, res) => {
  var query = {product_name: req.params.product_name}
  console.log(query)
  product.deleteOne(query)
  .then((_) => res.send("Record deleted successfully."))
  .catch((err) => res.status(404).send(err.message))
}

const fetch = async(req, res) => {
  var query = req.body
  product.find(query)
  .then((result) => {
    if (result.length == 0)
      res.send("No records found")
    else 
      res.json(result)
  })
  .catch((err) => res.status(404).send(err.message))
}

const signUp = async(req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password,11)
  const newReq = {
    ...req.body,
    password: passwordHash
  }
  userDetails.create(newReq)
  .then((_) => res.send("User created successfully."))
  .catch((err) => res.status(404).json(err.message))
}

const signIn = async(req, res) => {
  let query = {user_name : req.body.user_name}
  let keepMeLoggedIn = req.body.keepMeLoggedIn
  let token
  let response = await userDetails.findOne(query)
  if (response) {
    const isAllowed = await bcrypt.compare(req.body.password, response.password)
    if (isAllowed){
      if (keepMeLoggedIn) {
        token = await response.generateAuthToken()
        res.cookie("jwtoken",token,{
          expires: new Date(Date.now()+100000),
          httpOnly: true,
        })
      }
      res.send("Valid User")
    } else { 
      res.status(404).send("Invalid User")
    } 
  }
}

const authenticate = async(req, res) => {
  if (req.cookies.jwtoken == undefined) { 
    return res.status(400).send("Not verified")
  }
  const token = req.cookies.jwtoken
  let verifiedToken = jwt.verify(token,process.env.SECRET_KEY)
  let response = await userDetails.findOne({_id : verifiedToken._id, "tokens.token" : token})
  if (response) {
    res.send(response)
  } else {
    res.status(404).send("Not verified")
  }
}


module.exports = {heartbeat, create, update, remove, fetch, signUp, signIn, authenticate}

