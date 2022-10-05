import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";

const endpoint = {
    device: '/admin/device'
};

function getDevice(callback) {
    let request = new Request(HOST.test_api + endpoint.device, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getDeviceById(params, callback) {
    let request = new Request(HOST.test_api + endpoint.device + '/' + params.id, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteDevice(params, callback) {
    let request = new Request(HOST.test_api + endpoint.device + '/delete/' + params.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function putDevice(id, user, callback) {
    let request = new Request(HOST.test_api + endpoint.device + '/update/' + id, {
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

function postDevice(user, callback) {
    let request = new Request(HOST.test_api + endpoint.device, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getDevice,
    getDeviceById,
    deleteDevice,
    postDevice,
    putDevice
};