var restify = require('restify')
const corsMiddleware = require('restify-cors-middleware')
const db = {
  users: {
    '123': {
      name: 'mpj',
      cats: [ 21, 33, 45 ],
      imageUrl: 'http://images.somecdn.com/user-123.jpg'
    }
  },
  cats: {
    '21': {
      name: 'Fluffykins',
      imageUrl: 'http://images.somecdn.com/cat-21.jpg',
    },
    '33': {
      name: 'Waffles',
      imageUrl: 'http://images.somecdn.com/cat-33.jpg'
    },
    '45': {
      name: 'Sniffles', 
      imageUrl: 'http://images.somecdn.com/cat-45.jpg',
      type: 'smellyCat'
    }    
  }
}  
function cats(req, res, next) {
  res.send(db.cats[req.params.id])
  next()
}
function users(req, res, next) {
  res.send(db.users[req.params.id])
  next()
}
var server = restify.createServer()
const cors = corsMiddleware({
  origins: ['*']
})
server.pre(cors.preflight)
server.use(cors.actual)
server.get('/cats/:id', cats)
server.get('/users/:id', users)
server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})