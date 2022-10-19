const Administrator = require('../models/administratorModel')
const mongoose = require('mongoose')

// get all administrators
const getAdministrators = async (req, res) => {
  const administrators = await Administrator.find({}).sort({createdAt: -1})

  res.status(200).json(administrators)
}

// get a single administrator
const getAdministrator = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such administrator'})
  }

  const administrator = await Administrator.findById(id)

  if (!administrator) {
    return res.status(404).json({error: 'No such administrator'})
  }

  res.status(200).json(administrator)
}

// create a new administrator
const createAdministrator = async (req, res) => {
  const {username,password} = req.body

  // add to the database
  try {
    const administrator = await Administrator.create({ username, password})
    res.status(200).json(administrator)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a administrator
const deleteAdministrator = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such administrator'})
  }

  const administrator = await Administrator.findOneAndDelete({_id: id})

  if(!administrator) {
    return res.status(400).json({error: 'No such administrator'})
  }

  res.status(200).json(administrator)
}

// update a administrator
const updateAdministrator = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such administrator'})
  }

  const administrator = await Administrator.findOneAndUpdate({_id: id}, req.body , {
    new: true
  });

  if (!administrator) {
    return res.status(400).json({error: 'No such administrator'})
  }

  res.status(200).json(administrator)
}

module.exports = {
  getAdministrators,
  getAdministrator,
  createAdministrator,
  deleteAdministrator,
  updateAdministrator
}