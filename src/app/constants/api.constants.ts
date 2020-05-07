import {environment} from '../../environments/environment';

export const USER_APIS = {
  login: environment.base_url + 'token/',
  refreshToken: environment.base_url + 'token/refresh/',
  userProfile: environment.base_url + 'users/user/me/'
};


export const CONTACT_APIS = {
  contact: environment.base_url + 'contacts/contact/'
};


export const PRODUCT_APIS = {
  product: environment.base_url + 'products/product/'
};

export const CORE_APIS = {
  state: environment.base_url + 'core/state/',
  gst_slab: environment.base_url + 'core/gst_slab/',
  uom: environment.base_url + 'core/uom/',
};
