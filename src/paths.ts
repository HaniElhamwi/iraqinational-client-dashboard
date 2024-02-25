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
    main: '/drinks/main',
    departments: '/drinks/departments',
    certifications: '/drinks/certifications',
    about: '/drinks/about',
  },
  category: {
    index: '/category',
    add: '/category/add',
  },
  transportation: {
    index: '/transportation',
    about: '/transportation/about',
  },
  grain: {
    index: '/grain',
    about: '/grain/about',
  },
  401: '/401',
  403: '/403',
  404: '/404',
  500: '/500',
  login: '/login',
};
