import { AlertType } from '@/cine/pages/user';
import { useState } from 'react';

export const useShowHideAlert = () => {
	const [showAlert, setShowAlert] = useState({
		success: false,
		error: false,
		msg: '',
	});

	const showHideAlert = (alertType: AlertType, msg: string) => {
		setShowAlert({ ...showAlert, [alertType]: true, msg });
		setTimeout(() => {
			setShowAlert({ ...showAlert, [alertType]: false, msg });
		}, 2000);
	};

	return {
		showHideAlert,
		showAlert,
	};
};
