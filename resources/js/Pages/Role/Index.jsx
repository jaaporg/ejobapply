import { faEdit, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryLink from '@/Components/PrimaryLink';
import DangerLink from '@/Components/DangerLink';
import Breadcrumb from '@/Components/Breadcrumb';
import InfoLink from '@/Components/InfoLink';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Index({ auth, roles }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('role')}</h2>}
        >
            <Head title="Roles" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t('roles')}]}/>

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <div className="row mb-xl-3">
                        <div className="col-auto d-none d-sm-block">
                            <h3><strong>{t('role')}</strong></h3>
                        </div>

                        { auth.user.permissions.includes('roles.create') && (
                            <div className="col-auto ms-auto text-end mt-n1">
                                <InfoLink href={route('roles.create')}>
                                    <FontAwesomeIcon icon={faPlus} className='mr-2'/> {t('new role')}
                                </InfoLink>
                            </div>
                        )}
                    </div>
                    <table className="table table-hover my-0 table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('role name')}</th>
                                <th>{t('display name')}</th>
                                <th>{t('of users with this role')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.data.map(({ id, name, display_name, users_count }) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{display_name}</td>
                                    <td>{users_count}</td>
                                    <td>
                                        { auth.user.permissions.includes('roles.show') && (
                                            <InfoLink href={route('roles.show', id)}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </InfoLink>
                                        )}

                                        { auth.user.permissions.includes('roles.edit') && (
                                            <PrimaryLink href={route('roles.edit', id)} className='ml-1'>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PrimaryLink>
                                        )}                                        
                                        
                                        {auth.user.permissions.includes('roles.destroy') && (
                                            <DangerLink href={route('roles.destroy', id)} method='delete' className='ml-1' as='button' disabled={users_count > 0 ? true : false}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerLink>
                                         )} 
                                    </td>
                                </tr>
                            ))}

                            {roles.length && (
                                <tr>
                                    <td colSpan='5' className='text-center'> no data found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* <Pagination className="mt-6" links={users.links} /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}