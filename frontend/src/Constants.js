const production = {
    url: process.env.CORS_URI_BACK
};
const development = {
    url: 'http://localhost:4000'
};
export const config = process.env.NODE_ENV === 'development' ? development : production;