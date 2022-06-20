const ACCESS_TOKEN = "TOKEN";
const REQUEST_URL = 'https://api.vk.com/method/friends.get?access_token=' + ACCESS_TOKEN + '&v=5.131&fields=nickname,sex,education';

$.getJSON({
    url: REQUEST_URL,
    jsonp: "callback",
    dataType: "jsonp"
}).done(function(data) {
    console.log(data);
    fillTable(data.response.items);
});

function fillTable(data) {
    const tableBody = document.getElementById('friends-table').getElementsByTagName('tbody')[0];

    for(var i = 0; i < data.length; i++) {
        const e = data[i];
        const tableRow = document.createElement('tr');
        
        var tableData = document.createElement('td');
        tableData.innerHTML = i + 1;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td'); 
        tableData.innerHTML = e.id;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = e.first_name + ' ' + e.last_name;
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = e.sex == 1 ? "Женский" : "Мужской";
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = e.university_name ?? "";
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = e.faculty_name ?? "";
        tableRow.appendChild(tableData);      

        tableBody.appendChild(tableRow);
    }
}