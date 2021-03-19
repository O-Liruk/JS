const CONNECTION_URL = 'wss://fep-app.herokuapp.com/';

export default class Chat {
    constructor(config) {
        this.config = config;
    }

    initConnection(name) {
        this.socket = new WebSocket(CONNECTION_URL);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }
    
    onSocketMessage(e) {
        this.config.onMessage && this.config.onMessage(JSON.parse(e.data));
    }

    send(name, message) {
        this.socket.send(
            JSON.stringify({
                type: 'message',
                payload: {
                    username: name,
                    message: message,
                },
            })
        );
    }
}
