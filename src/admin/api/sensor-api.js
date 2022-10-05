import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";

const endpoint = {
    sensor: '/admin/sensor'
};

function getSensor(callback) {
    let request = new Request(HOST.test_api + endpoint.sensor, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function getSensorById(params, callback) {
    let request = new Request(HOST.test_api + endpoint.sensor + '/' + params.id, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteSensor(params, callback) {
    let request = new Request(HOST.test_api + endpoint.sensor+ '/delete/' + params.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function putSensor(id, user, callback) {
    let request = new Request(HOST.test_api + endpoint.sensor + '/update/' + id, {
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

function postSensor(user, callback) {
    let request = new Request(HOST.test_api + endpoint.sensor, {
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
    getSensor,
    getSensorById,
    deleteSensor,
    postSensor,
    putSensor
};