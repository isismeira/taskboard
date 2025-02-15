const express = require('express')
const routes = express.Router()

const AnnotationController = require('./controllers/AnnotationController') 
const PriorityController = require('./controllers/PriorityController')
const ContentController = require('./controllers/ContentController')

// Rota Annotations
routes.post('/api//annotations', AnnotationController.create)
routes.get('/api/annotations', AnnotationController.read)
routes.delete('/api/annotations/:id', AnnotationController.delete)

// Rota Priority
routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)

// Rota Content
routes.post('/contents/:id', ContentController.update)

module.exports = routes