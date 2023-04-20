import { Meal } from "../models/meal.js"

function index(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/index', {
      meals,
      title: 'All Meals'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      meals,
      title: 'Add Meal'
    })
  })
}

function create(req, res) {
  req.body.done = false
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/meals/new')
  })
}

function show(req, res) {
  console.log(req.params.flightId);
  Meal.findById(req.params.flightId)
  .then(meal => {
    console.log(meal);
    res.render('meals/show', {
      meal,
      title: 'This Meal'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/meals')
  })
}

function edit(req, res) {
  Meal.findById(req.params.mealId)
  .then(meal => {
    res.render("meals/edit", {
      meal,
      title: "Edit Meal"
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/")
  })
}

function update(req, res) {
  Meal.findByIdAndUpdate(req.params.mealId, req.body, {new: true})
  .then(meal => {
    res.redirect(`/meals`)
  })
  .catch(error => {
    console.log(error)
    res.redirect("/meals")
  })
}

function deleteMeal(req, res) {
  Meal.findByIdAndDelete(req.params.mealId)
  .then(meal => {
    res.redirect('/meals')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/meals')
  })
}

export {
  index,
  newMeal as new,
  create,
  show,
  edit,
  update,
  deleteMeal as delete
}