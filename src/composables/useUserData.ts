import { useQuery } from 'react-query';

import type User from '@/types/User';
import type Account from '@/types/Account';
import type Contact from '@/types/Contact';

type LoggedUser = {
    user: User;
    account: Account;
    contact: Contact;
}

const getUser = async (): Promise<LoggedUser> => {
    const res = await fetch(`/api/platform/custom/logged-contact${import.meta.env.DEV ? '.json' : ''}`)
    
    if (!res.ok) {
        throw new Error('User network response error')
    }
    
    return await res.json()
}

export const useUserData = () => {
    const { data, isFetched, isLoading } = useQuery(`user`, getUser);
    return { userData: data, userIsFetched: isFetched, userIsLoading: isLoading };
}
