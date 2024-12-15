const { constant } = require('../constant');
const {
  createPilgrimageBooking,
  createPackageManagement,
  getPilgrimageBooking,
  getPackageManagement,
  getAllPilgrimageBooking,
  getAllPackageManagement,
  deletePilgrimageBooking,
  deletePackageManagement,
  updatePilgrimageBooking,
  updatePackageManagement,
  saveInDB,
} = require('../mongo');
const { callAxiosInstance } = require('../middleware/axios');
const { otpConfig, otpVerifyConfig } = require('../utils');

exports.vendors = async (req, res) => {
  const { 
    otpURL,
    c200, 
    c500, 
    yS, 
    nS,
    pilgrimageBooking, 
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
      packMangPackageName,
      packMangPrice,
      packMangGroupSize,
      packMangAccomodation,
      packMangDocumentsRequired,
      packMangTransportation,
      packMangHajjDates,
      packMangUmrahDates,
      packMangInclusion,
      packMangExclusion,  
      packMangItineraryList,
      packageManagementId,
      mobile,
      otp
    } = req.body;
    console.log('mobile, otp', type, mobile, otp);
    if (type === vendorsLogin.login && mobile && !otp ) {
      
      const config = otpConfig({ url: otpURL, mobile });
      // console.log('responsevenconfigdos', config);
      const response = await axiosInstance.request(config);
      // console.log('responsevendos', response);
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
    } else if (type === vendorsLogin.login && mobile && otp ) {
      
      const config = otpVerifyConfig({ url: otpURL, mobile, otp });
      const response = await axiosInstance.request(config);
      // console.log('responsevendos ewewewr', response);
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
    } else if (type === packageManagement.packageManagementUpdate) {
      console.log('!!!!!!!!!!!@@!@!@', packageManagement.packageManagementUpdate);
      // Update exist pilgrimage booking data
      const result = await updatePackageManagement(packageManagementId, {
        userMobile,
        packMangPackageName,
        packMangPrice,
        packMangGroupSize,
        packMangAccomodation,
        packMangDocumentsRequired,
        packMangTransportation,
        packMangHajjDates,
        packMangUmrahDates,
        packMangInclusion,
        packMangExclusion,  
        packMangItineraryList
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
        packMangPackageName,
        packMangPrice,
        packMangGroupSize,
        packMangAccomodation,
        packMangDocumentsRequired,
        packMangTransportation,
        packMangHajjDates,
        packMangUmrahDates,
        packMangInclusion,
        packMangExclusion,  
        packMangItineraryList
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
