global.fetch = require('node-fetch');

export const businessService = {
    getSearchData,
    getMoreSearchData,
    getUserBusiness,
    createBusiness,
    deleteBusiness

}
export const apiConfig = {
    endpointURL: "http://localhost:3001"
}

function getSearchData(business_type, city) {
    console.log("business_type = " + business_type, "city = " + city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/businesses?event_type=${business_type}&city=${city}`, requestOption).then(res => {
        // console.log(res); 
        return res.json();
    })
}

function getMoreSearchData(business_type, city, last_key_business_id, last_key_city) {
    //console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/businesses?event_type=${business_type}&city=${city}&last_key_business_id=${last_key_business_id}&last_key_city=${last_key_city}`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}

function getUserBusiness(userEmail) {
    //console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/businesses`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function createBusiness(userEmail,name,categories,address,city,state,postal_code) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "categories": categories,
            "address": address,
            "city": city,
            "state": state,
            "postal_code": postal_code
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/businesses`, requestOption).then(res => {
        //            console.log(res.json());
        return res.json();
    })
}
function deleteBusiness(userEmail, businessId) {
    const requestOption = {
        method: 'DELETE',
        /* body: JSON.stringify({
            "deleteFile": fileName,
            "userId": id
        }), */
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/businesses/${businessId}`, requestOption)
}
