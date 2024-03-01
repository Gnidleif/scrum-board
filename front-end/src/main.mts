await fetch("http://127.0.0.1:8080/")
    .then((response: Response) => response.text())
    .then((text: string) => {
        const server_msg: HTMLElement = document.querySelector("#server-msg")!;
        server_msg.innerHTML = text;
    });

const local_msg: HTMLElement = document.querySelector("#local-msg")!;
local_msg.innerHTML = "hello from main!";