var points = parseInt($('.resume').text());
var pointExpended = 0;
var pipe = 0;

/*ricorsivamente ritorna il costo di un intero ramo dell'albero dello skilltree*/
var add_checker = function(current_node) {
	
	var parent_node = current_node.parent().parent().parent().children('.inactive-node');
	if(parent_node.length != 0)
	{
		return parseInt(current_node.children('.info').children('.cost').text())+add_checker(parent_node); 
	}
	else {
		return parseInt(current_node.children('.info').children('.cost').text());
	}
	
};

var click_handler = function(evt,current_node) {


		$('.dropdown-menu').hide();
		$('.dropdown-menu').removeClass('active-dropdown-menu');

		var cost = parseInt(current_node.children('.info').children('.cost').text());

		if(current_node.hasClass('active-node')) {
//l'abilità viene rimossa
			current_node.addClass('inactive-node');
			current_node.removeClass('active-node');
			pointExpended = pointExpended - cost;
			$('.resume').text(points-pointExpended);
			var child_node = current_node.parent().children('ul').children('li').children('.active-node');

			if(child_node.length != 0) {
				child_node.each(function(evt) { click_handler(evt, $(this))});
			}
		}
		else {
//l'abilità viene comprata
			var parent_node = current_node.parent().parent().parent().children('.inactive-node');
			var parent_node_add = current_node.children('.add_parent');
			var parent_node_alt = current_node.children('.alt_parent');
			var parent_cost = 0;
			var add_parent_cost = 0;
			if(parent_node.length != 0) {
				parent_cost = add_checker(parent_node) + cost + pointExpended;
				/* controlla la presenza eventuali parenti alternativi e se è possibile aggiungerli*/
				if(parent_node_add.length != 0)
				{
					add_parent_cost = 0;
					parent_node_alt.each(function(evt) {
						add_parent_cost = add_parent_cost + add_checker(getElementById($(this).text()))
					});
					alert("debug");
				}
				if(points-(parent_cost+add_parent_cost) < 0) {
					alert("Stai chiedendo troppo cittadino, non hai piu' punti.");
					return;
				}
				else {
					click_handler(evt,parent_node);
				}
			}
			if(points-(cost + pointExpended) < 0)
			{
				window.alert("Stai chedendo troppo cittadino, non hai piu' punti.");
					return;
			} else {
				pointExpended = pointExpended + cost;
				$('.resume').text(points-pointExpended);
				current_node.addClass('active-node');
				current_node.removeClass('inactive-node');
			}
		}
	};

var main = function() {

// Gestione delle finestre dropdown delle descrizioni
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
 
 //gestione dei nodi
	$('.node').click(function (evt) { click_handler(evt,$(this))});
	
};


$(document).ready(main);