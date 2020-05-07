import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  refreshToken: environment.base_url + 'token/refresh/',
  userProfile: environment.base_url + 'users/user/me/'
};

export const PRODUCT_APIS = {
  product: environment.base_url + 'products/product/'
};
