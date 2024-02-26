import Link from 'next/link';
import { useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';

import 'tippy.js/dist/tippy.css';

import { paths } from '@/paths';
import { PAGE_SIZES } from '@/constant';
import { ProductSearch, useDeleteProduct, useGetProducts } from '@/hooks';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconTrash from '@/components/icon/IconTrash';
import Swal from 'sweetalert2';

const Products = () => {
  const { t } = useTranslation('product');
  const [lan, setLan] = useState('en');

  const [search, setSearch] = useState<ProductSearch>({
    page: 1,
    limit: PAGE_SIZES[0],
    search: '',
    direction: 'ASC',
  });
  const { deleteProduct } = useDeleteProduct();
  const [sortedData, setSorted] = useState([]);

  const { data, isLoading } = useGetProducts(search?.page, search.limit, search?.search, search.direction);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Products'));
  });

  const handleSortedData = () => {
    if (data?.length) {
      // sort about limit page
      const start = (search.page - 1) * search.limit;
      const end = start + search.limit;
      const sorted = data.slice(start, end);
      setSorted(sorted);
    }
  };

  const handleProductsSearch = () => {
    if (data?.length) {
      const filtered = data.filter((item: any) => {
        return item.title[lan].toLowerCase().includes(search.search.toLowerCase());
      });
      setSorted(filtered);
    }
  };

  useEffect(() => {
    if (data?.length) {
      handleProductsSearch();
    }
  }, [search?.search]);

  useEffect(() => {
    if (data?.length) {
      handleSortedData();
    }
  }, [data, search?.limit]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href={paths.index} className="text-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path
                  opacity="0.5"
                  d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>{t('product.products')}</span>
          </li>
        </ul>

        <div>
          <Link href={paths.products.add} className="btn btn-outline-primary ">
            {t('product.add_product')}
          </Link>
        </div>
      </div>

      <div className="panel mt-6">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">{t('product.products')}</h5>
          <div className="ltr:ml-auto rtl:mr-auto flex flex-row gap-2">
            <div className="flex flex-row justify-center ">
              {' '}
              <button
                type="button"
                className={`${lan == 'ar' ? 'bg-primary text-white' : ''} btn btn-outline-info ltr:rounded-r-none rtl:rounded-l-none`}
                onClick={() => setLan('ar')}
              >
                Arabic
              </button>
              <button
                type="button"
                className={`${lan == 'en' ? 'bg-primary text-white' : ''} btn btn-outline-info rounded`}
                onClick={() => setLan('en')}
              >
                English
              </button>
            </div>
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search.search}
              onChange={(e) => setSearch({ ...search, search: e.target.value })}
            />
          </div>
        </div>
        <div className="datatables">
          <DataTable
            className="table-hover whitespace-nowrap"
            records={sortedData}
            columns={[
              {
                accessor: 'title',
                title: t('image'),
                width: '150px',
                sortable: false,
                render: ({ image }: any) => (
                  <div>
                    <img className="h-24 min-w-full rounded-md object-cover ltr:mr-2 rtl:ml-2" src={image} alt="" width={120} height={96} />
                  </div>
                ),
              },
              {
                accessor: 'name',
                title: t('name'),
                sortable: true,
                render: ({ title }) => <div>{title && title[lan]}</div>,
              },
              {
                accessor: 'product.category',
                title: t('product.category'),
                sortable: true,
                render: ({ category }) => <div>{category}</div>,
              },
              {
                accessor: 'actions',
                title: t('actions'),
                titleClassName: '!text-center',
                render: ({ id, categoryId }) => (
                  <div className="mx-auto flex w-max items-center gap-2">
                    <Tippy content={t('edit')}>
                      <Link
                        href={paths.products.edit(`${categoryId}?product=${id}`)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-white-light dark:hover:text-white-dark hover:underline"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                          <path
                            d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            opacity="0.5"
                            d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </Link>
                    </Tippy>
                    <Tippy content={t('delete')}>
                      <div
                        onClick={() => {
                          Swal.fire({
                            icon: 'warning',
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            showCancelButton: true,
                            confirmButtonText: 'Delete',
                            padding: '2em',
                            customClass: 'sweet-alerts',
                          }).then((result) => {
                            if (result.value) {
                              deleteProduct({
                                id: id,
                                categoryId: categoryId,
                              });
                            }
                          });
                        }}
                        // href={paths.products.edit(id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-600 cursor-pointer dark:hover:text-red-900 hover:underline"
                      >
                        <IconTrash />
                      </div>
                    </Tippy>
                  </div>
                ),
              },
            ]}
            totalRecords={data?.length}
            recordsPerPage={search.limit}
            page={search.page}
            onPageChange={(p) => {
              setSearch({ ...search, page: p });
            }}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={(p) => setSearch({ ...search, limit: p })}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
            fetching={isLoading}
            loaderVariant="bars"
            loaderSize="xl"
            loaderColor="indigo"
            loaderBackgroundBlur={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
