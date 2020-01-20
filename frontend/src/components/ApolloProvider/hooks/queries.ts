import { useLazyQuery } from '@apollo/react-hooks';
import { GET_LOGGED_IN_DATA } from '../gql/user';

//
// User
//

export const useLoggedInQuery = () => useLazyQuery(GET_LOGGED_IN_DATA);
