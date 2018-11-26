var images = [ //Image card flip
    {card: 1, value: 'alce', image: '../IMG/alce.jpg'},
    {card: 2, value: 'alce', image: '../IMG/alce.jpg'},
    {card: 3, value: 'epelante', image: '../IMG/epelante.jpg'},
    {card: 4, value: 'epelante', image: '../IMG/epelante.jpg'},
    {card: 5, value: 'nena', image: '../IMG/nena.jpg'},
    {card: 6, value: 'nena', image: '../IMG/nena.jpg'},
    {card: 7, value: 'peces', image: '../IMG/peces.jpg'},
    {card: 8, value: 'peces', image: '../IMG/peces.jpg'},
    {card: 9, value: 'unichancho', image: '../IMG/unichancho.jpg'},
    {card: 10, value: 'unichancho', image: '../IMG/unichancho.jpg'},
    {card: 11, value: 'zapas', image: '../IMG/zapas.jpg'},
    {card: 12, value: 'zapas', image: '../IMG/zapas.jpg'},
];

const coverImage = {
   image: '../IMG/tapada.jpg'
};

var players = [];

const easyIntent = 18;
const middleIntent = 12;
const hardIntent = 9;

var select;

var clicks = 0;
var attempts = 0;
var match = 0;

var card1 = null;
var card2 = null;



var playerName;
var playerAttempts;
var playerLevel;


function verifyName () {  // create a function to verify the name of the player
    var newName = $('.input-name').val().trim();    
    
    $('.name').text(newName);//the name of the input will appear in the new window of the game
        
        if (newName === '') {  // we have to verify if the player put his name.
            $('.error-name').css('display', 'block');            
            return;                                
        }
        else {
            $('.hello-window').css('display', 'none') && $('.game-window').css('display', 'block');
            
        }     
        playerName = newName;
       // here we push the player name to the global var
       
};

function easyDifficulty () { // Here the player decides for a easy difficulty 
    var easyGame = $('.easy-game');  
    easyGame.on('click', function () {
        select = easyIntent;
        playerLevel = "FACIL";
        verifyName();  

         //Here we determine the attempts
        $('.attempts').text(easyIntent).css('color', '#00ace6');
        $('.counter').text(attempts).css('color', 'black');

        const difficulty = 'FACIL'; //Here the easy difficulty chosen is clarified
        $('.button-choice').text(difficulty);         
    });    
}easyDifficulty();

function middleDifficulty () { //Here the player decides for a middle difficulty 
    var easyGame = $('.middle-game');  
    easyGame.on('click', function () {
        select = middleIntent;
        playerLevel = "MEDIO";
        verifyName(); 
        
         //Here we determine the attempts
        $('.attempts').text(middleIntent).css('color', '#00ace6');
        $('.counter').text(attempts).css('color', 'black');

        const difficulty = 'INTERMEDIO'; //Here the middle difficulty chosen is clarified
        $('.button-choice').text(difficulty);        
    });    
}middleDifficulty();

function hardDifficulty () { // Here the player decides for a hard difficulty 
    var easyGame = $('.hard-game');  
    easyGame.on('click', function () {
        select = hardIntent;
        playerLevel = "DIFICIL";
        verifyName();    
        
         //Here we determine the attempts
        $('.attempts').text(hardIntent).css('color', '#00ace6');
        $('.counter').text(attempts).css('color', 'black');

        const difficulty = 'DIFICIL'; //Here the hard difficulty chosen is clarified
        $('.button-choice').text(difficulty);        
    });    
}hardDifficulty();


function createTable () { // generate the table according to the quantity of elements that I have in my Object Array.
    var container = $('.game-board');
    images.sort(function() {return Math.random() - 0.5});
    for (let i = 0; i < images.length; i++) {
        var theImage = images[i].image; // here we find the imagen 
        var theCover = coverImage.image; 
        
        var theCard = $('<div id="' + images[i].card +'"class="new-card"></div>')
        var frontCard = $('<div class="front-card"><img src="'+ theCover + '"/></div>'); // always put SRC in the IMG tag
        var backCard = $('<div class="back-card"><img class="cover-card" src="'+ theImage + '"/></div>'); // always put SRC in the IMG tag
        
        theCard.data("imageValue", images[i].value)
        
        verifyCard(theCard)        
        
        theCard.append(frontCard);
        theCard.append(backCard);
        container.append(theCard);        
        
    }
    
}

// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
function verifyCard (card) {
    card.on('click', function () { 
    
        clicks = clicks + 1; // We count the number of clicks 
    
    const valueCard = $(this).data('imageValue'); // here create a var with the data
    const Id = $(this).attr('id') // we create a var with attribute called ID
      
    
    $(this).addClass('flipped');  // here the card flips
    $('.back-card').show();
     
    // Here we condition that exist only two clicks per move
    if (clicks === 1) {
        card1 = {
            valueCard,
            Id
        }                 
    }
    else {
        card2 = {
            valueCard,
            Id
        }
        // Compares cards if they matched        
        if (card1.valueCard === card2.valueCard && card1.Id !== card2.Id) {
            $('#' + card2.Id).children().addClass('grayscale');
            $('#' + card1.Id).children().addClass('grayscale'); 
            match ++
            console.log(match)
            success();
                       
        }
        // If cards are not matched, there is a delay of 800ms, and the cards will turn back cover up
        else {
            setTimeout(function() {
                $('#' + card2.Id).removeClass('flipped');
                $('#' + card1.Id).removeClass('flipped'); 
            }, 800)       
        }
        
        counterAttempts();
               
        clicks = 0  //the counter of click reset to 0
    }           
   
    });
    
}

/* Here we count the number of attempts, 
once the player spends the attempts, a modal alert window showing game over.*/
function counterAttempts() {
    attempts = attempts + 1; 
    $('.counter').html(attempts);
    
    if (attempts >= select) {
        
        $('.lose-window').modal({
            fadeDuration: 250,
            fadeDelay: 0.80           
        });     
    }   
}

// Add modal alert window showing attempts it took to finish the game, toggles when all pairs are matched.
function success () {    
    if(match === 6) {
        $('.win-window').modal({
            fadeDuration: 250,
            fadeDelay: 0.80
        })
        $('.attemps').text(attempts + 1).css('color', 'black');
        var playerAttempts = attempts + 1; // as in the HTML it showed the -1 attempts, it adds 1 to it to reflect the real attempts.
        
        var playerId = { // here we overwritting the global var with new properties.
            playerAttempts,
            playerName,
            playerLevel
        }
                
        players.push(playerId)
        playerId;

        //send the players data to the localStoreage
        var playersJson = JSON.stringify(players)
        localStorage.setItem("playersList", playersJson)
        console.log(localStorage.playersList)
        
        scoreTable()          
    }
    
} 

// Clicking on the button located on the modal, enables the game too be reset
$('.buttons1').on('click', function(confirmed){
    if (confirmed) {
        location.reload()
    }
});

// bring back the information from de localStorage and push to the array.
function verifyLocalStorage() {
    var savePlayers = localStorage.getItem('playersList')
    if (savePlayers) {
      players = JSON.parse(savePlayers);
      console.log(players);
        }
}verifyLocalStorage()


//create a Table whit the players score.
function scoreTable () {
    var table = $('<table id="score"></tabla>');
    var header = '<th>JUGADOR</th><th>NIVEL</th><th>INTENTOS</th>';
    table.append(header);  
    
    let containerTable = $('div.score-table');
    containerTable.append(table);
    renderPlayers(); 
    
}
// Adds the score depending on the amount of moves done
function renderPlayers() {  
    
    // here we sort de array According to the number of moves made.
    var sortByBcore = function (score1, score2) {
        if(score1.playerAttempts < score2.playerAttempts) return -1;
        if(score1.playerAttempts > score2.playerAttempts) return 1;
        return 0;
    }
    players.sort(sortByBcore)
    var superScoreTable = $("#score");
      
    for (let i = 0; i < players.length; i++) {  
        var fila = $('<tr class="fila"></tr>');

        var tdPlayer = "<td>" + players[i].playerName +"</td>";
        var tdLevel = "<td>" + players[i].playerLevel +"</td>";
        var tdScore = "<td>" + players[i].playerAttempts +"</td>";      
        
        fila.append(tdPlayer);
        fila.append(tdLevel);
        fila.append(tdScore);
        superScoreTable.append(fila);
    }    
}


createTable();

// the end! sorry for my english, i´m learning.



