console.log("hello main.mts");

await fetch("http://127.0.0.1:8080/", { mode: "no-cors" })
    .then(response => {
        return response.text();
    })
    .then(text => {
        console.log(text);
    });