// import { cookies } from 'next/dist/client/components/headers';
// import { RedirectType } from 'next/dist/client/components/redirect';
// import { redirect } from 'next/navigation';
import { Home } from './home';
// import { CookieType } from '@/enums';

export default function page() {
  // const cookieStore = cookies();
  // const user = cookieStore.get(CookieType.USER);
  // if (!user?.value) {
  //   redirect('/login', RedirectType.replace);
  // }
  return <Home />;
}

