'use strict'
const Post = use('App/Models/Post')
class PostController {
  //Show all posts from all Users
  async index ({ request, response, view }) {
    const posts =  await Post.all()
    await response.json(posts)
  }
  async create ({ request, response, auth }) {
    const user_id = auth.user.id
    
    const title = request.input('title')
    const post = new Post()
    post.merge({
      title : title,
      user_id : user_id 
    })
    await post.save()
    return await  response.json(post)

  }
  async show ({ params, request, response, auth }) {
    const user = auth.user
    const posts = await user.posts().fetch()
    return response.json(posts)
  }

  async update ({ auth, params, request, response }) {
    try{
      let post = await Post.find(params.id)
      if(post.user_id !== auth.user.id){
        return response.json({
          message : "ERROR"
      })}
      const title = request.input('title')
      post.title = title
      post.save()
      return response.json({
        message : `Post ${post.id} successful updated`
      })
    }
    catch(e){
      return response.json({
        message : "ERROR"
      })
    }
  }
  async destroy ({ params, request, response ,auth }) {
    
    try{
      let post = await Post.find(params.id)
      await post.delete();
    if(post.user_id !== auth.user.id){
      return response.json({
        message : "Errors"
      })
    }
    return response.json({
      message  : `post ${params.id} successful deleted`
    })
    }
    catch(e){
      console.log(e)
      return response.json({
        message : `cannot find post ${params.id}`
      })
    }
  }
}

module.exports = PostController
