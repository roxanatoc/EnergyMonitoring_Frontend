import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";

const endpoint = {
    value: 'monitoredValue/values'
};

function getValues(callback) {
    let request = new Request(HOST.test_api + endpoint.value, {
        method: 'GET',
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getValues
};