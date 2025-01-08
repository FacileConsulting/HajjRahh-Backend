const { constant } = require('../constant');
const {
  createPilgrimageBooking,
  createHotelBooking,
  createPackageManagement,
  getPilgrimageBooking,
  getHotelBooking,
  getPackageManagement,
  getAllPilgrimageBooking,
  getAllHotelBooking,
  getAllPackageManagement,
  deletePilgrimageBooking,
  deleteHotelBooking,
  deletePackageManagement,
  updatePilgrimageBooking,
  updateHotelBooking,
  updatePackageManagement,
  saveInDB,
} = require('../mongo');

const {
  amadeusHotelURL,
  amadeusHotelDetailsURL,
  amadeusHotelRatingURL,
  refreshAmadeusToken,
} = require('../middleware/amadeusMiddleware');

const { callAxiosInstance } = require('../middleware/axios');
const { otpConfig, otpVerifyConfig, hotelConfig, hotelDetailsConfig, hotelRatingConfig } = require('../utils');

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
    } else {
      return res.status(c500).send({ ...pilgrimageBooking.errorType });
    }
  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...pilgrimageBooking.error });
  }
};
