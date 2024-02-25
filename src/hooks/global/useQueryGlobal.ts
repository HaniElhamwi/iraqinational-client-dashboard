import { doc, getDoc, collection } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../../firebase';

const fetchAbout = async (collection: string, document: string) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const useQueryGlobal = ({ collection, document }: { collection: string; document: string }) => {
  const { data, isLoading, isError } = useQuery([], () => fetchAbout(collection, document), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};
