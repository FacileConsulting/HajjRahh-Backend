const {
  baseURL,
  amadeusFlightsURL,
  axiosInstance,
  refreshAmadeusToken
} = require('../middleware/amadeusMiddleware');

exports.searchFlights = async (req, res) => {
  try {

    const { fromHoliday = false, flyingFrom, flyingTo, flightDepartureDate, flightReturnDate, flightType = true, adults = 1, children = 0, infants = 0, travelClass = 'ECONOMY', emirates, lufthansa, qatarAiraways, etihadAiraways, egyptair, twoFourHour, fourSixHour, zeroStop, oneStop, aboveOneStop, egg, nonVeg, morning, afternoon, evening, night } = req.body;
    
    console.log('#@#@@@@@@@@@', adults, fromHoliday, flyingFrom, flyingTo, flightDepartureDate, flightReturnDate);
    const getAirlinesArray = () => {
      const getValues = [];
      if (emirates) {
        getValues.push('EK');
      } 
      if (lufthansa) {
        getValues.push('LH');
      }
      if (qatarAiraways) {
        getValues.push('QR');
      }
      if (etihadAiraways) {
        getValues.push('EY');
      }
      if (egyptair) {
        getValues.push('MS');
      }
      return getValues;
    }

    const getDurationArray = () => {
      const getValues = [];
      if (twoFourHour) {
        getValues.push('120-239');
      } 
      if (fourSixHour) {
        getValues.push('240-359');
      } 
      return getValues;
    }

    const getStopsArray = () => { 
      const getValues = [];
      if (zeroStop) {
        getValues.push(0);
      } 
      if (oneStop) {
        getValues.push(1);
      } 
      if (aboveOneStop) {
        getValues.push(2);
      } 
      return getValues;
    }

    const getTimeArray = () => {
      const getValues = [];
      if (morning) {
        getValues.push(`${convertToMinutes('00:00')}-${convertToMinutes('05:59')}`);
      } 
      if (afternoon) {
        getValues.push(`${convertToMinutes('06:00')}-${convertToMinutes('11:59')}`);
      } 
      if (evening) {
        getValues.push(`${convertToMinutes('12:00')}-${convertToMinutes('17:59')}`);
      } 
      if (night) {
        getValues.push(`${convertToMinutes('18:00')}-${convertToMinutes('23:59')}`);
      } 
      return getValues;
    }

    const convertToMinutes = (timeString) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const convertISODurationToReadable = (duration) => {
      let totalMinutes = 0;
  
      const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/;
      const matches = duration.match(regex);
  
      if (matches) {
        const days = parseInt(matches[1]) || 0; 
        const hours = parseInt(matches[2]) || 0; 
        const minutes = parseInt(matches[3]) || 0; 
  
        totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
      }
      return totalMinutes;
    }
    
    let url = `${baseURL}${amadeusFlightsURL}originLocationCode=${flyingFrom}&destinationLocationCode=${flyingTo}&departureDate=${flightDepartureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}&currencyCode=USD`;
    if (flightReturnDate) {
      url = `${url}&returnDate=${flightReturnDate}`;
    }
    if (flightType) {
      url = `${url}&nonStop=${flightType}`;
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.amadeus_access_token}`
      }
    };

    console.log('##@#', config);    

    const filterFlightsData = (getData) => {
      // console.log(getData);
      if (getData?.data && getData.data.length > 0) {
        let { data, dictionaries, meta } = getData;
        console.log('first', data.length);
        let airlinesArray = getAirlinesArray();
        let durationArray = getDurationArray();
        let stopsArray = getStopsArray();
        let timeArray = getTimeArray();

        

        console.log('##@22', airlinesArray, durationArray, stopsArray, timeArray)

        // duration and stops
        if (airlinesArray.length > 0 || durationArray.length > 0 || stopsArray.length > 0 || timeArray.length > 0 ) {
          for (let y = 0; y < data.length; y++) {
            let getDur = [];
            let halts = [];
            let getTime = '';
            for (let x = 0; x < data[y].itineraries.length; x++) {
              getDur.push(convertISODurationToReadable(data[y].itineraries[x].duration));
              for (let z = 0; z < data[y].itineraries[x].segments.length; z++) {
                let tempTime = data[y].itineraries[0].segments[0].departure.at;
                let sp = tempTime.split('T')[1];
                let tp = sp.split(':');
                getTime = convertToMinutes(`${tp[0]}:${tp[1]}`);
                if (z > 0) {
                  const departureCode = data[y].itineraries[x].segments[z].departure.iataCode;
                  const arrivalAt = data[y].itineraries[x].segments[z-1].arrival.at;
                  const departureAt = data[y].itineraries[x].segments[z].departure.at;
                  halts.push(`${departureCode}^${departureAt}^${arrivalAt}`); 
                }
              }
            }
            
            data[y].backendTime = getTime;
            data[y].backendHalts = halts.length;
            data[y].backendDurationInMin = getDur.reduce((accumulator, current) => accumulator + current, 0);
            // console.log('$%%%%%%%%', data[y].backendHalts)
          } 

          let filteredData = [...data];

          
          // console.log('2', filteredData.length);

          let filteringAirLines = filteredData.filter( obj => obj.validatingAirlineCodes.some(code => airlinesArray.includes(code)) );
          // console.log('3', filteringAirLines.length);
          if (filteringAirLines.length > 0) {
            filteredData = [...filteringAirLines];
          }        
          
          // console.log('4', filteredData.length);
          
          const filteringDuration = filteredData.filter(obj => 
            durationArray.some(range => {
              const [min, max] = range.split('-').map(Number); 
              return obj.backendDurationInMin >= min && obj.backendDurationInMin <= max; 
            })
          );
          // console.log('13', filteringDuration.length);
          if (filteringDuration.length > 0) {
            filteredData = [...filteringDuration];
          }
          // console.log('5', filteredData.length);
          const filteringStop = filteredData.filter(obj => stopsArray.includes(obj.backendHalts));
          // console.log('133', filteringStop.length);
          if (filteringStop.length > 0) {
            filteredData = [...filteringStop];
          }
          // console.log('6', filteredData.length);
          const filteringStops = filteredData.filter(obj => obj.backendHalts >= 2 && stopsArray.includes(2));
          // console.log('1333', filteringStops.length);
          if (filteringStops.length > 0) {
            filteredData = [...filteringStops];
          }
          // console.log('7', filteredData.length);
          const filteringTime = filteredData.filter(obj => 
            timeArray.some(range => {
              const [min, max] = range.split('-').map(Number); 
              return obj.backendTime >= min && obj.backendTime <= max; 
            })
          );
          // console.log('13334', filteringTime.length);
          if (filteringTime.length > 0) {
            filteredData = [...filteringTime];
          }
          // console.log('8', filteredData.length);
          return { data: filteredData, dictionaries, meta: { count: filteredData.length } };
        } else {
          return { data, dictionaries, meta };
        }
      } else {
        return getData;
      }
    }

    const callingforSearchFlight = async() => {
      const response = await axiosInstance.request(config);
      // console.log('##@#response', Object.keys(response.data));
      // const datum = response.data;
      let datum;
      if (fromHoliday) {
        datum = response.data;
      } else {
        datum = filterFlightsData(response.data);
      }
      return res.status(200).send({ data: datum, status: 'success' });
    }
    callingforSearchFlight();
  } catch (error) {
    // console.error('from error');
    const response = await refreshAmadeusToken();
    // console.error('from error', response);
    if (typeof response === 'string') {
      callingforSearchFlight();
    }
    return res.status(500).send({ message: 'Error in searchFlights API', status: 'error' });
  }
};