const pipedrive = require('pipedrive');

async function addDeal(req_data, client) {
    const api = new pipedrive.DealsApi(client);
    try {
        console.log('Sending request...');
        const data = {
            title: "test title",
            org_id: 1,
            probability: 100,
            "91631cb27b5d57d4cd1ef531f61dbd7c0dae67a3": req_data.first_name, //First name
            "5c1eca30cc1083f3a48c4b9151772a876a104e8f": req_data.last_name, //Last name
            "7d724e11e3e927c8ab9153933e21c1feb1943499": req_data.phone, //Phone
            "328ec4080adcb66ee2d95020c749254061caa62c": req_data.email, //Email
            "5e80b006c350bccfbfb677fbdc2d1f631543d70c": req_data.address, //Address
            "83c7d1a182b9ad014e9796fe3854c7d526732b7c": req_data.city, //City
            "75e282e94e1161fe717a262946a09e56089c92c5": req_data.state, //State
            "56988c8aad763b26f3500897294247e9dc258eff": req_data.zip_code, //ZIP-code
            "d5d73e765e12c6d89783662ccbedcf65795c9ce5": req_data.area, //Area
            "17cca44e5f192ec1f07d8500f016f083f751d001": req_data.job_type, //Job type
            "1664761852698b3c7df78421f29f236c5a4f9d6e": req_data.job_source, //Job source
            "f60e8bf1aec52b27c6c364ae9f2af8fb7f41f71e": req_data.job_description, //Job description
            "a1e5587ab2f9d17813734f9c3f69b96b0de44769": req_data.date, //Date
            "e9a9c68398724361eecfbf3d7be46dead1dc4652": req_data.time_start, //Start time
            "df7353abac8e1046fc544d11a4bd3af62b00da98": req_data.time_end, //End time
            "845eb078fed245f91f008655f1a2d12430654372": req_data.technician //Technician
        }
        const response = await api.addDeal(data);
        console.log('Deal was added successfully!', response.data.id);
        return response.data.id;
    } catch (err) {
        const errorToLog = err.context?.body || err;
        console.log('Something went wrong: ', errorToLog);
    }
}

module.exports = {
    addDeal
};