// this is just a mockup tool
// please tin dont waist your time trying to create a mini-angular

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    return element;
};


var rbs = document.querySelectorAll("[data-repeat]");

for(var j = 0; j < rbs.length; j++) {
    var rb = rbs.item(j);
    var nodes = [rb];
    var times = rb.attributes.getNamedItem("data-repeat").value;
    for (var i=0; i < times; i++) {
        var lastb = nodes[i];
		var newb = rb.cloneNode(true);
		newb.appendAfter(lastb);
		nodes[i+1] = newb;
	}
}
