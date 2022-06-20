const ACCESS_TOKEN = "TOKEN";

async function postGroups() {
    const inputValue = document.getElementById('amount-input').value;
    const count = inputValue >= 1 ? inputValue : 5;

    const groupsResponse = await getMyGroups(count);
    const groups = sortGroupsByMemberAmont(groupsResponse.response.items);
    const postText = formatGroupsResponse(groups);
    const makePostResponse = await makePost(postText);
 
    alert('post_id: ' + makePostResponse.response.post_id);
}

async function getMyGroups(count) {
    return $.getJSON({
        url: 'https://api.vk.com/method/groups.get?access_token=' + ACCESS_TOKEN + '&v=5.131&filter=publics&extended=1&fields=members_count',
        jsonp: "callback",
        dataType: "jsonp"
    }).promise();
}

async function makePost(message) {
    return $.getJSON({
        url: "https://api.vk.com/method/wall.post?access_token=" + ACCESS_TOKEN + "&v=5.131&&message=" + message,
        jsonp: "callback",
        dataType: "jsonp"
    
    }).promise();
}

function formatGroupsResponse(data) {
    var groups = "";
    groups += data[0].name + " - " + data[0].members_count + "%0A";
    return groups;
}

function sortGroupsByMemberAmont(items) {

    items.sort(function(a, b) {
        var keyA = new Number(a.members_count),
            keyB = new Number(b.members_count);

        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    console.log(items);
   
    return items;
}