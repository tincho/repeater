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
        // create empty array with N elements that can be used with map/reduce
        // (also from a stackoverflow answer!)
        items = Array.apply(null, Array(parseInt(dataRepeat)));
    } else {
        items = eval(dataRepeat.wrap('(',')'));
        // wrap in array if eval'd is plain value so we can always use map/reduce
        if(!Array.prototype.isPrototypeOf(items)) {
            items = [items];
        }
    }
    template.attributes.removeNamedItem('data-repeat');

    CreateElement.template = template;
    items.reduce(CreateElement, template);
    template.remove();
};

/**
 * Creates element based in template (stored as self function property)
 * designed to use with map/reduce in the context of RepeatElement
 * but since has evolved and can be now used separately
 */
function CreateElement(after, data) {
    var newE = CreateElement.template.cloneNode(true);
    if (typeof data !== 'undefined') {
        newE.fillWith(data);
    }
    newE.appendAfter(after);
    return newE;
};
