var input_data = {
	"groups" : 3,
	"students" : [
        {"name": "Ava", "noisy": true, "understands": true, "fights_with": ["Noah", "Madison", "Gavin"]},
        {"name": "Madison", "noisy": false, "understands": true, "fights_with": ["Olivia", "Kaylee"]}, //was false
        {"name": "Daniel", "noisy": true, "understands": true, "fights_with": []},     
        {"name": "Olivia", "noisy": false, "understands": true, "fights_with": ["Mia"]}, //f     
        {"name": "Noah", "noisy": false, "understands": true, "fights_with": ["Kaylee"]},      
        {"name": "Mia", "noisy": true, "understands": true, "fights_with": []}, //f
        {"name": "Jayden", "noisy": false, "understands": true, "fights_with": ["Mia", "Gavin", "Kaylee"]},//f
        {"name": "Brianna", "noisy": true, "understands": true, "fights_with": []},     
        {"name": "Gavin", "noisy": false, "understands": true, "fights_with": ["Noah"]},//f 
        {"name": "Kaylee", "noisy": true, "understands": true, "fights_with": []}//f
    ]
};

module.exports.input_data = input_data