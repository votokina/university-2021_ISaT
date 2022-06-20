const ACCESS_TOKEN = "TOKEN";

function AddCommentClicked() {
    const ownerId = document.getElementById('owner_id').value;
    const postId = document.getElementById('post_id').value;
    const message = document.getElementById('message').value;

    const requestUrl = 'https://api.vk.com/method/wall.createComment?access_token=' + ACCESS_TOKEN + '&v=5.131&owner_id=' + ownerId + '&post_id=' + postId + '&message=' + message;

    sendRequest(requestUrl);
}  

function AddPostClicked() {
    const post = document.getElementById('post').value;
    
    const requestUrl = 'https://api.vk.com/method/wall.post?access_token=' + ACCESS_TOKEN + '&v=5.131&friends_only=1&message=' + post;
    
    sendRequest(requestUrl);
}  

function sendRequest(requestUrl) {
    console.log(requestUrl);
    $.getJSON({
        url: requestUrl,
        jsonp: "callback",
        dataType: "jsonp"
    }).done(function(data) {
        console.log(data);
    });
}