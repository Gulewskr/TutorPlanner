import ax from 'axios';

const axios = ax.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(JSON.stringify(error));
        console.error(
            'API Error: ',
            error.response ? error.response.data : error.message,
        );
        return Promise.reject(error);
    },
);

export { axios };
