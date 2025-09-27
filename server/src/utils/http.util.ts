import APP_CONFIG from '@/config/app.config';
import { match } from 'path-to-regexp';

const isAdmin = (url: string) => {
  return APP_CONFIG.URL.ALLOW.ADMIN.some((pattern) =>
    match(pattern, { decode: decodeURIComponent })(url),
  );
};
const isGuest = (url: string) => {
  return APP_CONFIG.URL.ALLOW.GUEST.some((pattern) =>
    match(pattern, { decode: decodeURIComponent })(url),
  );
};

const isFree = (url: string) => {
  return APP_CONFIG.URL.FREE.some((pattern) =>
    match(pattern, { decode: decodeURIComponent })(url),
  );
};

export { isAdmin, isGuest, isFree };
