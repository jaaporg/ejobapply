import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryLink from '@/Components/SecondaryLink';
import Pagination from '@/Components/Pagination';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Show({ auth, activityLogs }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('activity log user details')}</h2>}
        >
            <Head title={t('activity log user details')} />

            <Breadcrumb breadcrumbs={[{ name: t('home') }, { name: t('activity log') }, { name: t('details') }]} />

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <div className="row mb-xl-3">
                        <div className="col-auto d-none d-sm-block">
                            <h3><strong>{t('activity log details')} ({auth.user.username})</strong></h3>
                        </div>
                    </div>
                    <table className="table table-hover my-0 table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('username')}</th>
                                <th>{t('message')}</th>
                                <th>{t('log time')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityLogs.data.map(({ id, user_id, username, description, logTime }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>
                                        <Link href={
                                            auth.user.permissions.includes('user.show') ? route('user.show', user_id) : '#'}>
                                            {username}
                                        </Link>
                                    </td>
                                    <td>{t(description)}</td>
                                    <td>{logTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination className="mt-6" links={activityLogs.links} />
                    <SecondaryLink href={route('activity_log.index')} className='mt-3'>{t('back')}</SecondaryLink>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}