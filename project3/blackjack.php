<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = 'newpassword';
$DATABASE_NAME = 'phplogin';
// Try and connect using the info above.
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {
	// If there is an error with the connection, stop the script and display the error.
	die ('Failed to connect to MySQL: ' . mysqli_connect_error());
}
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.html');
    
	exit();
}
$stmt = $con->prepare('SELECT wins,loss,tie FROM accounts WHERE id = ?');
// In this case we can use the account ID to get the account info.
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($wins, $loss,$tie);
$stmt->fetch();
$stmt->close();
?>

<html>

    <head>
        <script src="blackjack.js"></script>
        <link rel="stylesheet" href="mystyles.css">
    </head>

    <body>
      
        <h1 id = "heading">BLACKJACK</h1>
        <div id="table">
            <br>
            <script>
    var wins = <?php echo $wins ?>;
    var losses = <?php echo $loss ?>;
    var ties = <?php echo $tie ?>;
    </script>
            <h1 id="finalOutcome">
            Welcome <?=$_SESSION['name']?>, You have: <script type="text/javascript">
        document.write(wins)
      </script> Wins,
      <script type="text/javascript">
        document.write(losses)
      </script> Losses,
      <script type="text/javascript">
        document.write(ties)
      </script> Ties

            </h1>
            <br>
            <br>
        
</br>
            <h3 id="dealerTotal">Dealer: </h3>

            <div id = "hand">
            <figure>
            <img id="dealer0" src="" alt="">
            <img id="dealer1" src="" alt="">
            <img id="dealer2" src="" alt="">
            <img id="dealer3" src="" alt="">
            <img id="dealer4" src="" alt="">
            <img id="dealer5" src="" alt="">
            <img id="dealer6" src="" alt="">
            </figure>
            </div>

            <br>
            <h3 id="playerTotal">Player: </h3>

            <div id = "hand">
            <figure>
            <img id="player0" src="" alt="">
            <img id="player1" src="" alt="">
            <img id="player2" src="" alt="">
            <img id="player3" src="" alt="">
            <img id="player4" src="" alt="">
            <img id="player5" src="" alt="">
            <img id="player6" src="" alt="">
            </figure>
            </div>
            
            <button id="Hit" class="newGame" disabled=true onclick="hit();">Hit</button>
            <button id="Stand" class="newGame" disabled=true onclick="stand();">Stand</button>
            <br>
            <button id="NewGame" class="newGame" onclick="newDeck();">New Game</button>
            <br><br><br>
            <div class = "buttonHref">
            <a href="leaderboard.php"><i class="fas fa-user-circle"></i>Profile</a>
            <a href ="logout.php"> <i class="fas fa-user-circle"></i>Logout</a>
            <br>
            
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<script type="text/javascript">
    $(document).ready(function(){
        $("button").click(function(){
       
            var result = "";
            console.log(getWin());
            if(getWin()==1){
            result = "win.php";
            
            }
            if(getWin()==0){
             result = "tie.php"
             
            }
            if(getWin()==-1){
                result = "loss.php"
                
            }
            $.ajax({
                type: 'POST',
                url: result,
              
            });
result = "";
win = 5;
   });
 
});
</script>
            <br>
            <br>
        </div>

    </body>

</html>
