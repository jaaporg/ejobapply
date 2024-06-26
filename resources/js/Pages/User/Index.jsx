import { faEdit, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryLink from '@/Components/PrimaryLink';
import DangerLink from '@/Components/DangerLink';
import Breadcrumb from '@/Components/Breadcrumb';
import Pagination from '@/Components/Pagination';
import InfoLink from '@/Components/InfoLink';
import UserAvatar from '@/Components/UserAvatar';
import Badge from '@/Components/Badge';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Index({ auth, users }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('users')}</h2>}
        >
            <Head title={t('users')} />

            <Breadcrumb breadcrumbs={[{ name: t('home') }, { name: t('users')}]} />

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <div className="row mb-xl-3">
                        <div className="col-auto d-none d-sm-block">
                            <h3><strong>{t('users')}</strong></h3>
                        </div>

                        { auth.user.permissions.includes('user.create') && (
                            <div className="col-auto ms-auto text-end mt-n1">
                                <InfoLink href={route('user.create')} className="btn btn-primary">
                                    <FontAwesomeIcon icon={faPlus} className='mr-2' /> {t('new user')}
                                </InfoLink>
                            </div>
                        )}

                    </div>
                    <table className="table table-hover my-0 table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('full name')}</th>
                                <th>{t('username')}</th>
                                <th>{t('email')}</th>
                                <th>{t('role')}</th>
                                <th>{t('last login')}</th>
                                <th>{t('status')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(({ id, name, email, username, roles, status, last_login_at }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>
                                        <UserAvatar src="adminkit-3-4-0/src/img/avatars/avatar-4.jpg" width="36" height="36">
                                            <Link href={route('user.show', id)}>{name}</Link>
                                        </UserAvatar>
                                    </td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td><Badge status='info'>{roles.map((e) => e.name)}</Badge></td>
                                    <td>{last_login_at}</td>
                                    <td>
                                        <Badge status={status == 1 ? 'success' : 'danger'}>{status == 1 ? t('active') : t('inactive')}</Badge>
                                    </td>
                                    <td>
                                        { auth.user.permissions.includes('user.show') && (
                                            <InfoLink href={route('user.show', id)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </InfoLink>
                                        )}

                                        { auth.user.permissions.includes('user.edit') && (
                                            <PrimaryLink href={route('user.edit', id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PrimaryLink>
                                        )}

                                        { auth.user.permissions.includes('user.destroy') && (
                                            <DangerLink className='ml-1' href={route('user.destroy', id)} method='delete'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerLink>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination className="mt-6" links={users.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
