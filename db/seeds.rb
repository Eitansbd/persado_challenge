fish_list = [
  ["Black sea bass", "C. striata", "native to California and Baja California, where it lives in the coastal waters of the eastern Pacific Ocean"],
  ["Striped bass", "Morone saxatilis", "found primarily along the Atlantic coast of North America, it has also been widely introduced into inland recreational fisheries across the United States"],
  ["Roosterfish", "Nematistius pectoralis", "found in the warmer waters of the East Pacific from Baja California to Peru"],
  ["Red drum", "Sciaenops ocellatus", "found in the Atlantic Ocean from Massachusetts to Florida and in the Gulf of Mexico from Florida to northern Mexico"],
  ["Bonefish", "Albula vulpes", "found in Florida, select locations in the South Pacific and the Bahamas"],
  ["Largemouth bass", "Micropterus salmoides", "native to the eastern and central United States and northern Mexico, but widely introduced elsewhere"],
  ["Peackock bass", "Cichla intermedia", "native to the Amazon and Orinoco basins, as well as rivers of the Guianas, in tropical South America"],
  ["Mahi Mahi", "Coryphaena hippurus", "found in off-shore temperate, tropical, and subtropical waters worldwide, most commonly in the waters around the Gulf of Mexico, Costa Rica, and Hawaii"],
  ["Lemon shark", "Negaprion brevirostris", "found from New Jersey to southern Brazil in the tropical western Atlantic Ocean. They also live off the coast of west Africa in the southeastern Atlantic"],
  ["Great white shark", "Carcharodon carcharias", "found in the coastal surface waters of all the major oceans"],
  ["Pacific halibut", "Hippoglossus stenolepis", "found on the continental shelf of the North Pacific Ocean and Bering Sea"],
  ["Atliantic cod", "Gadus morhua", "in the western Atlantic Ocean, cod has a distribution north of Cape Hatteras, North Carolina, and around both coasts of Greenland and the Labrador Sea; in the eastern Atlantic, it is found from the Bay of Biscay north to the Arctic Ocean, including the Baltic Sea, the North Sea, Sea of the Hebrides, areas around Iceland and the Barents Sea"],
  ["Clown fish", "Amphiprion ocellaris", "found in the Eastern Indian Ocean and in the western Pacific Ocean. They can also be found in Northern Australia, Southeast Asia and Japan"],
  ["Summer flounder", "Paralichthys dentatus", "found in the Atlantic Ocean off the East Coast of the United States and Canada"],
  ["Bull shark", "Carcharhinus leucas", "The bull shark is commonly found worldwide in coastal areas of w-arm oceans, in rivers and lakes, and occasionally salt and freshwater streams if they are deep enough"],
  ["Scup", "Stenotomus chrysops", "occurs primarily in the Atlantic from Massachusetts to South Carolina"],
  ["Yellowtail snapper", "Ocyurus chrysurus", "native to the western Atlantic Ocean including the Gulf of Mexico and the Caribbean Sea"],
  ["Atlantic tarpon", "Megalops atlanticus", " found in the Atlantic Ocean, typically in tropical and subtropical regions, though it has been reported as far north as Nova Scotia and the Atlantic coast of southern France, and as far south as Argentina"],
  ["Snook", "Centropomus undecimalis", "found throughout the tropical waters of the western Atlantic Ocean from the coast of the North Carolina to Brazil including the Gulf of Mexico and the Caribbean Sea"], 
  ["Calico bass", "Paralabrax clathratus", "found in the eastern North Pacific Ocean from Baja California, Mexico, to Washington, United States (although rare in the northernmost part of its range)"],
  ["California sheephead", "Semicossyphus pulcher", "native to the eastern Pacific Ocean. Its range is from Monterey Bay, California, to the Gulf of California, Mexico"]
]

fish_list.each do |common_name, species_name, location|
  Fish.create do |f|
    f.common_name = common_name
    f.species_name = species_name
    f.location = location
  end
end