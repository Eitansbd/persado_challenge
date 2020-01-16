class CreateFish < ActiveRecord::Migration[5.1]
  def change
    create_table :fish do |t|
      t.string :common_name
      t.string :species_name
      t.string :location

      t.timestamps
    end
  end
end
