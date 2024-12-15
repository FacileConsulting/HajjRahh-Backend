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
      notReg: {
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