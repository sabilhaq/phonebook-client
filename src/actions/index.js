// import { v4 as uuidv4 } from 'uuid';
import { LOAD_PHONEBOOK_SUCCESS, LOAD_PHONEBOOK_FAILURE, LOAD_PHONEBOOK } from '../constant';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const loadPhonebookFetching = refreshing => ({
  type: LOAD_PHONEBOOK,
  refreshing
});

const loadPhonebookSuccess = phonebooks => ({
  type: LOAD_PHONEBOOK_SUCCESS,
  phonebooks,
});

const loadPhonebookFailure = () => ({
  type: LOAD_PHONEBOOK_FAILURE,
});

export const fetchPhonebook = () => {
  return dispatch => {
    return dispatch(loadPhonebookFetching());
  };
}

export const loadPhonebook = (queryString) => {
  let stringQuery = "";

  if (queryString && (queryString.name || queryString.phone)) {
    stringQuery = `(input: ${JSON.stringify(queryString)})`
    stringQuery = stringQuery.replace(`"name"`, "name")
    stringQuery = stringQuery.replace(`"phone"`, "phone")
  }

  return dispatch => {
    client
      .query({
        query: gql`
          query GetPhonebooks {
            getPhonebooks${stringQuery} {
              id
              name
              phone
            }
          }
        `,
      })
      .then(result => {
        dispatch(loadPhonebookSuccess(result.data.getPhonebooks));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadPhonebookFailure());
      });
  };
};
