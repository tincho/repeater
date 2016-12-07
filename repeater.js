// this is just a mockup tool
// please tin dont waist your time trying to create a mini-angular

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    return this;
};


[].forEach.call(document.querySelectorAll("[data-repeat]"), RepeatElement);

function RepeatElement(rb) {
    var dataRepeat = rb.attributes.getNamedItem("data-repeat").value;
    var items = [];
    if (!isNaN(dataRepeat)) {
        items = Array(parseInt(dataRepeat));
    }

    var lastb = rb;
    var createdNodes = [].apply(null, items).map(function(item) {
        var newb = lastb.cloneNode(true);
        // in the future, do anything here with newb (item, lastb)
        lastb = newb.appendAfter(lastb);
        return lastb;
    });
    // and what do we do with createdNodes? 
}
