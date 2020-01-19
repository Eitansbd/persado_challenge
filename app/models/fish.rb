class Fish < ApplicationRecord
  validates :common_name, presence: true
  
  validates :species_name, presence: true,
                           uniqueness: { case_sensetive: false, 
                                         message: "species has already been added"},
                           format: { with: /\A[a-z]+\.? [a-z]+\z/i,
                                     message: "must be a valid species name"}
                           
  validates :location, presence: true
end
