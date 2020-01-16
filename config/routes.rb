Rails.application.routes.draw do
  root 'static_pages#home'
  
  resources :fish, only: [:index, :create, :destroy, :update]
end
