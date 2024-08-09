const fetch = require('node-fetch');
const oauth = async () => {
  let results;
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.AMADEUS_TEST_API_KEY);
  urlencoded.append("client_secret", process.env.AMADEUS_TEST_API_SECRET);
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  console.log('reqquestOptions', requestOptions)
  await fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      if ('error' in result) {
        results = {
          status: 'error',
          data: false
        }
      } else if ('state' in result && 'access_token' in result && result.state === 'approved') {
        results = {
          status: 'success',
          data: result.access_token
        }
      }
    })
    .catch(error => {
      console.log('error', error);
      results = {
        status: 'error',
        data: JSON.stringify(error)
      }
    });

  return results;
}

const flightSearch = async (obj) => {
  let results;
  const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers?';

  const myHeaders = new Headers();
  myHeaders.append("Authorization", global.amadeus_access_token);
  console.log('global.amadeus_access_token', global.amadeus_access_token)

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  url = `${url}originLocationCode=${obj.departureCode}&destinationLocationCode=${obj.destinationCode}&departureDate=${obj.departureDate}&adults=${obj.noOfPeople}`;

  // console.log('reqquestOptions', requestOptions)
  await fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      if ('errors' in result && result.errors[0].status !== 401) {
        results = {
          status: 'error',
          data: false
        }
      } else if (result.errors.length > 0 && result.errors[0].status === 401) {
        results = {
          status: 'error',
          data: 'invalid-access-token'
        }
      } else if ('data' in result && 'meta' in result) {
        results = {
          status: 'success',
          data: result
        }
      } else if ('data' in result && 'meta' in result) {
        results = {
          status: 'success',
          data: result
        }
      }
    })
    .catch(error => {
      console.log('error', error);
      results = {
        status: 'error',
        data: JSON.stringify(error)
      }

    });

  return results;
}

module.exports = {
  oauth,
  flightSearch
};