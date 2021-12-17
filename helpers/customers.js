require('dotenv').config()
const axios = require("axios")

const site_id = process.env.track_site_id
const api_key = process.env.track_api_key
const region = process.env.region

// Add or update a customer
const add_update_customer = async (id, attributes) => {

    const { data: data  } = await axios({
        url: `https://${site_id}:${api_key}@track${region}.customer.io/api/v1/customers/${id}`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        data: attributes
    })

    return data

}

// Delete a customer
const delete_customer = async (id) => {

    const { data: data  } = await axios({
        url: `https://${site_id}:${api_key}@track${region}.customer.io/api/v1/customers/${id}`,
        method: 'DELETE'
    })

    return data
}

module.exports = { add_update_customer, delete_customer }