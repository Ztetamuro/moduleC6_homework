const wsUri = "wss://echo.websocket.org/";
const sendMessage = document.querySelector('.send_message')
const valueMessage = document.querySelector('.write_message').value;
const output = document.querySelector('.messages');
const btn = document.querySelector('.j-btn-test')

function writeToScreen(message){
    let p = document.createElement('p');
    let pre = document.createElement('div');
    pre.append(p);
    p.innerHTML = message
    pre.className = 'send'
    output.appendChild(pre);
}

let websocket;

websocket = new WebSocket(wsUri)
websocket.onopen = function(evt){
    writeToScreen("CONNECTED")
}
websocket.onmessage = function(evt) {
    let pElem = document.createElement('p');
    let request = document.createElement('div');
        request.append(pElem);
        request.className = "request"
        pElem.className = "pElem"
        pElem.innerHTML = evt.data;
        output.appendChild(request)
    };
websocket.onerror = function(evt) {
    writeToScreen(
    '<span style="color: red;">ERROR:</span> ' + evt.data
    );
};


sendMessage.addEventListener('click', ()=> {
    if(document.querySelector('.write_message').value == ''){
        writeToScreen("Пустое сообщение")
    } else{
    const valueMessage = document.querySelector('.write_message').value;
    const message = valueMessage;
    writeToScreen(message);
    websocket.send(message);
    document.querySelector('.write_message').value = "";
    }
});

const mapLink = document.querySelector('#map-link');

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeToScreen(`<a href=${mapLink} target="_blank"> Ссылка на мое местоположение</a>`)
}

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});