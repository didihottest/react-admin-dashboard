const reducer = (state = false, action) => {
  switch (action.type) {
    case "dark_mode":
      return action.payload
    case "light_mode":
      return action.payload
    case "toggle":
      return !state
    default:
      return state
  }
}

export default reducer