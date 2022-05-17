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