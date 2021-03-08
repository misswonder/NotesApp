class UsersController < ApplicationController
    def index 
        users = User.all
        render json: UserSerializer.new(users)
    end 

    def show
        user = User.find_by(id: params[:id])
        options = {
    include: [:notes]
    }
        render json: UserSerializer.new(user, options)
    end 
end

