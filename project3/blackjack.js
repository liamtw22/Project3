var deckID;
var playerHand = [];
var dealerHand = [];

var currPlayerCard = 0;
var currDealerCard = 0;

var dealerHoldCard;

var proceed = true;

var countHand = function(cardArray)
{
	var sum = 0;
		
	for (var i = 0; i < cardArray.length; i++) 
	{
		sum += parseInt(cardArray[i], 10);
	}
		
	if (sum > 21)
	for (var i = 0; i < cardArray.length; i++) 
	{
		if(cardArray[i] == 11 && sum > 21)
		{
			sum = sum - 10;
		}
	}
	return sum;
}

var newDeck = function()
{
    playerHand = [];
    dealerHand = [];

    currPlayerCard = 0;
    currDealerCard = 0;

    document.getElementById("playerTotal").innerHTML = "Player: ";
    document.getElementById("dealerTotal").innerHTML = "Dealer: ";

    document.getElementById("player0").style.display='none';
    document.getElementById("player1").style.display='none';
    document.getElementById("player2").style.display='none';
    document.getElementById("player3").style.display='none';
    document.getElementById("player4").style.display='none';
    document.getElementById("player5").style.display='none';
    document.getElementById("player6").style.display='none';

    document.getElementById("dealer0").style.display='none';
    document.getElementById("dealer1").style.display='none';
    document.getElementById("dealer2").style.display='none';
    document.getElementById("dealer3").style.display='none';
    document.getElementById("dealer4").style.display='none';
    document.getElementById("dealer5").style.display='none';
    document.getElementById("dealer6").style.display='none';

    document.getElementById("finalOutcome").innerHTML = "";
    document.getElementById("Stand").disabled = false;
    document.getElementById("Hit").disabled = false;
    document.getElementById("NewGame").disabled = true;

    proceed = true;

    var request = new XMLHttpRequest();

    request.open("GET","https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", true);

    request.onload = function() 
    {
        var data = JSON.parse(this.response);
        deckID = data.deck_id;
    };
    request.send();

    setTimeout(drawPlayerCard, 1000);
    setTimeout(drawPlayerCard, 1500);
    setTimeout(drawDealerCard, 2000);
    setTimeout(drawDealerCard, 2500);
    setTimeout(enableNewGameButton, 3000);
}

var enableNewGameButton= function()
{
    document.getElementById("NewGame").disabled = false;
}

var drawPlayerCard = function()
{
    var url = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";
    console.log(url);

    var request = new XMLHttpRequest();

    request.open("GET","https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1", true);

    request.onload = function() 
    {
        var data = JSON.parse(this.response);
        var deal = data.cards
        for (var i = 0; i < deal.length; i++) 
        {
            var cardValue = deal[i].value;
            var cardCode = deal[i].code;
        }
        
        var i = 0;
        for (i = 0; i < playerHand.length; i++)
        {

        }

        if(cardValue == "JACK" || cardValue == "QUEEN" || cardValue == "KING")
        {
            playerHand[i] = 10;
        }
        else
        if(cardValue == "ACE")
        {
            playerHand[i] = 11;
        }
        else
        {
            playerHand[i] = cardValue;
        }

        //testing code
        for (i = 0; i < playerHand.length; i++)
        {
            console.log("player hand " + i + ": " + playerHand[i]);
        }
        console.log("player value: " + countHand(playerHand));

        console.log("currPlayerCard: " + currPlayerCard);
        console.log("card code is: " + cardCode);
        document.getElementById("player" + currPlayerCard + "").style.display='block';
        document.getElementById("player" + currPlayerCard + "").src = "https://deckofcardsapi.com/static/img/" + cardCode + ".png";
        document.getElementById("player" + currPlayerCard + "").alt = cardCode;

        var playerTot = " " + countHand(playerHand);
        document.getElementById("playerTotal").innerHTML = "Player:" + playerTot;
        currPlayerCard++;
    };
    request.send();
}

var drawDealerCard = function()
{
    var url = "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1";
    console.log(url);

    var request = new XMLHttpRequest();

    request.open("GET","https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1", true);

    request.onload = function() 
    {
        var data = JSON.parse(this.response);
        var deal = data.cards
        for (var i = 0; i < deal.length; i++) 
        {
            var cardValue = deal[i].value;
            var cardCode = deal[i].code;
        }

        var i;
        for (i = 0; i < dealerHand.length; i++)
        {

        }
        
        if(cardValue == "JACK" || cardValue == "QUEEN" || cardValue == "KING")
        {
            dealerHand[i] = 10;
        }
        else
        if(cardValue == "ACE")
        {
            dealerHand[i] = 11;
        }
        else
        {
            dealerHand[i] = cardValue;
        }

        //testing code
        for (i = 0; i < dealerHand.length; i++)
        {
            console.log("dealer hand " + i + ": " + dealerHand[i]);
        }
        console.log("dealer value: " + countHand(dealerHand));
        
        if(currDealerCard == 0)
        {
            dealerHoldCard = cardCode;
            document.getElementById("dealerTotal").innerHTML = "Dealer: " + 0;
            document.getElementById("dealer" + currDealerCard + "").src = "images/back_of_card.png";
            document.getElementById("dealer" + currDealerCard + "").style.display='block';
        }
        else
        if (currDealerCard == 1)
        {
            document.getElementById("dealerTotal").innerHTML = "Dealer: " + dealerHand[1];
            document.getElementById("dealer" + currDealerCard + "").src = "https://deckofcardsapi.com/static/img/" + cardCode + ".png";
            document.getElementById("dealer" + currDealerCard + "").style.display='block';
            document.getElementById("dealer" + currDealerCard + "").alt = cardCode;
        }
        else
        {
            document.getElementById("dealerTotal").innerHTML = "Dealer: " + countHand(dealerHand);
            document.getElementById("dealer" + currDealerCard + "").src = "https://deckofcardsapi.com/static/img/" + cardCode + ".png";
            document.getElementById("dealer" + currDealerCard + "").style.display='block';
            document.getElementById("dealer" + currDealerCard + "").alt = cardCode;
        }
        
        currDealerCard++;
    };
    request.send();
}

