var specialConsole = (function () {

    function hasPlaceholders(args) {
        if (args.length > 1) {
            return true;
        }
    }

    function replacePlaceholders(args) {
        var placeholderData = [];
        var resultString = args[0];

        for (var i = 0; i < args.length - 1; i++) {
            placeholderData[i] = args[i + 1];
        }

        for (var j = 0; j < placeholderData.length; j++) {
            var token = "\\{" + j + "\\}";
            var regex = new RegExp(token, "g");
            resultString = resultString.replace(regex, placeholderData[j]);
        }

        return resultString;
    }

    function prepareMessage(args) {
        var message = "";

        if (hasPlaceholders(args)) {
            message = replacePlaceholders(args);
        }
        else {
            message = args[0];
        }

        return message;
    }

    function writeLine() {
        var message = prepareMessage(arguments);
        console.log(message);
    }

    function writeError() {
        var message = prepareMessage(arguments);
        console.error(message);
    }

    function writeWarning() {
        var message = prepareMessage(arguments);
        console.warn(message);
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning
    }
})();