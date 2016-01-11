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
        else if (pwd == "trevorneverwins") {
            $('.btn').removeClass('disabled');
        }
        else {
            $('.btn').addClass('disabled');
        }
    });
}

$('.btn').addClass('disabled');
$(document).ready(main);