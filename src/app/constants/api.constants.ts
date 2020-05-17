import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  refreshToken: environment.base_url + 'token/refresh/',
  userProfile: environment.base_url + 'users/user/me/',

  user: environment.base_url + 'users/user/',
  roles: environment.base_url + 'users/roles/',
  change_password: 'change_password/',
};

export const PRODUCT_APIS = {
  product: environment.base_url + 'products/product/'
};

export const SHIFT_APIS = {
  detail: environment.base_url + 'shifts/detail/',
  entry: environment.base_url + 'shifts/entry/',
  approve: 'approve'
};

export const REPORT_APIS = {
  daily: environment.base_url + 'reports/daily_margin/'
};
