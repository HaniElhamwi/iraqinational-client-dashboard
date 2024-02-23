export const paths = {
  index: '/',
  products: {
    index: '/products',
    add: '/products/add',
    edit: (id: string) => `/products/edit/${id}`,
  },
  home: {
    index: '/home/add',
    // add: '/home/add',
    // edit: (id: string) => `/home/edit/${id}`,
  },
  users: {
    index: '/users',
    edit: (id: string) => `/users/edit/${id}`,
  },
  news: {
    index: '/news',
    edit: (id: string) => `/news/edit/${id}`,
    add: '/news/add',
  },
  drinks: {
    departments: '/drinks/departments',
  },
  category: {
    index: '/category',
    add: '/category/add',
  },
  401: '/401',
  403: '/403',
  404: '/404',
  500: '/500',
  login: '/login',
};
