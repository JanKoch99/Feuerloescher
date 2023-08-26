const production = {
    url: 'https://bernhackt23-backend.web01.dalcloud.net',
    wsurl: 'ws://bernhackt23-backend.web01.dalcloud.net'
};
const development = {
    url: 'http://localhost:4000',
    wsurl: 'ws://localhost:5000'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;