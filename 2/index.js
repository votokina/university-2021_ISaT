const QUESTION_ROWS = ["question-number", "question-text"];
const ANSWER_ROWS = [ "answer-variant-1", "answer-variant-2", "answer-variant-3"];

function loadRequests() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'TestSystem.xml', false);
    xhr.send();
    return xhr.responseXML;
}

function addRequest(data, requestNumber) {
    const requests = data.getElementsByTagName('question');

    const tableBody = document.getElementById('requests-table').getElementsByTagName('tbody')[0];
    const tableRow = document.createElement('tr');

    const request = requests[requestNumber - 1];
    const user = request.getElementsByTagName("question-details")[0];
    const requestDetails = request.getElementsByTagName("answers")[0];

    QUESTION_ROWS.forEach(tagName => {
        const td = document.createElement('td');
        td.innerHTML = user.getElementsByTagName(tagName)[0].innerHTML;
        tableRow.appendChild(td);
    });

    ANSWER_ROWS.forEach(tagName => {
        const td = document.createElement('td');
        td.innerHTML = requestDetails.getElementsByTagName(tagName)[0].innerHTML;
        console.log(td.innerHTML);
        tableRow.appendChild(td);
    })

    tableBody.appendChild(tableRow);
}

function addAllRequests(data) {
    const requestsAmount = data.getElementsByTagName('question').length;

    for(var i = 0; i < requestsAmount; i++)
        addRequest(xmlData, i + 1);
}

function clearTableBody() {
    const tableBody = document.getElementById('requests-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
}

function getRequestButtonClicked() {
    const requestsAmount = xmlData.getElementsByTagName('question').length;
    const requestNum = Number(document.getElementById('request-input').value);

    clearTableBody();

    if (requestNum == 0)
        addAllRequests(xmlData);
    else
        addRequest(xmlData, requestNum);
    
}

const xmlData = loadRequests();