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

exports.vendors = async (req, res) => {
  const { c200, c500, yS, pilgrimageBooking, packageManagement } = constant();
  try {
    const {
      type,
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
    } = req.body;

    if (type === pilgrimageBooking.pilgrimageBookingCreate) {

      // Create new pilgrimage booking data
      const newPilgrimageBooking = await createPilgrimageBooking({
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
    }else if (type === packageManagement.packageManagementCreate) {

      // Create new pilgrimage booking data
      const newPackageManagement = await createPackageManagement({
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
