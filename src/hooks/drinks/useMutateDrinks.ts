import { AboutFormData } from './../../components/drinks/AboutFormData';
import { DepartmentsFormData } from '@/types/departments';
import { toastBar } from '@/utils/comp/toastbar';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { db } from '../../../firebase';
import { DrinkAboutFormData } from '@/types/drinkAbout';
import { DrinksHomeFormData } from '@/types/drinks-home';

const createDepartments = async (images: DepartmentsFormData) => {
  try {
    await setDoc(doc(db, 'drinks', 'departments'), {
      images: [...images.images],
    });
    toastBar({ message: 'Department images uploaded successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateDepartment = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: DepartmentsFormData) => createDepartments(requestData), {
    onSuccess: () => {},
  });
  return {
    createDepartment: mutateAsync,
    createDepartmentLoading: isLoading,
    createDepartmentError: error,
  };
};

const createCertifications = async (images: DepartmentsFormData) => {
  try {
    await setDoc(doc(db, 'drinks', 'certifications'), {
      images: [...images.images],
    });
    toastBar({ message: 'Certifications images uploaded successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateCertifications = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: DepartmentsFormData) => createCertifications(requestData), {
    onSuccess: () => {},
  });
  return {
    createCertifications: mutateAsync,
    createCertificationsLoading: isLoading,
    createCertificationsError: error,
  };
};

const createAbout = async (images: DrinkAboutFormData) => {
  try {
    await setDoc(doc(db, 'drinks', 'about'), {
      title: {
        ar: images.arTitle,
        en: images.enTitle,
      },
      description: {
        ar: images.arDescription,
        en: images.enDescription,
      },
      subTitle: {
        ar: images.arSubTitle,
        en: images.enSubTitle,
      },
    });
    toastBar({ message: 'About Edited successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateDrinksAbout = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: DrinkAboutFormData) => createAbout(requestData), {
    onSuccess: () => {},
  });
  return {
    createAbout: mutateAsync,
    createAboutLoading: isLoading,
    createAboutError: error,
  };
};

const editDrinksMain = async (data: DrinksHomeFormData) => {
  try {
    await setDoc(doc(db, 'drinks', 'main'), {
      ...data,
    });
    toastBar({ message: 'About Edited successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateDrinksMain = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: DrinksHomeFormData) => editDrinksMain(requestData), {
    onSuccess: () => {},
  });
  return {
    updateDrinksMain: mutateAsync,
    createAboutLoading: isLoading,
    createAboutError: error,
  };
};
