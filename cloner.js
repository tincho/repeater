/**
 * @author tin <tin@nuku.com.ar>
 * @license MIT
 */

/**
 * from stack overflow answer
 * a shortcut for non-native dom handling
 */
Element.prototype.appendAfter = function(element) {
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
    return this;
};

/**
 * Creates element based in template
 * designed to use with map/reduce in the context of RepeatElement
 * but since has evolved and can be now used separately
 * @usage
 * var cloneElement = new Cloner(templateEl [, postCreate]);
 * cloneElement(insertAfter [, fillData]); // fillData is passed to postCreate as "data"
 */
function Cloner(template) {
    var postCreate =
        (typeof arguments[1] === 'function') ?
        arguments[1] :
        function(data) {
            if (typeof data === 'undefined') return;
            return this.fillWith(data);
        }

    return (function(after) {
        var newE = template.cloneNode(true);
        postCreate.apply(newE, [].slice.call(arguments, 1));

        // maybe we dont want to automatically append the new element
        // so just do it if element is provided
        if (Element.prototype.isPrototypeOf(after)) {
            newE.appendAfter(after);
        }

        // when using reduce, each iteration's return will be first argument of next
        // so the newly created element will be "after" param
        return newE;
    }).bind({template: template});
};
