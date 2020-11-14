jQuery('input').on('paste', function (e) {
    e.preventDefault();

    var text = e.originalEvent.clipboardData.getData('text/plain');
    var input = e.currentTarget;
    var result = [];
    var table = document.querySelector("table tbody");

    text.split("\n").forEach(function(element) {
        result.push(element.split(";"));
    });

    var rowIndex = input.parentNode.parentNode.rowIndex;

    var cellsNumber = addCells(table, result, input);
    addRows(table, result, rowIndex, cellsNumber);
    addValues(table, input, result);

});

function addCells(table, arr, input) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var cellIndex = input.parentNode.cellIndex;
    var row = input.parentNode.parentNode;
    var rowChildrenCount = row.children.length - 1;
    var cellsToAdd = arr[0].length - rowChildrenCount + cellIndex - 1;
    var tableHead = document.querySelector("table thead tr");

    for (i = 0; i < table.children.length; i++) {
        var row = table.children[i];
        var rowIndex = row.rowIndex;
        for (j = 0; j < cellsToAdd; j++) {
            var cell = document.createElement("td");
            var input = document.createElement('input');
            input.type = 'text';
            input.name = alphabet[(cellIndex == 1 ? cellIndex + 1 : cellIndex) + j] + rowIndex;

            cell.appendChild(input);
            row.appendChild(cell);
        }
    }

    for (i = 0; i < cellsToAdd; i++) {
        var cellTh = document.createElement("th");
        cellTh.append(document.createTextNode(alphabet[(cellIndex == 1 ? cellIndex + 1 : cellIndex) + i].toUpperCase()));
        tableHead.append(cellTh);
    }

    return rowChildrenCount + cellsToAdd;
}

function addRows(table, arr, rowIndex, cellsNumber) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var rowsToAdd = arr.length - table.rows.length + rowIndex - 1;

    for (i = 0; i < rowsToAdd; i++) {
        var row = document.createElement("tr");
        for (j = 0; j <= cellsNumber; j++) {

            var cellValue;
            var cell = j > 0 ? document.createElement("td") :  document.createElement("th");
            if (j == 0) {
                cellValue = document.createTextNode(table.rows.length + 1);
            } else {
                cellValue = document.createElement('input');
                cellValue.type = 'text';
                cellValue.name = alphabet[j - 1] + (table.rows.length + 1);
            }


            cell.appendChild(cellValue);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function addValues(table, input, result) {
    var rowIndex = input.parentNode.parentNode.rowIndex - 1;
    var cellIndex = input.parentNode.cellIndex;
    var arrayRow = 0;

    for (i = rowIndex; i < table.children.length; i++) {
        var resultCounter = 0;
        var cells = table.children[i].children;

        for (j = 1; j < table.children[i].children.length; j++) {
            if (j >= cellIndex) {
                cells[j].firstChild.value = result[arrayRow][resultCounter];
                resultCounter++;
            }
        }
        arrayRow++;
    }
}


var currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
    e.preventDefault();

    currentColumn = e.currentTarget;

    var menu = jQuery('#column-menu');

    menu.addClass('d-block');

    menu.css({
        left: e.clientX,
        top: e.clientY
    });
});

jQuery('#column-menu [data-action]').on('click', function (e) {
    e.preventDefault();

    var action = e.currentTarget.getAttribute('data-action');

    switch (action) {
        case 'add-left':

            break;

        case 'add-right':

            break;

        case 'remove':

            break;
    }

    jQuery('#column-menu').removeClass('d-block');
});