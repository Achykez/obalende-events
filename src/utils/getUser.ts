import { CookieType } from '@/enums';
import { IUser } from '@/redux/slices';
import { getCookie } from 'cookies-next';
import { useMemo } from 'react';

export const useGetUser = () => {
  const user: IUser | null = useMemo(() => {
    const userString = getCookie(CookieType.USER)?.toString();
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }, []);
  return user;
};

// export const useGetUserRoles = () => {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     const unparsedRole = localStorage.getItem(Constant.Roles);

//     if (unparsedRole) {
//       try {
//         const parsedRole = JSON.parse(unparsedRole);
//         return parsedRole;
//       } catch (error) {
//         console.error('Error parsing user roles:', error);
//       }
//     }
//   }

//   return null;
// };
