// ---- variable
var winner;

var countryTable = document.getElementById('countryResults');

//---- State Table

// full table
var stateTable = document.getElementById('stateResults')

// table header
var stateHeader = stateTable.children[0].children[0];

var stateNameCell = stateHeader.children[0];

var stateAbbrCell = stateHeader.children[1];

//candidate 1 row
var candidate1Row = stateTable.children[1].children[0];

var candidate1Name = candidate1Row.children[0];

var candidate1Result = candidate1Row.children[1];

//candidate 2 row
var candidate2Row = stateTable.children[1].children[1];

var candidate2Name = candidate2Row.children[0];

var candidate2Result = candidate2Row.children[1];

// win row

var stateWinCell = stateTable.children[1].children[2].children[1];

//---- Politician Object

var makePolitician = function(name, color){
  var politician = {} ;
  politician.name = name ;
  politician.electionResults = null ;
  politician.partyColor = color;
  politician.totalVotes = function(){
    this.totalVotes = 0;
    for(var i = 0 ; i < this.electionResults.length ; i++){
      this.totalVotes = this.totalVotes + this.electionResults[i];
    }

    console.log(this.totalVotes);
  }

  politician.recount = function(i, votes){
  this.electionResults[i] = votes;
  }

  politician.announce = function(){
    console.log(`I am ${this.name} and I have ${this.electionResults} election results and ${this.totoalVotes}. My party color is ${this.partyColor}.`) ;
  }

  politician.announce() ;

  return politician ;
}

//---- Create Politicians
var candidate1 =  makePolitician('Romney', [132, 17, 11]);



candidate1.electionResults = [
  5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2
]


var candidate2 = makePolitician('Obama', [245, 141, 136]);

candidate2.electionResults = [
  4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1
]


// recounts
candidate1.recount(9, 1);
candidate1.recount(4, 17);
candidate1.recount(43, 11);

candidate2.recount(9, 28);
candidate2.recount(4, 38);
candidate2.recount(43, 27);

var setStateResults = function(state){
  var stateWinner = null;
  if (candidate1.electionResults[state] > candidate2.electionResults[state]){
    theStates[state].winner = candidate1;
  } else if (candidate1.electionResults[state] < candidate2.electionResults[state]){
    theStates[state].winner = candidate2;
  }

  var stateWinner = theStates[state].winner;

  if(stateWinner !== null){
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }

  stateNameCell.innerText = theStates[state].nameFull;
  stateAbbrCell.innerText = theStates[state].nameAbbrev;

  candidate1Name.innerText = candidate1.name;
  candidate2Name.innerText = candidate2.name;

  candidate1Result.innerText = candidate1.electionResults[state]
  candidate2Result.innerText = candidate2.electionResults[state]

  if (theStates[state].winner === null){
    stateWinCell.innerText = "Draw";
  } else {
    stateWinCell.innerText = theStates[state].winner.name;
  }
}

candidate1.totalVotes();
candidate2.totalVotes();

candidate1.announce();
candidate2.announce();

//---- Declare Overall Winner
var declareWinner = function(){
  if(candidate1.totalVotes > candidate2.totalVotes){
    winner = candidate1;
  } else if (candidate1.totalVotes < candidate2.totalVotes){
    winner = candidate2
  } else {
    winner = "draw"
  }

  console.log(winner);
}

declareWinner();

//---- Get at DOM

//-- Country Table

countryTable.children[0].children[0].children[0].innerText = candidate1.name;

countryTable.children[0].children[0].children[1].innerText = candidate1.totalVotes;

countryTable.children[0].children[0].children[2].innerText = candidate2.name;

countryTable.children[0].children[0].children[3].innerText = candidate2.totalVotes;

countryTable.children[0].children[0].children[5].innerText = winner.name;
