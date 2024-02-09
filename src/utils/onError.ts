import { toastBar } from './comp/toastbar';

export const catchError = (response: Response) => {
  if (response.statusText === 'Forbidden') {
    toastBar({ message: 'you do not have permission to perform this operation', err: true });
    throw new Error('Network response was not ok');
  }

  if (response.statusText === 'Forbidden resource') {
    toastBar({ message: 'you do not have permission to perform this operation', err: true });
    throw new Error('Network response was not ok');
  }

  if (!response.ok) {
    toastBar({ message: 'Network response was not ok', err: true });
    throw new Error('Network response was not ok');
  }
};