var hit = function()
{
    if(countHand(playerHand) < 21)
    {
        drawPlayerCard();
    }

    setTimeout(checkPlayerHand, 1000);
}

var checkPlayerHand = function()
{
    if(countHand(playerHand) == 21)
    {
        document.getElementById("Hit").disabled = true;
    }

    if(countHand(playerHand) > 21)
    {
        document.getElementById("finalOutcome").innerHTML = "Your total exceeds 21. You lose.";
        document.getElementById("Stand").disabled = true;
        document.getElementById("Hit").disabled = true;
    }
}

var stand = function()
{
    document.getElementById("NewGame").disabled = true;
    //turn over dealer's hole card
    document.getElementById("dealer0").src = "https://deckofcardsapi.com/static/img/" + dealerHoldCard + ".png";
    document.getElementById("dealer0").alt = dealerHoldCard;
    document.getElementById("dealer0").style.display='block';
    document.getElementById("dealerTotal").innerHTML = "Dealer: " + countHand(dealerHand);

    if(countHand(dealerHand) >= 17)
    {
        if(countHand(dealerHand) == countHand(playerHand))
        {
            document.getElementById("finalOutcome").innerHTML = "Both your hand and the dealer's hands total " + countHand(dealerHand) + ". It's a tie.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
        else
        if(countHand(dealerHand) > countHand(playerHand))
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's hand is greater than your hand, which totaled " + countHand(playerHand) + ". You lose.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
        else
        if(countHand(playerHand) > countHand(dealerHand))
        {
            document.getElementById("finalOutcome").innerHTML = "Your hand, which totaled " + countHand(playerHand) + ", is greater than the dealer's hand. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
    }

    if(countHand(dealerHand) < 17)
	{
        console.log("Here: " + countHand(dealerHand));
        drawDealerCard();
        console.log("Here after draw card: " + countHand(dealerHand));

        if(countHand(dealerHand) > 21)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's total exceeds 21. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
        else
        if(countHand(dealerHand) == countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Both your hand and the dealer's hands total " + countHand(dealerHand) + ". It's a tie.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;     
        }
        else
        if(countHand(dealerHand) > countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's hand is greater than your hand, which totaled " + countHand(playerHand) + ". You lose.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;       
        }
        else
        if(countHand(playerHand) > countHand(dealerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Your hand, which totaled " + countHand(playerHand) + ", is greater than the dealer's hand. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }

        setTimeout(dealerLessSeventeen, 2000);
        setTimeout(dealerLessSeventeen, 4000);
        setTimeout(dealerLessSeventeen, 6000);
        setTimeout(dealerLessSeventeen, 8000);
    }
    
    setTimeout(dealerOtherOutcome, 10000);
    setTimeout(enableNewGame, 11000);
}

var dealerLessSeventeen = function()
{
    if(countHand(dealerHand) < 17)
    {
        console.log("Here2:" + countHand(dealerHand));
        drawDealerCard();

        if(countHand(dealerHand) > 21)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's total exceeds 21. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
        else
        if(countHand(dealerHand) == countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Both your hand and the dealer's hands total " + countHand(dealerHand) + ". It's a tie.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;     
        }
        else
        if(countHand(dealerHand) > countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's hand is greater than your hand, which totaled " + countHand(playerHand) + ". You lose.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;       
        }
        else
        if(countHand(playerHand) > countHand(dealerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Your hand, which totaled " + countHand(playerHand) + ", is greater than the dealer's hand. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }  
    }
    if(countHand(dealerHand) >= 17)
    {
        dealerOtherOutcome();
    }
}

var dealerOtherOutcome = function()
{
    if (proceed == true)
    {
        if(countHand(dealerHand) > 21)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's total exceeds 21. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }
        else
        if(countHand(dealerHand) == countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Both your hand and the dealer's hands total " + countHand(dealerHand) + ". It's a tie.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;     
        }
        else
        if(countHand(dealerHand) > countHand(playerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "The dealer's hand is greater than your hand, which totaled " + countHand(playerHand) + ". You lose.";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;       
        }
        else
        if(countHand(playerHand) > countHand(dealerHand) && countHand(dealerHand) >= 17)
        {
            document.getElementById("finalOutcome").innerHTML = "Your hand, which totaled " + countHand(playerHand) + ", is greater than the dealer's hand. You win!";
            document.getElementById("Stand").disabled = true;
            document.getElementById("Hit").disabled = true;
            proceed = false;
        }  
    }
}

var enableNewGame = function()
{
    document.getElementById("NewGame").disabled = false;
}

