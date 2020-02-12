'use strict'
const User = use("App/Models/User")

class UserController {
        
    async register({ request ,auth ,response}){
        const {email ,password} = request.all();
        
        await User.create({
            email : email,
            password : password,
            username: email
        })
        return this.login(...arguments)
    }

    async login({request,auth}){
    
        const {email,password} = request.all();
    
        const token = await auth.attempt(email,password)
        return token;
    }
    async getUsers({request,response}){
        const users = User.request.all()
        return response.json(users)
    }
}
module.exports = UserController