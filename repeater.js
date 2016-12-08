/**
 * from stack overflow
 * a shortcut for non-native dom handling
 */
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    return this;
};

/**
 * replaces variables in element innerHTML, e.g.
 * DOM: <span id="fillMe">hey {{#}}, whats up {{#}}</span>
 * Code: document.querySelector('#fillMe').fillWith('bro')
 * Output: hey bro, whats up bro
 *
 * DOM: <span id="fillMe">the {{animal}} is sitting at the {{forniture}}</span>
 * Code: document.querySelector('#fillMe').fillWith({'animal': 'cat', 'forniture': 'table'});
 * Output: the cat is sitting at the table
 */
Element.prototype.fillWith = function(data) {
    var content = this.innerHTML;
    if (typeof data !== 'object') {
        data = {'#': data};
    }
    Object.keys(data).forEach(function(k) {
        var exp = new RegExp('\{\{' + k + '\}\}', 'g');
        content = content.replace(exp, data[k]);
    });
    this.innerHTML = content;
};

/**
 * wraps string with given chars if not already wrapped
 */
String.prototype.wrap = function(begin, end) {
    return this
        .replace(new RegExp("^([^\\"+begin+"])"),  begin + "$1")
        .replace(new RegExp( "([^\\"+ end +"])$"), "$1" + end);
};

// init
[].forEach.call(document.querySelectorAll("[data-repeat]"), RepeatElement);

/**
 * core method
 */
function RepeatElement(template) {
    var dataRepeat = template.attributes.getNamedItem("data-repeat").value;
    var items = [];
    if (!isNaN(dataRepeat)) {
        // create empty array with N elements that can be used with map
        // (also from a stackoverflow answer!)
        items = Array.apply(null, Array(parseInt(dataRepeat)));
    } else {
        items = eval(dataRepeat.wrap('(',')'));
        // wrap in array if eval'd is plain value so we can always use map
        if(!Array.prototype.isPrototypeOf(items)) {
            items = [items];
        }
    }

    var lastE = template;
    var createdNodes = items.map(CreateElement);
    template.remove();

    function CreateElement(item) {
        var newE = template.cloneNode(true);
        if (typeof item !== 'undefined') {
            newE.fillWith(item);
        }
        lastE = newE.appendAfter(lastE);
        return lastE;
    };
}
