function Csv() {

}

Csv.prototype.parse = function(string, separator) {
    const separators = [',', '.', '\t'];
    let allRows = string.split(/\r?\n|\r/);
    let defSeparator = separator;

    if (!defSeparator) {
        separators.forEach(function(elem) {
            if (allRows[0].split(elem).length - 1 > 0
                && allRows[0].split(elem).length === allRows[1].split(elem).length
            ) {
                defSeparator = elem;
            }
        });
    }

    return allRows.map(item => item.split(defSeparator));
};

Csv.prototype.generate = function(array, separator) {
    let result = '';
    array.forEach(function(elem, i) {
        if (!separator) {
            result += elem + '\r\n';
        } else {
            result += elem.join(separator) + '\r\n';
        }
    });
    return result;
};