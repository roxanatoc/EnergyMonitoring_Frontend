import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";

const endpoint = {
    client: '/admin/client'
};

function getClient(callback) {
    let request = new Request(HOST.test_api + endpoint.client, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getClientById(params, callback) {
    let request = new Request(HOST.test_api + endpoint.client + '/' + params.id, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getClientByUsername(params, callback) {
    let request = new Request(HOST.test_api + endpoint.client + '/' + params, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteClient(params, callback) {
    let request = new Request(HOST.test_api + endpoint.client+ '/delete/' + params.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function putClient(id, user, callback) {
    let request = new Request(HOST.test_api + endpoint.client+ '/update/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function postClient(user, callback) {
    let request = new Request(HOST.test_api + endpoint.client, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)

    });
    console.log(JSON.stringify(user));
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getClient,
    getClientById,
    deleteClient,
    postClient,
    putClient,
    getClientByUsername
};