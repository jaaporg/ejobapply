import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryLink from '@/Components/SecondaryLink';
import PrimaryLink from '@/Components/PrimaryLink';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Show({ auth, role, rolePermissions }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('assigned permissions')}</h2>}
        >
            <Head title="Assigned permissions" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t('roles')}, {name: t('show')}]}/>

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <h1><strong>{role.name} </strong>{t('role')}</h1>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col" width="20%">{t('name')}</th>
                                <th scope="col" width="1%">{t('guard')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolePermissions.map(({ id, display_name, guard_name }) => (
                                <tr key={id}>
                                    <td>{display_name}</td>
                                    <td>{guard_name}</td>
                                </tr>
                            ))}
                        </tbody>                        
                    </table>

                    <PrimaryLink href={route('roles.edit', role.id)} className='mt-3'>
                        <FontAwesomeIcon icon={faEdit} />
                    </PrimaryLink>
                    <SecondaryLink href={route('roles.index')} className='mt-3 ml-1'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </SecondaryLink>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
