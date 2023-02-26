export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        fetching: true,
        error: false,
        notification: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        fetching: false,
        error: false,
        notification: "You have logged in successfully",
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        fetching: false,
        error: action.payload.error,
        notification: action.payload.notification,
      };

    case "LOGOUT":
      return {
        user: null,
        fetching: null,
        error: false,
        notification: "You have been logged out",
      };

    case "ACCOUNT_CREATED":
      return {
        user: null,
        fetching: false,
        error: false,
        notification: "Account created successfully",
      };

    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: null,
      };

    default:
      break;
  }
};
