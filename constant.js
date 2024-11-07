const constant = () => {
  const yS = 'success';
  const nS = 'error';
  return {
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
    }
  }
}

module.exports = {
  constant
};