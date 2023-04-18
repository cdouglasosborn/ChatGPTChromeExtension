function sendRequest() {
    console.log('hi');
    var input = document.getElementById("request").value;


    // Make API request to OpenAI
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/chat/completions", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer ' + window.myKey);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var output = response.choices[0].message.content;
            document.getElementById("response").innerHTML += "<p><strong>Response:</strong> " + output + "</p>";
        }
    };
    var data = JSON.stringify({
        "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": input}]
    });
    xhr.send(data);
}

document.getElementById('sendRequest').addEventListener('click', function() {
    sendRequest();
}, false);