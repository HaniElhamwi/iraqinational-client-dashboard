import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const useAlert = () => {
  const Alert = withReactContent(Swal);

  const alert = (message: string, type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info') => {
    Alert.fire({
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      customClass: {
        popup: `color-${type}`,
      },
    });
  };

  return { alert };
};
