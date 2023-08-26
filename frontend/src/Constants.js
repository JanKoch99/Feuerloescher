const production = {
    url: 'https://bernhackt23-backend.web01.dalcloud.net',
    wsurl: 'wss://bernhackt23-backend.web01.dalcloud.net'
};
const development = {
    url: 'http://localhost:3200',
    wsurl: 'ws://localhost:3200'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;