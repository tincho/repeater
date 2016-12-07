// this is just a mockup tool
// please tin dont waist your time trying to create a mini-angular

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    return this;
};


var rbs = document.querySelectorAll("[data-repeat]");
[].forEach.call(rbs, RepeatElement);

function RepeatElement(rb) {
    var lastb = rb;
    var times = rb.attributes.getNamedItem("data-repeat").value;
    for (var i=0; i < times; i++) {
		var newb = lastb.cloneNode(true);
		newb.appendAfter(lastb);
	}
}
