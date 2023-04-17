import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/flights
router.get('/', flightsCtrl.index)

// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

// GET localhost:3000/flights/:flightId
router.get('/:flightId', flightsCtrl.show)

// POST localhost:3000/flights
router.post('/', flightsCtrl.create)

// GET localhost:3000/flights/:flightId/edit
router.get('/:flightId/edit', flightsCtrl.edit)

// localhost:3000/flights/:flightId
router.put("/:flightId", flightsCtrl.update)

// DELETE localhost:3000/flights/:flightId
router.delete('/:flightId', flightsCtrl.delete)

export { router }
