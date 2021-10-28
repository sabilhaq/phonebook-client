import {
  LOAD_PHONEBOOK_SUCCESS,
  LOAD_PHONEBOOK_FAILURE,
  LOAD_PHONEBOOK,
  ADD_PHONEBOOK,
  ADD_PHONEBOOK_SUCCESS,
  ADD_PHONEBOOK_FAILURE,
  RESEND_PHONEBOOK_SUCCESS,
  RESEND_PHONEBOOK_FAILURE,
  EDIT_PHONEBOOK_SUCCESS,
  EDIT_PHONEBOOK_FAILURE,
  REMOVE_PHONEBOOK,
  REMOVE_PHONEBOOK_SUCCESS,
  REMOVE_PHONEBOOK_FAILURE,
} from '../constant';

const initialState = {
  phonebooks: [],
  requestInProgress: false,
  refreshing: false,
  error: null,

  deleteInProgress: { inProgress: false, newsId: '' }
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
      const phonebooks = action.phonebooks.map((item) => ({
        ...item,
        sent: true,
      }));
      return {
        ...state,
        phonebooks: phonebooks,
        refreshing: false,
        requestInProgress: false,
        error: null,
      };

    case ADD_PHONEBOOK:
      const newPhonebooks = [
        ...state.phonebooks,
        {
          id: action.id,
          name: action.name,
          phone: action.phone,
          sent: true,
        },
      ];

      return {
        ...state,
        phonebooks: newPhonebooks,
      };

    case ADD_PHONEBOOK_SUCCESS:
      const newPhonebooksSuccess = state.phonebooks.map((item) => {
        if (action.oldId === item.id) {
          item.id = action.phonebook.id;
        }
        return item;
      });

      return {
        ...state,
        phonebooks: newPhonebooksSuccess,
      };

    case ADD_PHONEBOOK_FAILURE:
      const newPhonebooksAgain = state.phonebooks.map((item) => {
        if (action.id === item.id) {
          item.sent = false;
        }
        return item;
      });
      return {
        ...state,
        phonebooks: newPhonebooksAgain,
      };

    case RESEND_PHONEBOOK_SUCCESS:
      const resendPhonebooksSuccess = state.phonebooks.map((item) => {
        if (action.oldId === item.id) {
          item.id = action.phonebook.id;
          item.sent = true;
        }
        return item;
      });

      return {
        ...state,
        phonebooks: resendPhonebooksSuccess,
      };

    case REMOVE_PHONEBOOK:
      return {
        ...state,
        deleteInProgress: {
          inProgress: true,
          newsId: action.id
        }
      };

    case REMOVE_PHONEBOOK_SUCCESS:
      const removePhonebooksSuccess = state.phonebooks.filter((item) => {
        return action.id !== item.id;
      });

      return {
        ...state,
        phonebooks: removePhonebooksSuccess,
      };

    case EDIT_PHONEBOOK_SUCCESS:
      const editPhonebooksSuccess = state.phonebooks.map((item) => {
        if (action.id === item.id) {
          item.name = action.phonebook.name;
          item.phone = action.phonebook.phone;
        }
        return item;
      });

      return {
        ...state,
        phonebooks: editPhonebooksSuccess,
      };

    case RESEND_PHONEBOOK_FAILURE:
    case EDIT_PHONEBOOK_FAILURE:
    case REMOVE_PHONEBOOK_FAILURE:
    case LOAD_PHONEBOOK_FAILURE:
    default:
      return state;
  }
};

export default phonebooks;
