global.fetch = require('node-fetch');

export const businessService = {
    getSearchData,
    getMoreSearchData

}
export const apiConfig = {
    endpointURL: "http://localhost:3001"
}

function getSearchData(business_type, city) {
    console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/businesses?event_type=${business_type}&city=${city}`, requestOption).then(res => {
        console.log(res); 
        return res.json();
    })
}

function getMoreSearchData(business_type, city, last_key_business_id, last_key_city) {
    console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/businesses?event_type=${business_type}&city=${city}&last_key_business_id=${last_key_business_id}&last_key_city=${last_key_city}`, requestOption).then(res => {
        console.log(res); 
        return res.json();
    })
}