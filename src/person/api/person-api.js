import RestApiClient from "../../commons/api/rest-client";
import {HOST} from "../../commons/hosts";


const endpoint = {
    person: '/person'
};

function getPersons(callback) {
    let request = new Request(HOST.test_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPersonById(params, callback){
    let request = new Request(HOST.test_api + endpoint.person + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postPerson(user, callback){
    let request = new Request(HOST.test_api + endpoint.person , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function putPerson(id, user, callback) {
    let request = new Request(HOST.test_api + endpoint.person + '/' + id, {
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

function deletePerson(id, callback) {
    let request = new Request(HOST.test_api + endpoint.person+ '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPersons,
    getPersonById,
    postPerson,
    putPerson,
    deletePerson
};
