global.fetch = require('node-fetch');

export const businessService = {
    getSearchData,
    getMoreSearchData,
    getUserBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinessByID,
    getReviews,
    getMoreReviews,
    PostReview
}
export const apiConfig = {
   /*  endpointURL: "http://localhost:3001",
    endpointURL2: "http://localhost:3002" */
    endpointURL: "https://sportifysvc.codeninjas.cf",
    endpointURL2: "https://reviewsvc.codeninjas.cf"
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
function createBusiness(userEmail, name, categories, address, city, state, postal_code) {
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
function updateBusiness(businessId, name, categories, address, city, state, postal_code) {
    const requestOption = {
        method: 'PUT',
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
    return fetch(`${apiConfig.endpointURL}/businesses/${businessId}`, requestOption).then(res => {
        console.log(res.json());
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
function getBusinessByID(businessId) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/businesses/${businessId}`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function getReviews(businessId) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL2}/businesses/${businessId}/reviews`, requestOption).then(res => {
        // console.log(res); 
        return res.json();
    })
}

function getMoreReviews(businessId, last_key_review_id, last_key_business_id) {
    //console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL2}/businesses/${businessId}/reviews?last_key_business_id=${last_key_business_id}&last_key_business_id=${last_key_business_id}&last_key_review_id=${last_key_review_id}`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function PostReview(businessId,review,userEmail,userName ) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            "cool": "0",
            "funny": "0",
            "stars": "5",
            "text": review,
            "useful": "0",
            "user_id": userEmail,
            "username": userName
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL2}/businesses/${businessId}/reviews`, requestOption).then(res => {
        //            console.log(res.json());
        return res.json();
    })
}