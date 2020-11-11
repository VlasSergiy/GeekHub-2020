jQuery('input').on('paste', function (e) {
    e.preventDefault();

    var text = e.originalEvent.clipboardData.getData('text/plain');
    var input = e.currentTarget;
    var inputName = input.name;
    var result = [];
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    //var header = document.getElementsByTagName("Table")[0].rows[0].cells;

    console.log(inputName);
    console.log(input.parentNode.parentNode.rowIndex);
    // console.log(input.parentNode.nextElementSibling);
    // console.log(input.parentNode.previousElementSibling);
    // console.log(alphabet);

    text.split("\n").forEach(function(element) {
        result.push(element.split(";"));
    });

    //input.parentNode.parentNode.insertCell(-1);

    console.log(result);

});

function addRows(startPosition, rowsCountToBeAdded) {

}

function addCells(rowNumber, cellsCountToBeAdded) {

}