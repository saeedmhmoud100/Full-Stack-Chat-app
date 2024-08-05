
export const websocketConnect = (url, meta) => ({
    type: 'WEBSOCKET_CONNECT',
    payload: { url },
    meta,
});

export const websocketSend = (message, meta) => ({
    type: 'WEBSOCKET_SEND',
    payload: message,
    meta,
});

export const websocketDisconnect = (meta) => ({
    type: 'WEBSOCKET_DISCONNECT',
    meta,
});
