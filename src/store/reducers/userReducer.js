const reducer = (state = {
  firstName: "",
  lastName: "",
  email: "",
  token: ""
}, action) => {
  switch (action.type) {
    case "login":
      return {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        token: action.payload.token
      }
    case "logout":
      return {
        firstName: "",
        lastName: "",
        email: "",
        token: ""
      }
    default:
      return state
  }
}

export default reducer