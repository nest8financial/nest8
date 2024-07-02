const editUser = (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_USER_FIRST_NAME':
        return {...state, first_name: action.payload}
      case 'UPDATE_USER_LAST_NAME':
        return {...state, last_name: action.payload}
        case 'UPDATE_USER_COMPANY':
        return {...state, company: action.payload}
        case 'UPDATE_USER_INDUSTRY':
        return {...state, industry_id: action.payload}
        case 'UPDATE_USER_EMAIL':
        return {...state, username: action.payload}
        case 'SET_EDIT_USER':
            return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default editUser;