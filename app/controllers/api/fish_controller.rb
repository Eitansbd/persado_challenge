class Api::FishController < ApplicationController
  def index
    page_number = params[:page] || "1"
    if page_number.match? (/\A[\d]+\z/)
      items_per_page = 10
      offset = items_per_page * (page_number.to_i - 1)
      @fish = Fish.order(:common_name).limit(items_per_page).offset(offset)
      json_response(@fish)
    else
      error = "invalid page param"
      render json: { message: error }, status: :unprocessable_entity
    end
  end
  
  def create
    @fish = Fish.new(fish_params)
    
    if @fish.save
      json_response(@fish)
    else
      failed_validation_response
    end
  end
  
  def update
    @fish = Fish.find(params[:id])
    
    if @fish.update(fish_params)
      json_response(@fish)
    else
      failed_validation_response
    end
  end
  
  def destroy
    @fish = Fish.find(params[:id])
    @fish.destroy
    
    head :no_content
  end
  
  private
  
    def fish_params
      params.require(:fish).permit(:common_name, :species_name, :location)
    end
    
    def json_response(response_object, status = :ok)
      render json: response_object, 
             except: [:created_at, :updated_at],
             status: status
    end
    
    def failed_validation_response
      response_obj = {
        message: "Validation failed",
        errors: @fish.errors
      }
      json_response(response_obj, 400)
    end
end
