import { useState } from 'react';

export const useAlertModal = onSubmit => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    icon: true,
    title: '',
    info: '',
  });

  const openAlert = (icon, title, info) => {
    setAlertModal({
      open: true,
      icon,
      title,
      info,
    });
  };

  const closeAlert = () => {
    setAlertModal(prevState => ({
      ...prevState,
      open: false,
    }));
  };

  const resendAlert = () => {
    onSubmit();
    closeAlert();
  };

  return [alertModal, openAlert, closeAlert, resendAlert];
};
