import UserAvatar from '@/Components/UserAvatar';
import { Link } from '@inertiajs/react';
import Badge from '@/Components/Badge';
import { useTranslation } from "react-i18next";

export default function LatestUsers({ auth, users }) {
    const { t } = useTranslation();
    return (
        <div className="row">
            <div className="col-12 col-lg-12 col-xxl-12 d-flex">
                <div className="card flex-fill">
                    <div className="card-body">
                        <h5 className="card-title mb-0">{t('latest users')}</h5>

                        <table className="table table-hover my-0 table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('full name')}</th>
                                    <th>{t('username')}</th>
                                    <th>{t('email')}</th>
                                    <th>{t('role')}</th>
                                    <th>{t('status')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(({ id, username, name, email, role_name, status }) => (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>
                                            <UserAvatar src="adminkit-3-4-0/src/img/avatars/avatar-4.jpg" width="36" height="36">
                                                <Link href={ auth.permissions.includes('user.show') ? route('user.show', id) : '#'}>{name}</Link>
                                            </UserAvatar>
                                        </td>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                        <td><Badge status='info'>{role_name}</Badge></td>
                                        <td>
                                            <Badge status={status == 1 ? 'success' : 'danger'}>{status == 1 ? t('active') : t('inactive')}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
