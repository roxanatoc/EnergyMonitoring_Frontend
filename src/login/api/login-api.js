import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";

const endpoint = {
    user: '/login'
};

function getUserByUsername(username, password, role, callback) {

    let user = {
        username: username,
        password: password,
        role: role,
    }

    let request = new Request(HOST.test_api + endpoint.user, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(user)
    });
    console.log(JSON.stringify(user));
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function getUserById(params, callback) {
    let request = new Request(HOST.test_api + endpoint.user + '/' + params.id, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getAccountByUsername(params, callback) {
    let request = new Request(HOST.test_api + endpoint.user + '/' + params, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUserByUsername,
    getUserById,
    getAccountByUsername
};