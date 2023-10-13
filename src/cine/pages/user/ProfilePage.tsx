import { CineLayout } from '@/cine/layout';
import { CustomAlert } from '@/components';
import { DisableAccount, ProfileForm, ProfileImage } from '@/components/cine/user/profilePage';
import { Separator } from '@/components/ui';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';

export type AlertType = 'success' | 'error';

export const ProfilePage = () => {
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

	return (
		<CineLayout>
			<div className='mt-[100px] px-10'>
				<CustomAlert
					className={`${
						showAlert.success ? 'top-32' : '-top-24'
					} bg-background border-green-700 transition-all z-50 duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
					icon={<AiOutlineCheck className='w-6 h-6 text-green-700' />}
					title='Éxito'
					description={showAlert.msg}
				/>
				<CustomAlert
					className={`${
						showAlert.error ? 'top-32' : '-top-24'
					} bg-background border-destructive transition-all duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
					icon={<BiSolidError className='w-6 h-6 text-destructive' />}
					title='Error'
					description={showAlert.msg}
				/>
				<h1 className='text-2xl px-5 font-medium'>Mi perfil</h1>
				<Separator className='my-5' />
				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					<ProfileForm showHideAlert={showHideAlert} />
					<ProfileImage showHideAlert={showHideAlert} />
					<DisableAccount showHideAlert={showHideAlert} />
				</div>
			</div>
		</CineLayout>
	);
};
