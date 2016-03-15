var controls = function () {
    function treeView(wrapper) {
        var items;
        var element;

        if (wrapper.indexOf(".") != -1) {
            items = wrapper.split('.');
            element = document.createElement(items[0]);
            element.setAttribute('class', items[1]);
        }
        else if (wrapper.indexOf("#") != -1) {
            items = wrapper.split('#');
            element = document.createElement(items[0]);
            element.setAttribute('id', items[1]);
        }
        else {
            element = document.createElement(wrapper);
        }

        element.appendChild(document.createElement("ul"));
        document.body.appendChild(element);
        return element;
    }

    function createClickEvents() {
        $("li").addClass('childrenInvisible');

        $("li").click(function (e) {
            e.stopPropagation();

            if ($(this).hasClass('childrenVisible')) {
                $(this).removeClass('childrenVisible').addClass('childrenInvisible');
            }
            else {
                $(this).removeClass('childrenInvisible').addClass('childrenVisible');
            }
        });
    }

    HTMLElement.prototype.addNode = function (str) {
        var list = this.querySelector("ul");
        var item = document.createElement("li");

        if (list != null) {
            list.appendChild(item);
        }
        else {
            list = document.createElement("ul");
            list.appendChild(item);
            this.appendChild(list);
        }

        return item;
    }

    HTMLElement.prototype.content = function (str) {
        this.innerHTML = "<a href='#'>" + str + "</a>";
    }

    return {
        treeView: treeView,
        createClickEvents: createClickEvents
    }
}();

var treeView = controls.treeView("div.tree-view");

var jsnode = treeView.addNode();
jsnode.content("JavaScript");

var js1subnode = jsnode.addNode();
js1subnode.content("JavaScript - part 1");

var js2subnode = jsnode.addNode();
js2subnode.content("JavaScript - part 2");

var jslibssubnode = jsnode.addNode();
jslibssubnode.content("JS Libraries");

var jsframeworksnode = jsnode.addNode();
jsframeworksnode.content("JS Frameworks and UI");

var webnode = treeView.addNode();
webnode.content("Web");

controls.createClickEvents();