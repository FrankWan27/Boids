let colors = 
[[106, 127, 219, 180], //Glaucous
[255, 170, 234, 180], //Orchid Crayola
[169, 251, 215, 180], //Magic Mint
[178, 228, 219, 180], //Middle Blue Green
[252, 171, 100, 180], //Rajah
[220, 214, 247, 180], //Lavender Web
[194, 153, 121, 180], //Antique Brass
[232, 106, 146, 180], //Cyclamen
[244, 216, 205, 180], //Champagne Pink
[247, 175, 157, 180], //Melon
[255, 202, 212, 180], //Pink
[192, 132, 151, 180], //Puce
[192, 155, 216, 180], //Wisteria
[67, 146, 241, 180], //Dodger Blue
[168, 51, 185, 180], //Purpureus
[255, 111, 89, 180], //Bittersweet
[80, 132, 132, 180], //Steel Teal
[247, 231, 51, 180], //Middle Yellow
[27, 154, 170, 180], //Blue Munsell
[239, 48, 84, 180], //Red Crayola
[225, 85, 84, 180], //Indian Red
[195, 49, 73, 180], //French Raspberry
[63, 13, 18, 180], //Dark Sienna
[55, 61, 32, 180], //Kombu Green
[43, 45, 66, 180], //Space Cadet
[74, 66, 56, 180], //Dark Lava
[137, 2, 62, 180], //Claret
[43, 65, 98, 180]] //Indigo Dye

module.exports = {
	randomColor: function() {
		return colors[Math.floor(colors.length * Math.random())]
	}
}
