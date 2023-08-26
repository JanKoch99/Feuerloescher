const production = {
    url: 'https://gvbapi.onrender.com',
    wsurl: 'ws://gvbapi.onrender.com'
};
const development = {
    url: 'http://localhost:4000',
    wsurl: 'ws://localhost:5000'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;