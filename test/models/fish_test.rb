require 'test_helper'

class FishTest < ActiveSupport::TestCase
  def setup
    location = "found primarily along the Atlantic coast of North America"
    @fish = Fish.new({ common_name: "Striped Bass",
                       species_name: "Morone saxatilis",
                       location: location})
  end
  
  test "should be valid" do
    assert @fish.valid?
  end
  
  test "common name should be present" do 
    @fish.common_name = "  "
    assert_not @fish.valid?
  end
  
  test "location should be present" do 
    @fish.location = "   "
    assert_not @fish.valid?
  end
  
  test "species name should be present" do 
    @fish.species_name = "  "
    assert_not @fish.valid?
  end
  
  test "species should be unique" do 
    @fish.save
    duplicate_fish = @fish.dup
    
    duplicate_fish.common_name = "A different name"
    duplicate_fish.location = "A difference location"
    
    assert_not duplicate_fish.valid?
  end
  
  test "species name has to be two words" do 
    @fish.species_name = "word"
    assert_not @fish.valid?
    
    @fish.species_name = "one two three"
    assert_not @fish.valid?
  end
  
  test "Species name must contain letters except for one optional ." do
    @fish.species_name = "C. Striatara"
    assert @fish.valid?
    
    @fish.species_name = "12345 word"
    assert_not @fish.valid?
  
    @fish.species_name = "word 12345"
    assert_not @fish.valid?
    
    @fish.species_name = "underscore_word normalword"
    assert_not @fish.valid?
  end
end
