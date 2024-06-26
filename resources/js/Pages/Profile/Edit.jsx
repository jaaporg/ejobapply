import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import ActiveSession from './Partials/ActiveSession';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Edit({ auth, mustVerifyEmail, status, sessions, countries }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: 'Profile'}]}/>

            <div className="mt-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            countries={countries}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ActiveSession
                            sessions={sessions}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
