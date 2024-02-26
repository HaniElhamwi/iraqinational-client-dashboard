import Link from 'next/link';
import { useEffect, useState } from 'react';

import Tippy from '@tippyjs/react';
import { useDispatch } from 'react-redux';
import { DataTable } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';

import 'tippy.js/dist/tippy.css';

import { paths } from '@/paths';
import { PAGE_SIZES } from '@/constant';
import { useGetCategories, useDeleteCategory } from '@/hooks/variants';
import { setPageTitle } from '@/store/themeConfigSlice';
import Swal from 'sweetalert2';
import IconTrash from '@/components/icon/IconTrash';
import { ProductSearch } from '@/hooks';

const Category = () => {
  const { t } = useTranslation('category');

  const [search, setSearch] = useState<ProductSearch>({
    page: 1,
    limit: PAGE_SIZES[0],
    search: '',
    direction: 'ASC',
  });

  const { data, isLoading } = useGetCategories(search?.page, search.limit, search?.search, search.direction);
  const { deleteCategory, deleteCategoryError, deleteCategoryLoading } = useDeleteCategory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Category'));
  });

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
            <span>{t('category.category')}</span>
          </li>
        </ul>

        <div>
          <Link href={paths.category.add} className="btn btn-outline-primary ">
            {t('category.add_category')}
          </Link>
        </div>
      </div>

      <div className="panel mt-6">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold dark:text-white-light">{t('category.category')}</h5>
          <div className="ltr:ml-auto rtl:mr-auto">
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
            records={data}
            columns={[
              {
                accessor: 'category',
                title: t('image'),
                sortable: false,
                render: ({ image }: any) => (
                  <div>
                    <img className="h-24 w-24 rounded-md object-cover ltr:mr-2 rtl:ml-2" src={image} alt="" width={96} height={96} />
                  </div>
                ),
              },
              {
                accessor: 'name',
                title: t('name'),
                sortable: true,
                render: ({ category }) => <div>{category && category['en']}</div>,
              },

              {
                accessor: 'actions',
                title: t('actions'),
                titleClassName: '!text-center',
                render: ({ categoryId }) => (
                  <div className="mx-auto flex w-max items-center gap-2">
                    <Tippy content={t('delete')}>
                      <div
                        onClick={() => {
                          console.log(categoryId);
                          Swal.fire({
                            icon: 'warning',
                            title: 'Are you sure?',
                            text: "You won't be Delete this category",
                            showCancelButton: true,
                            confirmButtonText: 'Delete',
                            padding: '2em',
                            customClass: 'sweet-alerts',
                            showLoaderOnConfirm: true,
                          }).then((result) => {
                            if (result.value) {
                              deleteCategory(categoryId);
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
            onPageChange={(p) => setSearch({ ...search, page: p })}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={(p) => setSearch({ ...search, limit: p })}
            // sortStatus={{
            //   columnAccessor: search.columnAccessor,
            //   direction: search.direction === 'ASC' ? 'asc' : 'desc',
            // }}
            // onSortStatusChange={(s) =>
            //   setSearch({ ...search, columnAccessor: s.columnAccessor, direction: s.direction === 'asc' ? 'ASC' : 'DESC' })
            // }
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

export default Category;
