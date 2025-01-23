const constant = () => {
  const otpURL = 'https://unify.smsgateway.center/SMSApi/otp';
  const yS = 'success';
  const nS = 'error';
  return {
    otpURL,
    c200: 200,
    c500: 500,
    yS,
    nS,
    refreshToken: {
      error: {
        message: 'Error in /refreshToken',
        status: nS
      }
    },
    health: {
      valid: {
        message: 'Health API called successfully',
        status: yS
      },
      error: {
        message: 'Error in /health',
        status: nS
      }
    },
    airport: {
      error: {
        message: 'Error in /airport',
        status: nS
      }
    },
    trips: {
      notLoggedIn: {
        message: 'You are not loggedIn.',
        data: [],
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      noTrips: {
        message: 'No Trips available',
        data: [],
        status: yS
      },
      error: {
        message: 'Error in /trips',
        status: nS
      }

    },
    register: {
      noDups: {
        message: 'User already registered. Please Sign In',
        isDups: true,
        status: yS
      },
      valid: {
        message: 'User registered successfully',
        userCreated: true,
        status: yS
      },
      error: {
        message: 'Error in /register',
        status: nS
      }

    },
    login: {
      notLoggedIn: {
        message: 'User not logged In',
        userNotLoggedIn: true,
        status: yS
      },
      invalid: {
        message: 'Invalid password',
        invalidPassword: true,
        status: yS
      },
      invalidUser: {
        message: 'User not registered',
        invalidUser: true,
        status: yS
      },
      valid: {
        message: 'User logged in successfully',
        userLoggedIn: true,
        status: yS
      },
      error: {
        message: 'Error in /login',
        status: nS
      }

    },
    holidayBooking: {
      noPackage: {
        message: 'Holiday Package did not exist',
        invalidPackage: true,
        status: yS
      },
      error: {
        message: 'Error in /holidayBooking',
        status: nS
      }
    },
    myAccount: {
      editProfile: 'EDIT_PROFILE',
      changePassword: 'CHANGE_PASSWORD',
      notificationSetings: 'NOTIFICATION_SETTINGS',
      paymentMethod: 'PAYMENT_METHOD',
      passwordChanged: {
        message: 'Password changed successfully',
        passwordChanged: true,
        status: yS
      },
      errorUser: {
        message: 'Issue in user data fetch',
        status: nS
      },
      error: {
        message: 'Error in /myAccount',
        status: nS
      }
    },
    packageManagement: {
      packageManagementCreate: 'PACKAGE_MANAGEMENT_CREATE',
      packageManagementUpdate: 'PACKAGE_MANAGEMENT_UPDATE',
      packageManagementFetchAll: 'PACKAGE_MANAGEMENT_FETCH_ALL',
      packageManagementFetch: 'PACKAGE_MANAGEMENT_FETCH',
      packageManagementDelete: 'PACKAGE_MANAGEMENT_DELETE',
      deleted: {
        message: 'Package deleted successfully',
        deleted: true,
        status: yS
      },
      noPackage: {
        message: 'Package does not exit. Contact Admin',
        noPackage: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Package',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Package updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Package does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Package created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /packageManagement method',
        status: nS
      }
    },
    cab: {
      cabPromotionCreate: 'CAB_PROMOTION_CREATE',
      cabPromotionUpdate: 'CAB_PROMOTION_UPDATE',
      cabPromotionFetchAll: 'CAB_PROMOTION_FETCH_ALL',
      cabPromotionFetch: 'CAB_PROMOTION_FETCH',
      cabPromotionDelete: 'CAB_PROMOTION_DELETE',
      deleted: {
        message: 'Cab Promotion deleted successfully',
        deleted: true,
        status: yS
      },
      noCabPromotion: {
        message: 'Cab Promotion does not exit. Contact Admin',
        noCabPromotion: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Cab Promotion',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Cab Promotion updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Cab Promotion does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Cab Promotion created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /cabPromotion method',
        status: nS
      }
    },
    fleet: {
      fleetManagementCreate: 'FLEET_MANAGEMENT_CREATE',
      fleetManagementUpdate: 'FLEET_MANAGEMENT_UPDATE',
      fleetManagementFetchAll: 'FLEET_MANAGEMENT_FETCH_ALL',
      fleetManagementFetch: 'FLEET_MANAGEMENT_FETCH',
      fleetManagementDelete: 'FLEET_MANAGEMENT_DELETE',
      deleted: {
        message: 'Fleet Management deleted successfully',
        deleted: true,
        status: yS
      },
      noFleetManagement: {
        message: 'Fleet Management does not exit. Contact Admin',
        noCabPromotion: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Fleet Management',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Fleet Management updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Fleet Management does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Fleet Management created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /fleetManagement method',
        status: nS
      }
    },
    driver: {
      driverManagementCreate: 'DRIVER_MANAGEMENT_CREATE',
      driverManagementUpdate: 'DRIVER_MANAGEMENT_UPDATE',
      driverManagementFetchAll: 'DRIVER_MANAGEMENT_FETCH_ALL',
      driverManagementFetch: 'DRIVER_MANAGEMENT_FETCH',
      driverManagementDelete: 'DRIVER_MANAGEMENT_DELETE',
      deleted: {
        message: 'Driver Management deleted successfully',
        deleted: true,
        status: yS
      },
      noDriverManagement: {
        message: 'Driver Management does not exit. Contact Admin',
        noDriverManagement: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Driver Management',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Driver Management updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Driver Management does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Driver Management created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /driverManagement method',
        status: nS
      }
    },
    cabBooking: {
      cabBookingCreate: 'CAB_BOOKING_CREATE',
      cabBookingUpdateReview: 'CAB_BOOKING_UPDATE_REVIEW',
      cabBookingFetchAll: 'CAB_BOOKING_FETCH_ALL',
      cabBookingFetch: 'CAB_BOOKING_FETCH',
      review: {
        message: 'Review updated successfully',
        review: true,
        status: yS
      },
      deleted: {
        message: 'Cab Booking deleted successfully',
        deleted: true,
        status: yS
      },
      noCabBooking: {
        message: 'Cab Booking does not exit. Contact Admin',
        noCabBooking: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Cab Booking',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Cab Booking updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Cab Booking does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Cab Booking created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /cabBooking method',
        status: nS
      }
    },    
    restaurantMenu: {
      create: 'RESTAURANT_MENU_CREATE',
      update: 'RESTAURANT_MENU_UPDATE',
      fetchAll: 'RESTAURANT_MENU_FETCH_ALL',
      fetch: 'RESTAURANT_MENU_FETCH',
      delete: 'RESTAURANT_MENU_DELETE',
      deleted: {
        message: 'Restaurant Menu deleted successfully',
        deleted: true,
        status: yS
      },
      noRestaurantMenu: {
        message: 'Restaurant Menu does not exit. Contact Admin',
        noRestaurantMenu: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Restaurant Menu',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Restaurant Menu updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Restaurant Menu does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Restaurant Menu created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /restaurantMenu method',
        status: nS
      }
    },
    hotelBooking: {
      hotelBookingCreate: 'HOTEL_BOOKING_CREATE',
      hotelBookingUpdate: 'HOTEL_BOOKING_UPDATE',
      hotelBookingFetchAll: 'HOTEL_BOOKING_FETCH_ALL',
      hotelBookingFetch: 'HOTEL_BOOKING_FETCH',
      hotelBookingDelete: 'HOTEL_BOOKING_DELETE',
      deleted: {
        message: 'Booked Hotel deleted successfully',
        deleted: true,
        status: yS
      },
      noHotel: {
        message: 'Booked Hotel does not exit. Contact Admin',
        noPackage: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in booked hotel',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Hotel Booking updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Booked hotel does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Hotel Booked created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /hotelBooking method',
        status: nS
      }
    },
    pilgrimageBooking: {
      pilgrimageBookingCreate: 'PILGRIMAGE_BOOKING_CREATE',
      pilgrimageBookingUpdate: 'PILGRIMAGE_BOOKING_UPDATE',
      pilgrimageBookingFetchAll: 'PILGRIMAGE_BOOKING_FETCH_ALL',
      pilgrimageBookingFetch: 'PILGRIMAGE_BOOKING_FETCH',
      pilgrimageBookingDelete: 'PILGRIMAGE_BOOKING_DELETE',
      deleted: {
        message: 'Booking deleted successfully',
        deleted: true,
        status: yS
      },
      noPackage: {
        message: 'Booked package does not exit. Contact Admin',
        noPackage: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in booked package',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Pilgrimage Booking updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Booked package does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Pilgrimage Booking created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors API ',
        status: nS
      },
      error: {
        message: 'Error in /pilgrimageBooking method',
        status: nS
      }
    },
    vendorsLogin: {
      login: 'VENDORS_LOGIN',
      isOTP: {
        message: 'OTP sent successfully',
        isOTP: true,
        status: yS
      },
      noOTP: {
        message: 'OTP not generated. Please try again',
        noOTP: true,
        status: nS
      },
      verified: {
        message: 'OTP verified',
        verified: true,
        status: yS
      },
      expired: {
        message: 'OTP token is expired',
        expired: true,
        status: yS
      },
      notVerified: {
        message: 'OTP verification failed. Resend OTP',
        notVerified: true,
        status: yS
      },
      errorType: {
        message: 'Error in /vendors login API ',
        status: nS
      },
      error: {
        message: 'Error in /login method',
        status: nS
      }
    },
  }
}

module.exports = {
  constant
};