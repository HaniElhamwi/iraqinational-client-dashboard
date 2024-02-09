import { UsersData } from './UsersData';

export const UsersForm = () => {
  return (
    <>
      <div className="flex flex-col gap-2.5 pt-5 xl:flex-row">
        <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
          <UsersData />
        </div>
      </div>
    </>
  );
};
