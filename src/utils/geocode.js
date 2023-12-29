const request = require('postman-request')


const geocode = (address, callback)=>{
    const url='https://geocode.maps.co/search?q='+encodeURIComponent(address)+'&api_key=658894dfbf690015029872wspeb19f7&limit=1'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body[0].lon,
                latitude: body[0].lat,
                location: body[0].display_name
            })
        }
    })
}


module.exports = geocode
