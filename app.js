var points = parseInt($('.resume').text());
var pointExpended = 0;

var add_checker = function(current_node) {
	
	var parent_node = current_node.parent().parent().parent().children('.inactive-node');
	if(parent_node.length != 0)
	{
		return parseInt(current_node.children('.info').children('.cost').text())+add_checker(parent_node); 
	}
	else {
		return parseInt(current_node.children('.info').children('.cost').text());
	}
	
}

var click_handler = function(evt,current_node,mode) {
		
		
		$('.dropdown-menu').hide();
		$('.dropdown-menu').removeClass('active-dropdown-menu');
		
		var cost = parseInt(current_node.children('.info').children('.cost').text());
		
//		alert(mode+' '+current_node.children('a').text());
		
		if(current_node.hasClass('active-node')) {
//l'abilità viene rimossa
			current_node.addClass('inactive-node');
			current_node.removeClass('active-node');
			pointExpended = pointExpended - cost;
			$('.resume').text(points-pointExpended);
			var child_node = current_node.parent().children('ul').children('li').children('.active-node');
			var child_node_container = current_node.parent().children('ul').children('li');

			if(child_node.length != 0) {
				child_node.each(function(evt) { click_handler(evt, $(this), mode )})
//				click_handler(evt,child_node,"remove");
			}
		}
		else {
//l'abilità viene comprata
			var parent_node = current_node.parent().parent().parent().children('.inactive-node');
			if(parent_node.length != 0) {
				if(points-(add_checker(parent_node) + cost + pointExpended) < 0) {
					alert("Limite dei punti superato");	
					return;
				}
				else {
					click_handler(evt,parent_node,"add");
				}
			}
			if(points-(cost + pointExpended) < 0)
			{
				alert("Limite dei punti superato");	
					return;
			} else {
				pointExpended = pointExpended + cost;
				$('.resume').text(points-pointExpended);
				current_node.addClass('active-node');
				current_node.removeClass('inactive-node');
			}
		}
	}

var main = function() {

	$('.dropdown-toggle').click( function(evt) {
		
		evt.stopPropagation();
		var current_description = $(this).parent().find('.dropdown-menu');
		
		$('.dropdown-menu').hide();
		if(current_description.hasClass('active-dropdown-menu'))
		{
			current_description.removeClass('active-dropdown-menu');
		} else {
			current_description.addClass('active-dropdown-menu');
			current_description.slideToggle();
		}
    });
 	
	$('.node').click(function (evt) { click_handler(evt,$(this),"begin")});
	
	$('.resume').scroll(function() { 
		$('#FixedDiv').css('top', $(this).scrollTop());
	});
};


$(document).ready(main);