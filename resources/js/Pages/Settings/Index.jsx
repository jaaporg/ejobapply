import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTab from '@/Components/SettingsTab';
import Breadcrumb from '@/Components/Breadcrumb';
import GeneralTab from './Partials/GeneralTab';
import CacheTab from './Partials/CacheTab';
import BackupTab from './Partials/BackupTab';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Index({ auth, tabName }) {
    const { t } = useTranslation();
    const tabs = [
        {
            url: 'settings?tab=general',
            tab: 'general',
            title: 'General Settings',
        },
        // {
        //     id: 1,
        //     url: 'settings?tab=email',
        //     title: 'Email Settings',
        // },
        {
            url: 'settings?tab=cache',
            tab: 'cache',
            title: 'Cache Settings',
        },
        {
            url: 'settings?tab=db-backup',
            tab: 'db-backup',
            title: 'Database Backup',
        },
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />

            <Breadcrumb breadcrumbs={[{ name: t('home')}, { name: 'Settings' }]} />

            <SettingsTab tabs={tabs} active={tabName}>

                {tabName == 'general' && (
                    <div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="sm:p-8 bg-white shadow sm:rounded-lg">
                                <GeneralTab />
                            </div>
                        </div>
                    </div>
                )}

                {tabName == 'cache' && (
                    <div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="sm:p-8 bg-white shadow sm:rounded-lg">
                                <CacheTab />
                            </div>
                        </div>
                    </div>
                )}

                {tabName == 'db-backup' && (
                    <div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="sm:p-8 bg-white shadow sm:rounded-lg">
                                <BackupTab />
                            </div>
                        </div>
                    </div>
                )}
            </SettingsTab>
        </AuthenticatedLayout>
    )
}
