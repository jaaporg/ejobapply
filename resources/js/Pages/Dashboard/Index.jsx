import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserAnalytics from './Partials/UserAnalytics';
import Breadcrumb from '@/Components/Breadcrumb';
import LatestUsers from './Partials/LatestUsers';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Dashboard({ auth, count, users, monthlyCount, usersRegisteredThisMonth }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('dashboard')}</h2>}
        >
            <Head title={t('dashboard')} />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t('dashboard')}]}/>
            
            <div className="container-fluid p-0">
                <h1 className="h3 mb-3"><strong>{t('analytics')} </strong>{t('dashboard')}</h1>
                
                { auth.user.permissions.includes('dashboard') && (
                    <UserAnalytics count={count} monthlyCount={monthlyCount} usersRegisteredThisMonth={usersRegisteredThisMonth}></UserAnalytics>
                )}

                { auth.user.permissions.includes('user.index') && (
                    <LatestUsers auth={auth.user} users={users}></LatestUsers>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
