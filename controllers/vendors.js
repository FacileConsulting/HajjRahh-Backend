const { constant } = require('../constant');
const {
  createPilgrimageBooking,
  createHotelBooking,
  createCabPromotion,
  createRestaurantPromotion,
  createPackageManagement,
  getPilgrimageBooking,
  getCabPromotion,
  getRestaurantPromotion,
  getPackageManagement,
  getAllPilgrimageBooking,
  getAllCabPromotion,
  getAllRestaurantPromotion,
  getAllPackageManagement,
  deletePilgrimageBooking,
  deleteHotelBooking,
  deleteCabPromotion,
  deleteRestaurantPromotion,
  deletePackageManagement,
  updatePilgrimageBooking,
  updateHotelBooking,
  updateCabPromotion,
  updateRestaurantPromotion,
  updatePackageManagement,
  saveInDB,
  getAllFleetManagement,
  createFleetManagement,
  deleteFleetManagement,
  getFleetManagement,
  updateFleetManagement,
  getAllDriverManagement,
  createDriverManagement,
  deleteDriverManagement,
  getDriverManagement,
  updateDriverManagement,
  getAllCabBooking,
  getAllRestaurantPayment,
  updateCabBookingReview,
  getRestaurantMenu,
  updateRestaurantMenu,
  createRestaurantMenu,
  getAllRestaurantMenu,
  deleteRestaurantMenu
} = require('../mongo');

const {
  amadeusHotelURL,
  amadeusHotelDetailsURL,
  amadeusHotelRatingURL,
  refreshAmadeusToken,
} = require('../middleware/amadeusMiddleware');

const { callAxiosInstance } = require('../middleware/axios');
const { 
  otpConfig, 
  otpVerifyConfig, 
  hotelConfig, 
  hotelDetailsConfig, 
  hotelRatingConfig 
} = require('../utils');

