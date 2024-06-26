import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryLink from '@/Components/PrimaryLink';
import SecondaryLink from '@/Components/SecondaryLink';
import Breadcrumb from '@/Components/Breadcrumb';
import { useEffect } from 'react';
import PermissionUpdate from './Partials/PermissionUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSync, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";

export default function Create({ auth, permissions }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        display_name: '',
        permission: [],
    });

    const handleChecked = (e) => {
        let value = e.target.value;
        if (e.target.checked) {
            setData("permission", [...data.permission, parseInt(value)]);
        } else {
            setData(
                "permission",
                data.permission.filter((item) => {
                    return item != value
                })
            );
        }
    };

    useEffect(() => {
        console.log(errors)
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('create role')}</h2>}
        >
            <Head title="Create Role" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: t('role')}, {name: t('create')}]}/>

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <InputLabel htmlFor="name" value={t('name')} className='form-label' />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="form-control form-control-lg"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className='mb-3'>
                            <InputLabel htmlFor="display_name" value={t('display name')} className='form-label' />

                            <TextInput
                                id="display_name"
                                type="text"
                                name="display_name"
                                value={data.display_name}
                                className="form-control form-control-lg"
                                autoComplete="display_name"
                                onChange={(e) => setData('display_name', e.target.value)}
                            />

                            <InputError message={errors.display_name} className="mt-2" />
                        </div>

                        <div className="row mb-xl-3">
                            <div className="col-auto d-none d-sm-block">
                                <h3><strong>{t('assign permissions')}</strong></h3>
                            </div>

                            <div className="col-auto ms-auto text-end mt-n1">
                                <PrimaryLink href={route('permission.store')} method='post' className='ml-1' as='button'>
                                    <FontAwesomeIcon icon={faSync}/>
                                </PrimaryLink>
                            </div>
                        </div>                        

                        <InputError message={errors.permission} className="mt-2" />

                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <Checkbox
                                            name="all_permission"
                                            checked={data.all_permission}
                                            className='form-check-input'
                                            onChange={(e) => setData('all_permission', e.target.checked)}
                                        />
                                    </th>
                                    <th scope="col">{t('name')}</th>
                                    <th scope="col">{t('guard')}</th>
                                    <th scope="col">{t('action')}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {permissions.map(({ id, display_name, guard_name }) => (
                                    <tr key={id}>
                                        <td>
                                            <Checkbox
                                                id={id}
                                                name="permission[]"
                                                value={id}
                                                className='form-check-input'
                                                onChange={handleChecked}
                                            />
                                        </td>
                                        <td><InputLabel htmlFor={id} value={display_name} className='form-label' /></td>
                                        <td>{guard_name}</td>
                                        <td>
                                            <PermissionUpdate permissionId={id} permissionName={display_name}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PermissionUpdate>
                                        </td>
                                    </tr >
                                ))
                                }
                            </tbody >
                        </table >

                        <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>
                            <FontAwesomeIcon icon={faSave}/>
                        </PrimaryButton>
                        <SecondaryLink href={route('roles.index')} className='ml-1'>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </SecondaryLink>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
