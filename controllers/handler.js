const axios = require('axios');
const promiseRetry = require('promise-retry');
const {REMOTE_RESOURCE_1_URL, REMOTE_RESOURCE_2_URL} = require('../constants.js');

const updateRemoteApi = async(req, res, next) => {
    try {
        await promiseRetry({
            retries: 3
        }, function (retry, number) {
            console.log('attempt number', number);
            return _attempUpdateRemoteApi().catch(retry);
        });
    } catch (error) {
        if (error.response.config.url === REMOTE_RESOURCE_2_URL && error.response.config.method === 'put') {
            await axios.request({
                url: REMOTE_RESOURCE_1_URL,
                method: 'PUT',
                data: {
                    'value': 'old1'
                },
                timeout: 1000
            });
        }
        return res
            .status(500)
            .send('An error an accurred');
    }
    return res
        .status(200)
        .send('The process was success');
};

const _attempUpdateRemoteApi = async() => {
    await axios.request({
        url: REMOTE_RESOURCE_1_URL,
        method: 'PUT',
        data: {
            'value': 'new1'
        },
        timeout: 1000
    });

    await axios.request({
        url: REMOTE_RESOURCE_2_URL,
        method: 'PUT',
        data: {
            'value': 'new1'
        },
        timeout: 1000
    });

};

exports.handler = updateRemoteApi;
