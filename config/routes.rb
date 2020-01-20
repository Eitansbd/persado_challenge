Rails.application.routes.draw do
  root 'static_pages#home'
  
  namespace :api do 
    resources :fish, only: [:index, :create, :destroy, :update]
  end
end
