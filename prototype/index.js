function Csv() {

}

Csv.prototype.parse = function(string, separator) {
    var separators = ['\,', '\.', '\t'];
    var allRows = string.split(/\r?\n|\r/);

    if (!separator) {
        separators.forEach(function(elem) {
            if ((allRows[0].match(new RegExp(elem)) || []).length > 0 && (allRows[0].match(new RegExp(elem)) || []).length == (allRows[0].match(new RegExp(elem)) || []).length) {
                separator = elem;
            }
        });
    }

    return allRows.map(item => item.split(separator));
};

Csv.prototype.generate = function(array, separator) {};