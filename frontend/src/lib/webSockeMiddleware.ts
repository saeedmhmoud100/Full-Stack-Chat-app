import {getAccessToken} from "@/hooks/localStorage";

const websocketMiddleware = ({ dispatch }) => {
    let socket = null;
    return (next) => (action) => {
        if (action.meta && action.meta.websocket) {
            const { type, payload, meta } = action;

            switch (type) {
                case 'WEBSOCKET_CONNECT':
                    if (socket !== null) {
                        socket.close();
                    }
                    socket = new WebSocket(payload.url + "?token=" + getAccessToken());

                    socket.onopen = () => {
                        dispatch({ type: meta.onOpen });
                    };

                    socket.onmessage = (event) => {
                        dispatch({ type: meta.onMessage, payload: event.data });
                    };

                    socket.onclose = () => {
                        dispatch({ type: meta.onClose });
                    };

                    socket.onerror = (error) => {
                        dispatch({ type: meta.onError, payload: error.message });
                    };
                    break;

                case 'WEBSOCKET_SEND':
                    if (socket !== null) {
                        socket.send(JSON.stringify(payload));
                    }
                    break;

                case 'WEBSOCKET_DISCONNECT':
                    if (socket !== null) {
                        socket.close();
                    }
                    socket = null;
                    break;

                default:
                    break;
            }
        }

        return next(action); // the error here
    };
};

export default websocketMiddleware;