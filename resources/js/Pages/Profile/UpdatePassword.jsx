import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function UpdatePassword({ auth }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Password</h2>}
        >
            <Head title="Update Password" />

            <Breadcrumb breadcrumbs={[{ name: t('home')}, { name: 'Update Password' }]} />

            <div className="mb-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
