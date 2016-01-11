
$.getScript("sparkle.js", function(){

});

var main = function() {
    $('.btn').click( function() {	
		document.location.href = "sheet.html";
    });
    
    $('.status-box').keyup( function() {
        var postLenght = $(this).val().length;
		var pwd = $(this).val();
        var charactersLeft = 140 - postLenght;
        $('.counter').text(charactersLeft);
        if(charactersLeft <= 0)
        {
            $('.btn').addClass('disabled');
        }
        else if (majortom(pwd) == "41d12b1502f8836ea2b7d45678f7572f") {
            $('.btn').removeClass('disabled');
        }
        else {
            $('.btn').addClass('disabled');
        }
    });
}


$('.btn').addClass('disabled');
$(document).ready(main);