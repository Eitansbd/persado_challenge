class FishController < ApplicationController
  def index
    @fish = Fish.all
    
    json_response(@fish)
  end
  
  def create
    @fish = Fish.new(fish_params)
    
    if @fish.save
      json_response(@fish)
    else
      
    end
  end
  
  def update
    @fish = Fish.find(params[:id])
    
    if @fish.update(fish_params)
      json_response(@fish)
    else
      
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
end
