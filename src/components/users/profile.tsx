import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconCoffee from '../icon/IconCoffee';
import IconCalendar from '../icon/IconCalendar';
import IconMapPin from '../icon/IconMapPin';
import IconMail from '../icon/IconMail';
import IconPhone from '../icon/IconPhone';
import IconTwitter from '../icon/IconTwitter';
import IconGithub from '../icon/IconGithub';
import IconDribbble from '../icon/IconDribbble';

import { UserFormData } from '@/types';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select/async';

export const Profile = () => {
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const { t } = useTranslation();

  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<UserFormData, UserFormData>();
  return (
    <div>
      <div className="pt-5">
        <div className="mb-5 grid lg:grid-cols-3 gap-3 grid-col-2">
          <div className="panel col-span-1">
            <div className="mb-5 flex items-center justify-between">
              <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
            </div>
            <div className="mb-5">
              <div className="flex flex-col items-center justify-center">
                <img src="/assets/images/profile-34.jpeg" alt="img" className="mb-5 h-24 w-24 rounded-full  object-cover" />
                <p className="text-xl font-semibold text-primary">{getValues('username')}</p>
              </div>
              <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                <li className="flex items-center gap-2">
                  <IconCoffee className="shrink-0" />
                  {getValues('companyName')}
                </li>
                <li className="flex items-center gap-2">
                  <IconCalendar className="shrink-0" />
                  {getValues('companyTaxNumber')}
                </li>
                {getValues('website') && (
                  <li className="flex items-center gap-2">
                    <IconMapPin className="shrink-0" />
                    {getValues('website')}
                  </li>
                )}
                <li>
                  <button className="flex items-center gap-2">
                    <IconMail className="w-5 h-5 shrink-0" />
                    <span className="truncate text-primary">{getValues('email')}</span>
                  </button>
                </li>
                {getValues('website') && (
                  <li className="flex items-center gap-2">
                    <IconPhone />
                    <span className="whitespace-nowrap" dir="ltr">
                      {getValues('phoneNumber')}
                    </span>
                  </li>
                )}
              </ul>
              {/* <ul className="mt-7 flex items-center justify-center gap-2">
                <li>
                  <button className="btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0">
                    <IconTwitter className="w-5 h-5" />
                  </button>
                </li>
                <li>
                  <button className="btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0">
                    <IconDribbble />
                  </button>
                </li>
                <li>
                  <button className="btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0">
                    <IconGithub />
                  </button>
                </li>
              </ul> */}
            </div>
          </div>

          <div className="panel col-span-2">
            <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
              <h6 className="mb-5 text-lg font-bold">General Information</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <div>
                    <label htmlFor="name">{t('users.username')}</label>
                    <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                  </div> */}
                  <div className="flex flex-col items-start ">
                    <div className=" w-full">
                      <label htmlFor="category">{t('users.role')}</label>
                      <div className="custom-select">
                        <Controller
                          name="role"
                          control={control}
                          render={({ field: { name, value, onChange } }) => {
                            return (
                              <Select
                                getOptionValue={(option): string => option.type}
                                getOptionLabel={(option: any) => option.title}
                                placeholder={t('users.role')}
                                noOptionsMessage={() => t('no_options')}
                                instanceId="category_select"
                                defaultOptions={[
                                  { type: 'user', title: 'USER' },
                                  { type: 'seller', title: 'SELLER' },
                                  { type: 'admin', title: 'ADMIN' },
                                ]}
                                name={name}
                                value={{ type: value, title: value?.toUpperCase() }}
                                onChange={(e) => onChange(e?.type)}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>{' '}
                  <div className="flex flex-col items-start ">
                    <div className=" w-full">
                      <label htmlFor="category">{t('users.verification')}</label>
                      <div className="custom-select">
                        <Controller
                          name="verified"
                          control={control}
                          render={({ field: { name, onBlur, onChange, value } }) => {
                            return (
                              <Select
                                getOptionValue={(option): string => option.title}
                                getOptionLabel={(option: any) => option.title}
                                placeholder={t('users.verification')}
                                noOptionsMessage={() => t('no_options')}
                                instanceId="category_select"
                                defaultOptions={[
                                  { value: true, title: 'verified' },
                                  { value: false, title: 'unverified' },
                                ]}
                                name={name}
                                value={{ value, title: value ? 'verified' : 'unverified' }}
                                onChange={(e) => onChange(e?.value)}
                              />
                            );
                          }}
                        />
                        {errors.verified && <div className="text-red-500">veri</div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start ">
                    <div className=" w-full">
                      <label htmlFor="category">{t('users.situation')}</label>
                      <div className="custom-select">
                        <Controller
                          name="isDisabled"
                          control={control}
                          render={({ field: { name, value, onChange } }) => {
                            return (
                              <Select
                                getOptionValue={(option): string => option.title}
                                getOptionLabel={(option: any) => option.title}
                                placeholder={t('users.role')}
                                noOptionsMessage={() => t('no_options')}
                                instanceId="category_select"
                                defaultOptions={[
                                  { value: true, title: 'disabled' },
                                  { value: false, title: 'active' },
                                ]}
                                name={name}
                                value={{ value: value, title: value ? 'disabled' : 'active' }}
                                onChange={(e) => onChange(e?.value)}
                              />
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-3 sm:col-span-2">
                    <button type="button" className="btn btn-primary">
                      Save
                    </button>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
