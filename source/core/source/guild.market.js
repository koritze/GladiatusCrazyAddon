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
			// Change price to 1
			document.getElementById('preis').value = "1";
			
			// document.head.innerHTML += '<script type="text/javascript"> function marketDrop2(d,a){marketDrop(d,a);} </script>';
			document.getElementById('market_sell').childNodes[1].attributes['data-request-function'].value = "marketDrop2";
			/*function marketDrop2(d,a){
				marketDrop(d,a);
				document.getElementById('preis').value = "1";
			}*/
			// document.head.innerHTML += '<script>function marketDrop2(d,a){var c=jQuery("#sellForm");jQuery(\'[name="sellid"]\',c).val(d.data("itemId"));var b=d.data("priceGold")||0;jQuery(\'[name="preis"]\',c).val("1");calcDues()}</script>';
			
			// function marketDrop(d,a){var c=jQuery("#sellForm");jQuery('[name="sellid"]',c).val(d.data("itemId"));var b=d.data("priceGold")||0;jQuery('[name="preis"]',c).val("1");calcDues()};
			//function marketDrop2(d,a){var c=jQuery("#sellForm");jQuery('[name="sellid"]',c).val(d.data("itemId"));var b=d.data("priceGold")||0;jQuery('[name="preis"]',c).val("1");calcDues()}
		}
	}
};

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