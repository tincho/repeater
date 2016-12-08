/**
 * from stack overflow
 * a shortcut for non-native dom handling
 */
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    return this;
};

[].forEach.call(document.querySelectorAll("[data-repeat]"), RepeatElement);

/**
 * core method
 */
function RepeatElement(rb) {
    var dataRepeat = rb.attributes.getNamedItem("data-repeat").value;
    var items = [];
    if (!isNaN(dataRepeat)) {
        // create empty array with N elements that can be used with map
        // (also from a stackoverflow answer!)
        items = Array.apply(null, Array(parseInt(dataRepeat)));
    } else {
        items = eval(preEval(dataRepeat));
        // wrap in array if eval'd is plain value so we can always use map
        if(!Array.prototype.isPrototypeOf(items)) {
            items = [items];
        }
    }

    var lastb = rb;
    var createdNodes = items.map(CreateElement);
    rb.remove();

    function CreateElement(item) {
        var newb = rb.cloneNode(true);
        Fill(newb, item);
        lastb = newb.appendAfter(lastb);
        return lastb;
    };

    function Fill(element, data) {
        var content = element.innerHTML;
        if (typeof data !== 'object') {
            data = {'#': data};
        }
        Object.keys(data).forEach(function(k) {
            var exp = new RegExp('\{\{' + k + '\}\}', 'g');
            content = content.replace(exp, data[k]);
        });
        element.innerHTML = content;
    };
}

/**
 * wraps string in parenthesis if not already wrapped
 */
function preEval(str) {
    return str.replace(/^([^\(])/,"($1").replace(/([^\)]$)/,"$1)");
}
