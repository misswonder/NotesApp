class UsersController < ApplicationController
    def index 
        users = User.all
        render json: UserSerializer.new(users)
    end 

    def create
        user = User.create!({ username: permitted_params['username'] })
        options = {
            include: [:notes]
        }
        render json: UserSerializer.new(user, options)
    end

    def show
        user = User.find_by(id: params[:id])
        options = {
        include: [:notes]
        }
        render json: UserSerializer.new(user, options)
    end 

    def permitted_params
        params.require(:user).permit(:username)
    end
end

