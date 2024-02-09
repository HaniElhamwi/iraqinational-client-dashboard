import Swal, { SweetAlertPosition } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const toastBar = ({ message, dir, err }: { message: string; dir?: SweetAlertPosition; err?: boolean }) =>
  MySwal.fire({
    title: message,
    icon: err ? 'error' : 'success',
    toast: true,
    position: dir ? dir : 'top',
    showConfirmButton: false,
    timer: 2000,
    showCloseButton: true,
  });
