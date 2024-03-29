function Csv() {

}

function CsvArray() {

}

Csv.prototype.parse = function parse(string, separator) {
  const separators = [',', '.', '\t'];
  let allRows = string.split(/\r?\n|\r/);
  let defSeparator = separator;

  if (!defSeparator) {
    separators.forEach(function (elem) {
      if (allRows[0].split(elem).length - 1 > 0
        && allRows[0].split(elem).length === allRows[1].split(elem).length
      ) {
        defSeparator = elem;
      }
    });
  }

  return allRows.map(item => item.split(defSeparator));
};

Csv.prototype.generate = function generate(array, separator) {
  let result = '';
  array.forEach(function (elem, i, array) {
    if (!separator) {
      result += elem;
    } else {
      result += elem.join(separator);
    }
    if (i !== array.length - 1) {
      result += '\n';
    }
  });
  return result;
};

CsvArray.prototype = Object.create(Array.prototype);
CsvArray.prototype.parse = function parse(string) {
  const separators = [',', '.', '\t'];
  let allRows = string.split(/\r?\n|\r/);
  let separator;

  separators.forEach(function (elem) {
    if (allRows[0].split(elem).length - 1 > 0
      && allRows[0].split(elem).length === allRows[1].split(elem).length
    ) {
      separator = elem;
    }
  });

  const arr = allRows.map(item => item.split(separator));

  for (let i = 0; i < arr.length; i += 1) {
    this.push(arr[i]);
  }
  return this;
}

CsvArray.prototype.generate = function generate(separator) {
  let result = '';
  this.forEach(function (elem, i, array) {
    if (!separator) {
      result += elem;
    } else {
      result += elem.join(separator);
    }
    if (i !== array.length - 1) {
      result += '\n';
    }
  });
  return result;
}

CsvArray.prototype.getCell = function getCell(cell) {
  const alphabet = 'ABCDEFGHIJKLMNOPRQSTUVWXYZ';
  const column = alphabet.indexOf(cell.charAt(0));
  const row = cell.charAt(1).valueOf() - 1;
  return this[row][column];
}
