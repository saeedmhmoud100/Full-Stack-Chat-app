import {getAccessToken} from "@/hooks/localStorage";

const websocketMiddleware = ({ dispatch }) => {
    let socket = {};
    return (next) => (action) => {
        if (action.meta && action.meta.websocket) {
            const { type, payload, meta } = action;
            const connectionId = meta.connectionId || 'default'
            switch (type) {
                case 'WEBSOCKET_CONNECT':
                    if (socket[connectionId]) {
                        socket[connectionId].close();
                    }
                    socket[connectionId] = new WebSocket(payload.url + "?token=" + getAccessToken());

                    if(meta.onOpen)
                        socket[connectionId].onopen = () => {
                            dispatch({ type: meta.onOpen , connectionId});
                        };
                    if(meta.onMessage)
                        socket[connectionId].onmessage = (event) => {
                            dispatch({ type: meta.onMessage, payload: event.data, connectionId });
                        };
                    if(meta.onClose)
                        socket[connectionId].onclose = () => {
                            dispatch({ type: meta.onClose, connectionId });
                        };
                    if(meta.onError)
                        socket[connectionId].onerror = (error) => {
                            dispatch({ type: meta.onError, payload: error.message, connectionId });
                        };
                    break;

                case 'WEBSOCKET_SEND':
                    if (socket[connectionId] && socket[connectionId].readyState === WebSocket.OPEN) {
                        socket[connectionId].send(JSON.stringify(payload));
                        dispatch({ type: meta.onSend, connectionId, payload });
                    }
                    break;

                case 'WEBSOCKET_DISCONNECT':
                    if (socket[connectionId]) {
                        socket[connectionId].close();
                    }
                    delete socket[connectionId] ;
                    break;

                default:
                    break;
            }
        }

        return next(action); // the error here
    };
};

export default websocketMiddleware;