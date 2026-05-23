// src/utils/helper/getUser.ts

import { jwtDecode } from 'jwt-decode';

type User = {
  id: number;
  name: string;
  email: string;
};

export function getUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('Session='));

  if (!cookie) {
    return null;
  }

  const token = cookie.split('=')[1];

  try {
    return jwtDecode<User>(token);
  } catch {
    return null;
  }
}
