/**
 * @author tin <tin@nuku.com.ar>
 * @requires cloner.js
 * @license MIT
 */

 /**
  * wraps string with given chars if not already wrapped
  */
 String.prototype.wrap = function(begin, end) {
     return this
         .replace(new RegExp("^([^\\"+begin+"])"),  begin + "$1")
         .replace(new RegExp( "([^\\"+ end +"])$"), "$1" + end);
 };

/**
 *
 */
Element.prototype.repeat = function RepeatElement() {
    var items = MakeItemsArray(this.attributes.getNamedItem("data-repeat").value);
    if ( items.length === 0 ) {
        return;
    }
    this.attributes.removeNamedItem('data-repeat');
    var Clone = new Cloner(this);

    // its important to explicitly initialize with template given the nature of reduce
    var last = items.reduce(Clone, this);

    // always remove template?
    this.remove();
    return last;

    /**
     *
     */
    function MakeItemsArray(value) {
        if (!isNaN(value)) {
            // if numeric value is provided e.g data-repeat="4"
            // create empty array with N elements that can be used with map/reduce
            // (also from a stackoverflow answer!)
            return Array.apply(null, Array(parseInt(value)));
        }

        var data = eval(value.wrap('(',')'));
        // wrap in array if eval'd is plain value so we can always use map/reduce
        if(!Array.prototype.isPrototypeOf(data)) {
            data = [data];
        }
        return data;
    };
};

// init
[].forEach.call(document.querySelectorAll("[data-repeat]"), callMethod('repeat'));
//var repeatElements = [].slice.call(document.querySelectorAll("[data-repeat]"));
//repeatElements.forEach(callMethod('repeat'));
// also using [...].map(callMethod('repeat'));
// we'd get an array with the last created element of each group

/**
 * lets get functional...
 */
function callMethod(methodName) {
    return function(obj) {
        return obj[methodName].apply(obj);
    }
};
