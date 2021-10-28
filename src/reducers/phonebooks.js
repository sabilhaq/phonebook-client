import { LOAD_PHONEBOOK_SUCCESS, LOAD_PHONEBOOK_FAILURE, LOAD_PHONEBOOK } from '../constant';

const initialState = {
  phonebooks: [],
  requestInProgress: false,
  refreshing: false,
  error: null,
};

const phonebooks = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PHONEBOOK:
      return {
        ...state,
        refreshing: action.refreshing,
        requestInProgress: true,
        error: null,
      };
    case LOAD_PHONEBOOK_SUCCESS:
      const phonebooks = action.phonebooks.map(item => ({
        ...item,
        sent: true,
      }));
      return {
        ...state,
        phonebooks: phonebooks,
        refreshing: false,
        requestInProgress: false,
        error: null
      }

    case 'POST_PHONEBOOK':
      return [
        ...state,
        {
          id: action.id,
          author: action.author,
          message: action.message,
          sent: true,
        },
      ];

    case LOAD_PHONEBOOK_FAILURE:
    default:
      return state;
  }
};

export default phonebooks;
