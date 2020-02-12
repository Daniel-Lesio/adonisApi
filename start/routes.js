'use strict'

const Route = use('Route')

Route.group(()=>{
  Route.post('auth/register', 'UserController.register' )
  Route.post('auth/login', 'UserController.login')
  
  Route.get('/posts','PostController.index')
  Route.get('/show','PostController.show').middleware('auth')
  Route.post('/create', 'PostController.create').middleware('auth')
  Route.post('/update/:id','PostController.update').middleware('auth')
  Route.delete('/delete/:id', 'PostController.destroy').middleware('auth')
}).prefix("api")