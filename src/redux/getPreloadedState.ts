import { getCookie } from 'cookies-next';
import { CookieType } from '@/enums';

export const getPreloadedState = () => {
  const token = getCookie(CookieType.TOKEN);
  const renew_token = getCookie(CookieType.RENEW_TOKEN);
  const defalutValue = {
    auth: {
      access_token: (token ? token : null) as string | null,
      renew_token: (renew_token ? renew_token : null) as string | null
    },
  };
  return defalutValue;
};
