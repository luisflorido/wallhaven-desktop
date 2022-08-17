import { toast, ToastOptions } from 'react-toastify';

type IToast = {
  message: string;
  type: ToastOptions['type'];
} & ToastOptions;

export const showToast = ({ message, type, ...rest }: IToast) => {
  toast(message, {
    type,
    theme: 'dark',
    autoClose: 2000,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    hideProgressBar: true,
    ...rest,
  });
};
