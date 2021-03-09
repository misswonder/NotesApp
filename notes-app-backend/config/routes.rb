Rails.application.routes.draw do
  resources :notes , only: [:create, :index, :show, :destroy, :update]
  resources :users, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
