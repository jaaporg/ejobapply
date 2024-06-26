import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head } from '@inertiajs/react';
import ActiveSession from '../Profile/Partials/ActiveSession';
import UserProfileInformation from './Partials/UserProfileInformation';
import { useTranslation } from "react-i18next";

export default function Show({ auth, user, sessions, activityLogs }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="User" />

            <Breadcrumb breadcrumbs={[{ name: t('home')}, { name: 'Users' }, { name: 'Show' }]} />

            <div className="mt-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UserProfileInformation className="max-w-xl" user={user} />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ActiveSession
                            sessions={sessions}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="row mb-xl-3">
                            <div className="col-auto d-none d-sm-block">
                                <h3><strong>Activity Log User Details</strong></h3>
                            </div>
                        </div>
                        <table className="table table-hover my-0 table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Message</th>
                                    <th>Log time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activityLogs.data.map(({ id, username, description, logTime, causer_id }) => (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{username}</td>
                                        <td>{description}</td>
                                        <td>{logTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <Pagination className="mt-6" links={activityLogs.links} /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
