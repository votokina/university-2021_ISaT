const ACCESS_TOKEN = "TOKEN";
var ITEMS;


function getGroups() {
    const inputValue = document.getElementById('amount-input').value;
    const count = inputValue >= 1 ? inputValue : 5;

    console.log(count);

    $.getJSON({
        url: 'https://api.vk.com/method/groups.get?access_token=' + ACCESS_TOKEN + '&v=5.131&filter=publics&extended=1&fields=members_count&count=' + count,
        jsonp: "callback",
        dataType: "jsonp"
    }).done(function (data) {

        const items = data.response.items;
        const groups = sortGroupsByMemberAmont(items);

        const groupsList = document.getElementById('groups-list');
        groupsList.innerHTML = "";

        console.log(groups);

        groups.forEach(element => {
            const listItem = document.createElement('li');
            listItem.innerHTML = element;
            groupsList.appendChild(listItem)
        });

        ITEMS = items;
    });
}

function sortGroupsByMemberAmont(items) {
   
    const groups = [];

    items.sort(function(a, b) {
        var keyA = new Number(a.members_count),
            keyB = new Number(b.members_count);

        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    for (let i = 0; i < items.length; i++) {
        groups.push((i+1) + ". " + items[i].members_count + "  -  " + items[i].name);
    }

    return groups;
}

function postGroups() {
    if (ITEMS == null)
    {
        alert('Сначала необходимо нажать кнопку <Отобразить группы>');
        return;
    }

    var groups = '';
    for(var i = 0; i < ITEMS.length; i++)
        groups += (i + 1) + ". " + ITEMS[i].name + " - " + ITEMS[i].members_count + "%0A";
    
    $.getJSON({
            url: "https://api.vk.com/method/wall.post?access_token=" + ACCESS_TOKEN + "&v=5.131&message=" + groups,
            jsonp: "callback",
            dataType: "jsonp"

        }).done(function (data) {
            alert('Пост размещен, post_id: ' + data.response.post_id);
        });
    
}