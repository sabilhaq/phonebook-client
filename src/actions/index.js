import { v4 as uuidv4 } from 'uuid';
import {
  LOAD_PHONEBOOK,
  LOAD_PHONEBOOK_SUCCESS,
  LOAD_PHONEBOOK_FAILURE,
  ADD_PHONEBOOK,
  ADD_PHONEBOOK_SUCCESS,
  ADD_PHONEBOOK_FAILURE,
  RESEND_PHONEBOOK_SUCCESS,
  RESEND_PHONEBOOK_FAILURE,
  REMOVE_PHONEBOOK_SUCCESS,
  REMOVE_PHONEBOOK_FAILURE,
  EDIT_PHONEBOOK_SUCCESS,
  EDIT_PHONEBOOK_FAILURE,
} from '../constant';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const loadPhonebookFetching = (refreshing) => ({
  type: LOAD_PHONEBOOK,
  refreshing,
});

const loadPhonebookSuccess = (phonebooks) => ({
  type: LOAD_PHONEBOOK_SUCCESS,
  phonebooks,
});

const loadPhonebookFailure = () => ({
  type: LOAD_PHONEBOOK_FAILURE,
});

export const fetchPhonebook = () => {
  return (dispatch) => {
    return dispatch(loadPhonebookFetching());
  };
};

export const loadPhonebook = (queryString) => {
  let stringQuery = '';

  if (queryString && (queryString.name || queryString.phone)) {
    stringQuery = `(input: ${JSON.stringify(queryString)})`;
    stringQuery = stringQuery.replace(`"name"`, 'name');
    stringQuery = stringQuery.replace(`"phone"`, 'phone');
  }

  return (dispatch) => {
    client
      .query({
        query: gql`
          {
            getPhonebooks${stringQuery} {
              id
              name
              phone
            }
          }
        `,
      })
      .then((result) => {
        dispatch(loadPhonebookSuccess(result.data.getPhonebooks));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadPhonebookFailure());
      });
  };
};

const drawAddPhonebook = (id, name, phone) => ({
  type: ADD_PHONEBOOK,
  id,
  name,
  phone,
});

const addPhonebookSuccess = (oldId, phonebook) => ({
  type: ADD_PHONEBOOK_SUCCESS,
  oldId,
  phonebook,
});

const addPhonebookFailure = (id) => ({
  type: ADD_PHONEBOOK_FAILURE,
  id,
});

export const addPhonebook = (name, phone) => {
  const id = uuidv4();
  return (dispatch) => {
    dispatch(drawAddPhonebook(id, name, phone));

    client
      .mutate({
        mutation: gql`
          mutation {
            createPhonebook(input: { name: "${name}", phone: "${phone}" }) {
              id
              name
              phone
            }
          }
        `,
      })
      .then((result) => {
        dispatch(addPhonebookSuccess(id, result.data.createPhonebook));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(addPhonebookFailure(id));
      });
  };
};

const resendPhonebookSuccess = (oldId, phonebook) => ({
  type: RESEND_PHONEBOOK_SUCCESS,
  oldId,
  phonebook,
});

const resendPhonebookFailure = () => ({
  type: RESEND_PHONEBOOK_FAILURE,
});

export const resendPhonebook = (oldId, name, phone) => {
  return (dispatch) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            createPhonebook(input: { name: "${name}", phone: "${phone}" }) {
              id
              name
              phone
            }
          }
        `,
      })
      .then((result) => {
        dispatch(resendPhonebookSuccess(oldId, result.data.createPhonebook));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(resendPhonebookFailure());
      });
  };
};

const removePhonebookSuccess = (id) => ({
  type: REMOVE_PHONEBOOK_SUCCESS,
  id,
});

const removePhonebookFailure = () => ({
  type: REMOVE_PHONEBOOK_FAILURE,
});

export const removePhonebook = (id) => {
  return (dispatch) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            deletePhonebook(id: "${id}") {
              id
              name
              phone
            }
          }
        `,
      })
      .then((result) => {
        dispatch(removePhonebookSuccess(id));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(removePhonebookFailure());
      });
  };
};

const editPhonebookSuccess = (id, phonebook) => ({
  type: EDIT_PHONEBOOK_SUCCESS,
  id,
  phonebook,
});

const editPhonebookFailure = () => ({
  type: EDIT_PHONEBOOK_FAILURE,
});

export const editPhonebook = (id, name, phone) => {
  console.log({
    id,
    name,
    phone
  });
  return (dispatch) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            updatePhonebook(id: "${id}", input: { name: "${name}", phone: "${phone}" }) {
              id
              name
              phone
            }
          }
        `,
      })
      .then((result) => {
        dispatch(editPhonebookSuccess(id, result.data.updatePhonebook));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(editPhonebookFailure());
      });
  };
};
