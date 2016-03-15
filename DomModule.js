var domModule = (function () {
    var appendChild = function (childType, selector) {
        document.querySelector(selector).appendChild(childType);
    }

    var removeChild = function (parent, selector) {
        var elementSelector = parent + " " + selector;
        var childs = document.querySelectorAll(elementSelector);

        for (var i = 0; i < childs.length; i++) {
            childs[i].parentNode.removeChild(childs[i]);
        }
    }

    var addHandler = function (selector, type, handler) {
        var elements = document.querySelectorAll(selector);
        var useCapture = false;
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(type, handler, useCapture);
        }
    }

    var buffer = [];
    var BUFFER_MAX_SIZE = 5;

    var flushBuffer = function () {
        for (var i = 0; i < buffer.length; i++) {
            var parent = buffer[i].parent;
            var element = buffer[i].element;
            parent.appendChild(element);
        }
        buffer = [];
    }

    var appendToBuffer = function (selector, element) {
        var parent = document.querySelector(selector);
        buffer.push({ parent: parent, element: element });

        if (buffer.length === BUFFER_MAX_SIZE) {
            flushBuffer();
        }
    }

    return {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        appendToBuffer: appendToBuffer
    }
})();