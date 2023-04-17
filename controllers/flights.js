import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

// code taken from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
let date = new Date()
date.toISOString().split('T')[0]

function formatDate(date) {
  let departureDate = new Date(date),
  month = '' + (departureDate.getMonth() + 1),
  day = '' + departureDate.getDate(),
  year = departureDate.getFullYear() + 1;

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const departureDate = formatDate(date)
// end citation

function newFlight(req, res) {
  res.render('flights/new', {
    departureDate,
    title: 'Add Flight'
  })
}

function create(req, res) {
  req.body.done = false
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function show(req, res) {
  console.log(req.params.flightId);
  Flight.findById(req.params.flightId)
  .then(flight => {
    console.log(flight);
    res.render('flights/show', {
      flight,
      title: 'This Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render("flights/edit", {
      flight,
      departureDate,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update
}