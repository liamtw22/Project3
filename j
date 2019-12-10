<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        $("button").click(function(){
            var result = "";
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

   });
});
result = "";
win = 5;
newDeck();