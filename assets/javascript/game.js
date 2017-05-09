$(document).ready(function() {
	//These are the global variables
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;

	function varSet() {		
		//The variable values..
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Steven",
			pic: 'assets/images/steven.jpg',
			hitPoints: 100,
			attackPower: 20
		}, {
			id: 1,
			name: "Pearl",
			pic: 'assets/images/pearl.jpg',
			hitPoints: 160,
			attackPower: 40 		
		}, {
			id: 2,
			name: "Amethyst",
			pic: 'assets/images/amethyst.jpg',
			hitPoints: 120,
			attackPower: 30
		}, {
			id: 3,
			name: "Garnet",
			pic: 'assets/images/garnet.jpg',
			hitPoints: 180,
			attackPower: 60 
		} ];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 3;
		rounds = 4	;


		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='selection' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].hitPoints +
			"<br> AP: " + enemyArray[i].attackPower + " </div>";
		}

		$("#pick").html(choices);
		$("#action").html("Pick a Character and Fight!");
		$('.you').remove();
		$('.fighting').remove();
		$('#activity').html("");

		attachCharacterOnClick();
	}

	function printCharacters() {
		var you = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='chracterbox' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].hitPoints +
			"<br> AP: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='chracterbox' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].hitPoints +
			"<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
		$('#initialChar').html(you);
		$('#trainers').html(badguy);
	}

//This is basically the description of the activity..
	function whatHappens() {
		var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>" +
			"Your attack power has increased by " + rounds + "!";
		$('#activity').html(description);
	}

//This is where we pick characters. 
	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	
				myChar = $(this).attr('id');
				$("#initialChar").append(this);


				haveCharacter = true;
				$('#activity').html("");
				$("#action").html("Choose your opponent!");
				varSet();
			}
		//Where you have your character and you're picking another character.
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {	
				opponentChar = $(this).attr('id');
				$("#trainers").append(this);
			

				haveAttacker = true;
				$('#activity').html("");
				$("#action").html("Keep clicking attack to duel!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveCharacter) {
			$('#activity').html("Please pick your trainer!");
		}
		else if(!haveAttacker) {
			$('#activity').html("Pick who you are fighting!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			//Attacks
			enemyArray[opponentChar].hitPoints  = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;
			enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;


			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#activity').html("");
					$("#action").html("Who will you duel next?");
					haveAttacker = false;
				}
				else {
					activity();
					alert("You win the traing session!  Play again!");
					varSet();
				}
				
			}
			else if(enemyArray[myChar].hitPoints < 0) {
				activity();
				alert("You've been defeated!  Try again!")
				varSet();
			}
			else {
				activity();
				printCharacters();
			}

			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;
		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});