exports.vendors = async (req, res) => {
  const {
    otpURL,
    c200,
    c500,
    yS,
    nS,
    pilgrimageBooking,
    hotelBooking,
    packageManagement,
    cab,
    fleet,
    driver,
    cabBooking,
    restaurantPayment,
    restaurantMenu,
    restaurant,
    vendorsLogin
  } = constant();
  const axiosInstance = callAxiosInstance(otpURL);
  try {
    const {
      type,
      userMobile,
      pilBookVendorName,
      pilBookMobile,
      pilBookEmail,
      pilBookDocumentStatus,
      pilBookStatus,
      pilBookVendorCount,
      pilBookPackageName,
      pilBookFromDate,
      pilBookToDate,
      pilBookTravelersList,
      pilgrimageBookingId,
      hotelBookingId,
      ishotelHalalCertificate,
      hotelExclusions,
      hotelInclusions,
      hotelRoomsList,
      hotelPaymentOptions,
      hotelStarRating,
      hotelHalalCertificate,
      hotelBlackOutDates,
      hotelEmail,
      hotelContact,
      hotelLocation,
      hotelName,
      hotelTypeKey,
      hotelSearch,
      packageName,
      departure,
      destination,
      price,
      packageDuration,
      packMangGroupSize,
      days,
      nights,      
      totalNights,
      packMangDocumentsRequired,
      transportation,
      facilities,
      packMangHajjDates,
      packMangUmrahDates,
      packMangUploadImages,
      dateRange,
      packMangInclusion,
      packMangExclusion,
      packMangItineraryList,
      packageManagementId,
      cabPromotionId,
      cabPromoCode,
      cabPromoType,
      cabAssignTo,
      cabPromoEngine,
      fleetManagementId,
      cabVehicleName,
      cabAssignDriver,
      cabVehicleType,
      cabVehicleNumber,
      cabVehicleSeating,
      cabVehicleFeatures,
      cabAirportPricing,
      cabCityTourPricing,
      driverManagementId,
      cabDriverName,
      cabMobileNumber,
      cabLicense,
      cabTagCar,
      cabPayment,
      cabRating,
      cabJoinDate,
      cabBookingId,
      restaurantMenuId,
      restaurantItemName,
      restaurantMenuType,
      restaurantMenuPhoto,
      restaurantMenuHalalCertification,
      restaurantMenuDescription,
      restaurantMenuAvailability,
      restaurantPromotionId,
      restaurantPromoCode,
      restaurantPromoType,
      restaurantAssignTo,
      restaurantPromoEngine,
      cabBookReviewUpdate,
      mobile,
      otp
    } = req.body;
    console.log('mobile, otp', type, mobile, otp);    

    const extra = () => {
        return {
        theme: ['beach'],
        packageDetails: {
          overview: "See the highlights of London via 2 classic modes of transport on this half-day adventure. First, you will enjoy great views of Westminster Abbey, the Houses of Parliament, and the London Eye, as you meander through the historic streets on board a vintage double decker bus. Continue to see St. Paul’s Cathedral, Sir Christopher Wren’s architectural masterpiece, where Admirals Nelson and Wellington are buried, and Princess Diana and Prince Charles got married. Continue to the Tower of London, built nearly 1,000 years ago during the reign of William the Conqueror.",
          dropLocation: destination,
          inclusions: packMangInclusion.split(','),
          exclusions: packMangExclusion.split(','),
          overviewOneBrief: [
            {
              "name": "Free cancellation",
              "brief": "Cancel up to 7 days in advance to receive a full refund",
              "icon": "slash-circle"
            },
            {
              "name": "Mobile ticketing",
              "brief": "Use your phone or print your voucher",
              "icon": "ticket"
            },
            {
              "name": "Instant confirmation",
              "brief": "Don’t wait for the confirmation!",
              "icon": "lightning-charge"
            }
          ],
          overviewTwoBrief: [
            {
              "name": packageDuration,
              "brief": "Check availability.",
              "icon": "clock-history"
            },
            {
              "name": "Live tour guide in English",
              "brief": "English",
              "icon": "megaphone"
            }
          ],
          paymentPolicy: {
            bookingValidity: "From August 28, 2018 to April 30, 2025",
            cancelationPolicy: [
              "30 or more days before departure: 50% refund",
              "Between 29 and 15 days before departure: full refund"
            ]
          },
          termsAndConditions: [
            "The suggested itinerary is just a guide and can be changed by our local transporter at any time.",
            "Flight prices are subject to availability at the time of booking and may vary. The actual flight price may differ from the package price.",
            "Children under 2 years are included in the land package but will be charged separately for the flight ticket.",
            "The mentioned rates are just a offer. If there is a change in the number of passengers, the rates may change based on the final number of passengers with the updated price available.",
            "Please double-check the quotation for all requested options in the inclusions.",
            "We recommend upgrading the hotels to your preference and the star rating category."
          ],
          dayWiseItinerary: packMangItineraryList.map(o => ({ dayNumber: o.number, title: o.title, description: [{dayer: '', description: o.description}]})),
          detailedItinerary: [
            {
              dayNumber: 1,
              activities: [
                "Dhow Cruise"
              ],
              hotel: "Ramada Deira, 4-star, check-in for 4 nights",
              stars: 4
            },
            {
              dayNumber: 2,
              activities: [
                "Dubai city tour",
                "Visit to the 124th Floor of Burj Khalifa"
              ],
              hotel: "Ramada Deira, 4-star",
              stars: 4
            },
            {
              dayNumber: 3,
              activities: [
                "Desert Safari"
              ],
              hotel: "Ramada Deira, 4-star",
              stars: 4
            },
            {
              dayNumber: 4,
              hotel: "Ramada Deira, 4-star",
              stars: 4
            },
            {
              dayNumber: 5,
              hotel: "Ramada Deira, 4-star, check-out",
              stars: 4
            }
          ]
        },
        hotelStar: 4,
        sacred: 'Hajj',
        food: 'Non Veg',
        tourFocus: ['tourFocus4'],
        language: ['english'],
        specialAmenities: ['sp4', 'sp2'],
        vehicles: ['Sedan', 'SUV'],
        meals: ['meals4']

      }
    };

    if (type === vendorsLogin.login && mobile && !otp) {

      const config = otpConfig({ url: otpURL, mobile });
      // console.log('responsevenconfigdos', config);
      const response = await axiosInstance.request(config);
      console.log('responsevendos', response);
      const { status, data } = response;
      // console.log('responsevestatus, datastatus, data ndos', status, data);

      // res.status(c200).send({ ...vendorsLogin.isOTP });
      if (data.status === yS && data.transactionId) {
        return res.status(c200).send({ ...vendorsLogin.isOTP });
      } else if ('error' === data.split('|')[0].split('=')[1].trim() && data.split('|')[1].split('=')[0].trim() === 'errorCode' && data.split('|')[2].split('=')[0].trim() === 'reason') {
        return res.status(c200).send({ ...vendorsLogin.noOTP, message: data.split('|')[2].split('=')[1].trim() });
      } else {
        return res.status(c200).send({ ...vendorsLogin.noOTP });
      }
    } else if (type === vendorsLogin.login && mobile && otp) {

      const config = otpVerifyConfig({ url: otpURL, mobile, otp });
      const response = await axiosInstance.request(config);
      console.log('responsevendos ewewewr', response);
      const { status, data } = response;
      // console.log('responsevestatus, datastatus, datawerwer ndoswerwrw', status, data);
      // return res.status(c200).send({ ...vendorsLogin.verified });
      if (data.status === yS && data.transactionId) {
        return res.status(c200).send({ ...vendorsLogin.verified });
      } else if (data.status === nS && data.statusCode === '307') {
        return res.status(c200).send({ ...vendorsLogin.expired })
      } else if (data.status === nS && data.statusCode === '309') {
        return res.status(c200).send({ ...vendorsLogin.expired, message: data.reason })
      } else {
        return res.status(c200).send({ ...vendorsLogin.notVerified });
      }
    } else if (type === pilgrimageBooking.pilgrimageBookingCreate) {

      // Create new pilgrimage booking data
      const newPilgrimageBooking = await createPilgrimageBooking({
        userMobile,
        pilBookVendorName,
        pilBookMobile,
        pilBookEmail,
        pilBookDocumentStatus,
        pilBookStatus,
        pilBookVendorCount,
        pilBookPackageName,
        pilBookFromDate,
        pilBookToDate,
        pilBookTravelersList
      });
      await saveInDB(newPilgrimageBooking);

      res.status(c200).send({ ...pilgrimageBooking.created });
    } else if (type === pilgrimageBooking.pilgrimageBookingUpdate) {
      console.log('!!!!!!!!!!!@@!@!@', pilgrimageBooking.pilgrimageBookingUpdate);
      // Update exist pilgrimage booking data
      const result = await updatePilgrimageBooking(pilgrimageBookingId, {
        userMobile,
        pilBookVendorName,
        pilBookMobile,
        pilBookEmail,
        pilBookDocumentStatus,
        pilBookStatus,
        pilBookVendorCount,
        pilBookPackageName,
        pilBookFromDate,
        pilBookToDate,
        pilBookTravelersList
      });

      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...pilgrimageBooking.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...pilgrimageBooking.notUpdated });
      } else {
        return res.status(c200).send({ ...pilgrimageBooking.notFound });
      }
    } else if (type === pilgrimageBooking.pilgrimageBookingFetchAll) {

      // Fetch all pilgrimage bookings data
      // console.log('###############3333333333333***********');
      const pilgrimageBookingsAll = await getAllPilgrimageBooking({}, { 'pilBookTravelersList': 0 });
      // console.log('###############3333333333333', pilgrimageBookingsAll);

      if (!pilgrimageBookingsAll || pilgrimageBookingsAll.length == 0) {
        res.status(c200).send({ ...pilgrimageBooking.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: pilgrimageBookingsAll
        });
      }
    } else if (type === pilgrimageBooking.pilgrimageBookingFetch) {

      // Fetch pilgrimage booking data
      // console.log('###############3333333333333***********');
      const result = await getPilgrimageBooking({ _id: pilgrimageBookingId });
      // console.log('###############3333333333pilgrimageBooking333result', result);

      if (!result) {
        return res.status(c200).send({ ...pilgrimageBooking.noPackage });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === pilgrimageBooking.pilgrimageBookingDelete) {

      // Delete the document by ID
      const result = await deletePilgrimageBooking(pilgrimageBookingId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...pilgrimageBooking.deleted });
      } else {
        return res.status(c200).send({ ...pilgrimageBooking.notFound });
      }
    } else if (type === hotelBooking.hotelBookingCreate) {

      // Create new hotel booking data
      const newHotelBooking = await createHotelBooking({
        userMobile,        
        ishotelHalalCertificate,
        hotelExclusions,
        hotelInclusions,
        hotelRoomsList,
        hotelPaymentOptions,
        hotelStarRating,
        hotelHalalCertificate,
        hotelBlackOutDates,
        hotelEmail,
        hotelContact,
        hotelLocation,
        hotelName
      });
      await saveInDB(newHotelBooking);

      res.status(c200).send({ ...hotelBooking.created });
    } else if (type === hotelBooking.hotelBookingUpdate) {
      console.log('!!!!!!!!!!!@@!@!@', hotelBooking.hotelBookingUpdate);
      // Update exist hotel booking data
      const result = await updateHotelBooking(hotelBookingId, {
        userMobile,
        hotelExclusions,
        ishotelHalalCertificate,
        hotelInclusions,
        hotelRoomsList,
        hotelPaymentOptions,
        hotelStarRating,
        hotelHalalCertificate,
        hotelBlackOutDates,
        hotelEmail,
        hotelContact,
        hotelLocation,
        hotelName
      });

      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...hotelBooking.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...hotelBooking.notUpdated });
      } else {
        return res.status(c200).send({ ...hotelBooking.notFound });
      }
    } else if (type === hotelBooking.hotelBookingFetchAll) {  
      try {
        const callingforSearchHotel = async() => {
          await refreshAmadeusToken();
          console.log('###############3333333333333***********', { url: amadeusHotelURL, hotelTypeKey, hotelSearch });
          const config = hotelConfig({ url: amadeusHotelURL, hotelTypeKey, hotelSearch });
          const response = await axiosInstance.request(config);
          const data = response?.data?.data || [];
          res.status(c200).send({ data, status: yS });
        }
        callingforSearchHotel();
      } catch (error) {
        // console.error('from error');
        const response = await refreshAmadeusToken();
        // console.error('from error', response);
        if (typeof response === 'string') {
          callingforSearchHotel();
        }
        return res.status(c500).send({ ...hotelBooking.error });
      }
      
    } else if (type === hotelBooking.hotelBookingFetch) {
      try {
        const callingforHotelDetails = async() => {
          // await refreshAmadeusToken();
          const config = hotelDetailsConfig({ url: amadeusHotelDetailsURL, hotelBookingId: 'ALBLR275' });
          const config2 = hotelRatingConfig({ url: amadeusHotelRatingURL, hotelBookingId: 'ADNYCCTB' });
          const response = await axiosInstance.request(config);
          const response2 = await axiosInstance.request(config2);
          // console.log('responseresponseresponseresponse', response?.data?.data);
          // console.log('responseresponseresponseresponse', response2);
          const data = response?.data?.data || [];
          const data2 = response2?.data?.data || [];
          res.status(c200).send({ data: { hotelDetailArray: data, hotelRatingArray: data2 }, status: yS });
        }
        callingforHotelDetails();
      } catch (error) {
        // console.error('from error');
        const response = await refreshAmadeusToken();
        // console.error('from error', response);
        if (typeof response === 'string') {
          callingforHotelDetails();
        }
        return res.status(c500).send({ ...hotelBooking.error });
      }
    } else if (type === hotelBooking.hotelBookingDelete) {

      // Delete the document by ID
      const result = await deleteHotelBooking(hotelBookingId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...hotelBooking.deleted });
      } else {
        return res.status(c200).send({ ...hotelBooking.notFound });
      }
    } else if (type === packageManagement.packageManagementUpdate) {
      console.log('!!!!!!!!!!!@@!@!@', packageManagement.packageManagementUpdate);
      // Update exist pilgrimage booking data
      const result = await updatePackageManagement(packageManagementId, {        
        userMobile,
        packageName,
        departure,
        destination,
        price,
        packageDuration,
        packMangGroupSize,
        days,
        nights,
        totalNights,
        packMangDocumentsRequired,
        transportation,
        facilities,
        packMangHajjDates,
        packMangUmrahDates,
        packMangUploadImages,
        dateRange,
        packMangInclusion,
        packMangExclusion,
        packMangItineraryList,
        ...extra()
      });

      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...packageManagement.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...packageManagement.notUpdated });
      } else {
        return res.status(c200).send({ ...packageManagement.notFound });
      }
    } else if (type === packageManagement.packageManagementFetch) {

      // Fetch packageManagement data
      const result = await getPackageManagement({ _id: packageManagementId });
      // console.log('###############packageManagement', result);

      if (!result) {
        return res.status(c200).send({ ...packageManagement.noPackage });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === packageManagement.packageManagementDelete) {

      // Delete the document by ID
      const result = await deletePackageManagement(packageManagementId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...packageManagement.deleted });
      } else {
        return res.status(c200).send({ ...packageManagement.notFound });
      }
    } else if (type === packageManagement.packageManagementCreate) {

      // Create new pilgrimage booking data
      const newPackageManagement = await createPackageManagement({
        userMobile,
        packageName,
        departure,
        destination,
        price,
        packageDuration,
        packMangGroupSize,
        days,
        nights,        
        totalNights,
        packMangDocumentsRequired,
        transportation,
        facilities,
        packMangHajjDates,
        packMangUmrahDates,
        packMangUploadImages,
        dateRange,
        packMangInclusion,
        packMangExclusion,
        packMangItineraryList,
        ...extra()
      });
      await saveInDB(newPackageManagement);

      res.status(c200).send({ ...packageManagement.created });
    } else if (type === packageManagement.packageManagementFetchAll) {
      // console.log('###############3333333333333***********@@@@@@@@@');
      const result = await getAllPackageManagement();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...packageManagement.failed });
      } else {
        
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === cab.cabPromotionUpdate) {
      // Update exist pilgrimage booking data
      const result = await updateCabPromotion(cabPromotionId, {      
        cabPromoCode,
        cabPromoType,
        cabAssignTo,
        cabPromoEngine
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...cab.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...cab.notUpdated });
      } else {
        return res.status(c200).send({ ...cab.notFound });
      }
    } else if (type === cab.cabPromotionFetch) {
      const result = await getCabPromotion({ _id: cabPromotionId });

      if (!result) {
        return res.status(c200).send({ ...cab.noCabPromotion });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === cab.cabPromotionDelete) {
      // Delete the document by ID
      const result = await deleteCabPromotion(cabPromotionId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...cab.deleted });
      } else {
        return res.status(c200).send({ ...cab.notFound });
      }
    } else if (type === cab.cabPromotionCreate) {
      // Create new pilgrimage booking data
      const newCabPromotion = await createCabPromotion({
        cabPromoCode,
        cabPromoType,
        cabAssignTo,
        cabPromoEngine
      });
      await saveInDB(newCabPromotion);

      res.status(c200).send({ ...cab.created });
    } else if (type === cab.cabPromotionFetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllCabPromotion();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...cab.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === fleet.fleetManagementUpdate) {
      // Update exist pilgrimage booking data
      const result = await updateFleetManagement(fleetManagementId, {      
        cabVehicleName,
        cabAssignDriver,
        cabVehicleType,
        cabVehicleNumber,
        cabVehicleSeating,
        cabVehicleFeatures,
        cabAirportPricing,
        cabCityTourPricing
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...fleet.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...fleet.notUpdated });
      } else {
        return res.status(c200).send({ ...fleet.notFound });
      }
    } else if (type === fleet.fleetManagementFetch) {
      const result = await getFleetManagement({ _id: fleetManagementId });

      if (!result) {
        return res.status(c200).send({ ...fleet.noFleetManagement });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === fleet.fleetManagementDelete) {
      // Delete the document by ID
      const result = await deleteFleetManagement(fleetManagementId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...fleet.deleted });
      } else {
        return res.status(c200).send({ ...fleet.notFound });
      }
    } else if (type === fleet.fleetManagementCreate) {
      // Create new pilgrimage booking data
      const newFleetManagement = await createFleetManagement({
        cabVehicleName,
        cabAssignDriver,
        cabVehicleType,
        cabVehicleNumber,
        cabVehicleSeating,
        cabVehicleFeatures,
        cabAirportPricing,
        cabCityTourPricing
      });
      await saveInDB(newFleetManagement);

      res.status(c200).send({ ...fleet.created });
    } else if (type === fleet.fleetManagementFetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllFleetManagement();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...fleet.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === driver.driverManagementUpdate) {
      // Update exist pilgrimage booking data
      const result = await updateDriverManagement(driverManagementId, {      
        cabDriverName,
        cabMobileNumber,
        cabLicense,
        cabTagCar,
        cabPayment,
        cabRating,
        cabJoinDate,
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...driver.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...driver.notUpdated });
      } else {
        return res.status(c200).send({ ...driver.notFound });
      }
    } else if (type === driver.driverManagementFetch) {
      const result = await getDriverManagement({ _id: driverManagementId });

      if (!result) {
        return res.status(c200).send({ ...driver.noDriverManagement });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === driver.driverManagementDelete) {
      // Delete the document by ID
      const result = await deleteDriverManagement(driverManagementId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...driver.deleted });
      } else {
        return res.status(c200).send({ ...driver.notFound });
      }
    } else if (type === driver.driverManagementCreate) {
      // Create new pilgrimage booking data
      const newDriverManagement = await createDriverManagement({
        cabDriverName,
        cabMobileNumber,
        cabLicense,
        cabTagCar,
        cabPayment,
        cabRating,
        cabJoinDate
      });
      await saveInDB(newDriverManagement);

      res.status(c200).send({ ...driver.created });
    } else if (type === driver.driverManagementFetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllDriverManagement();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...driver.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === restaurantMenu.update) {
      // Update exist pilgrimage booking data
      const result = await updateRestaurantMenu(restaurantMenuId, {      
        restaurantItemName,
        restaurantMenuType,
        restaurantMenuPhoto,
        restaurantMenuHalalCertification,
        restaurantMenuDescription,
        restaurantMenuAvailability
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...restaurantMenu.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...restaurantMenu.notUpdated });
      } else {
        return res.status(c200).send({ ...restaurantMenu.notFound });
      }
    } else if (type === restaurantMenu.fetch) {
      const result = await getRestaurantMenu({ _id: restaurantMenuId });

      if (!result) {
        return res.status(c200).send({ ...cab.noRestaurantMenu });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === restaurantMenu.delete) {
      // Delete the document by ID
      const result = await deleteRestaurantMenu(restaurantMenuId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...restaurantMenu.deleted });
      } else {
        return res.status(c200).send({ ...restaurantMenu.notFound });
      }
    } else if (type === restaurantMenu.create) {
      // Create new pilgrimage booking data
      const newRestaurantMenu = await createRestaurantMenu({
        restaurantItemName,
        restaurantMenuType,
        restaurantMenuPhoto,
        restaurantMenuHalalCertification,
        restaurantMenuDescription,
        restaurantMenuAvailability
      });
      await saveInDB(newRestaurantMenu);

      res.status(c200).send({ ...restaurantMenu.created });
    } else if (type === restaurantMenu.fetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllRestaurantMenu();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...restaurantMenu.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === restaurant.update) {
      // Update exist pilgrimage booking data
      const result = await updateRestaurantPromotion(restaurantPromotionId, {      
        restaurantPromoCode,
        restaurantPromoType,
        restaurantAssignTo,
        restaurantPromoEngine
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...restaurant.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...restaurant.notUpdated });
      } else {
        return res.status(c200).send({ ...restaurant.notFound });
      }
    } else if (type === restaurant.fetch) {
      const result = await getRestaurantPromotion({ _id: restaurantPromotionId });

      if (!result) {
        return res.status(c200).send({ ...restaurant.noRestaurantPromotion });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    } else if (type === restaurant.delete) {
      // Delete the document by ID
      const result = await deleteRestaurantPromotion(restaurantPromotionId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...restaurant.deleted });
      } else {
        return res.status(c200).send({ ...restaurant.notFound });
      }
    } else if (type === restaurant.create) {
      // Create new pilgrimage booking data
      const newRestaurantPromotion = await createRestaurantPromotion({
        restaurantPromoCode,
        restaurantPromoType,
        restaurantAssignTo,
        restaurantPromoEngine
      });
      await saveInDB(newRestaurantPromotion);

      res.status(c200).send({ ...restaurant.created });
    } else if (type === restaurant.fetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllRestaurantPromotion();
      // console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...restaurant.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === cabBooking.cabBookingUpdateReview) {
      // Update exist pilgrimage booking data
      const result = await updateCabBookingReview(cabBookingId, {
        cabBookReview: cabBookReviewUpdate
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...cabBooking.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...cabBooking.notUpdated });
      } else {
        return res.status(c200).send({ ...cabBooking.notFound });
      }
    } else if (type === cabBooking.cabBookingFetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllCabBooking();
      console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...cabBooking.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else if (type === restaurantPayment.fetchAll) {
      console.log('@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      const result = await getAllRestaurantPayment();
      console.log('###############3333333333333***********', result);
      if (!result || result.length == 0) {
        res.status(c200).send({ ...restaurantPayment.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: result
        });
      }
    } else {
      return res.status(c500).send({ ...pilgrimageBooking.errorType });
    }
  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...pilgrimageBooking.error });
  }
};
