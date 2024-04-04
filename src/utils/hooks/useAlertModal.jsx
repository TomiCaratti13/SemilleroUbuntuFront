import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAlertModal = onSubmit => {
  const navigate = useNavigate();
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

  const closeAlert = (returnTo = '') => {
    setAlertModal(prevState => ({
      ...prevState,
      open: false,
    }));
    navigate(returnTo);
  };

  const resendAlert = () => {
    onSubmit();
    closeAlert();
  };

  return [alertModal, openAlert, closeAlert, resendAlert];
};
