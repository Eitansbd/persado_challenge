class Fish < ApplicationRecord
  validates :common_name, presence: true
  
  validates :species_name, presence: true,
                           uniqueness: true,
                           format: { with: /\A[a-z]+\.? [a-z]+\z/i,
                                     message: "must be a valid species name"}
                           
  validates :location, presence: true
end
