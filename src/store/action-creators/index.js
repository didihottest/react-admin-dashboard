export const lightMode = () => {
  return (dispatch) => {
    dispatch({
      type: "light_mode",
      payload: false
    })
  }
}

export const darkMode = () => {
  return (dispatch) => {
    dispatch({
      type: "dark_mode",
      payload: true
    })
  }
}

export const toggle = (lastState) => {
  return (dispatch) => {
    dispatch({
      type: "toggle",
      payload: lastState
    })
  }
}

export const fullfillUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: user
    })
  }
}

export const clearUser = () => {
  return (dispatch) => {
    dispatch({
      type: "logout",
      payload: null
    })
  }
}
