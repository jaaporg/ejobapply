import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Index({ auth, activityLogs }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t("activity log")}</h2>}
        >
            <Head title={t("activity log")} />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t("activity log")}]}/>

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <div className="row mb-xl-3">
                        <div className="col-auto d-none d-sm-block">
                            <h3><strong>{t("activity log")}</strong></h3>
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
                            {activityLogs.data.map(({ id, username, description, logTime, causer_id }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>
                                        <Link href={auth.user.permissions.includes('activity_log.show') ? route('activity_log.show', causer_id) : '#'}>{username}</Link>
                                    </td>
                                    <td>{t(description)}</td>
                                    <td>{logTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination className="mt-6" links={activityLogs.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}