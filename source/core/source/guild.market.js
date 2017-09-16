/*
 * Addon Guild Market Script
 * Author: DarkThanos, GreatApo
 */

// Guild Market
var gca_guild_market = {
	inject : function(){
		// If Market page
		if (gca_section.submod == null) {
			// Medic Layout improve
			//(gca_options.bool("guild","medic_layout") && 
				this.layout.improve();//);
				
		}
	},
	
	// Layout Improvements
	layout : {
		improve : function(){
			var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
			
			document.getElementById('sellForm').innerHTML += '<input type="button" value="Sell next" class="awesome-button " onClick="sellNext();return false">';
			document.getElementById('sellForm').innerHTML += '<input id="cancel_all_button" type="button" value="Cancel all" class="awesome-button " onClick="cancelAll();return false">';
			
			//document.getElementById('sellForm').innerHTML += '<input type="button" value="Sell all" class="awesome-button " onClick="sellAll()">'; // TODO
			
			// Deprecated
			// document.getElementById('market_sell').childNodes[1].attributes['data-request-function'].value = "marketDrop2"; // Immediate sell on 1 at drop, use sell next instead.
			// document.getElementById('sellForm').innerHTML += '<input type="button" value="Cancel next" class="awesome-button " onClick="cancelNext();return false">'; // Use cancel all instead
			// document.getElementById('preis').value = "1"; // Change price to 1
		}
	}
};

/*function sellAll() {
	// document.getElementById('sellForm').setAttribute("onsubmit", 'return false;');
	$childrens = $("#inv").children();
	for (i = 0; i < $childrens.length; i++) {
		marketDrop2($childrens.eq(i), 1);
	}
}*/

function sellNext() {
	marketDrop2($("#inv").children(),1);
}

function cancelNext() {
	var allitems = document.getElementById("market_item_table").getElementsByTagName('form');
	for (var i = allitems.length - 1; i >= 0; i--) {
		if(allitems[i].elements["cancel"]){
			allitems[i].elements["cancel"].click();
		}
	}
}

function cancelAll() {
	var allitems = document.getElementById("market_item_table").getElementsByTagName('form');
	var myitems_data = [];
	var cancel = "";
	for (var i = allitems.length - 1; i >= 0; i--) {
		if(allitems[i].elements["cancel"]){
			myitems_data.push(allitems[i].elements["buyid"].value);
			cancel = allitems[i].elements["cancel"].value;
		}
	}

	var x = allitems.length;
	var mytottalitems = myitems_data.length;

	if(mytottalitems!=0){
		cansel = encodeURIComponent(cancel);
		document.getElementById('cancel_all_button').value = '0 / '+mytottalitems+' (0%)';
		
		for (var i = myitems_data.length - 1; i >= 0; i--) {
			var httpReq = new XMLHttpRequest()
			httpReq.open("POST", document.location.href, true);
			httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpReq.onload = function(response){
				var myitems = document.getElementById('cancel_all_button').value.match(/(\d+)/gi)[0]*1;
				myitems++;
				document.getElementById('cancel_all_button').value = myitems+' / '+mytottalitems+' ('+(Math.round(myitems/mytottalitems)*100)+'%)';
				if(myitems==mytottalitems){
					document.location.href=document.location.href;
				}
			}
			
			httpReq.send('buyid='+myitems_data[i]+'&cancel='+cancel);
		}
	}
}

function marketDrop2(d,a){
	marketDrop(d,a);
	document.getElementById('preis').value = "1";
	calcDues();
	document.getElementById('sellForm')[3].click();
}

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_guild_market.inject();
	}
	
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();