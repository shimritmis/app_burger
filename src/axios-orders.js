import axios from 'axios';

const instance = axios.create ({
    baseURL:'https://burger-app-c78f6.firebaseio.com/'
});

export default instance;