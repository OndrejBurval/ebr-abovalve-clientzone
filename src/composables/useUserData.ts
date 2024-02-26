import { useQuery } from 'react-query';
import userJson from '@/api/test/loggedContact.json';

import type User from '@/types/User';
import type Account from '@/types/Account';
import type Contact from '@/types/Contact';

type LoggedUser = {
    user: User;
    account: Account;
    contact: Contact;
}

const getUser = async (): Promise<LoggedUser> => {
    return new Promise((resolve) => {
		setTimeout(() => {
			resolve(userJson);
		}, 500);
	});
}

export const useUserData = () => {
    const { data, isFetched, isLoading } = useQuery(`user`, getUser);
    return { userData: data, userIsFetched: isFetched, userIsLoading: isLoading };
}
