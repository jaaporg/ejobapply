import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import SecondaryLink from '@/Components/SecondaryLink';
import PrimaryLink from '@/Components/PrimaryLink';
import Breadcrumb from '@/Components/Breadcrumb';
import PermissionUpdate from './Partials/PermissionUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSync } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";

export default function Edit({ auth, role, permissions, rolePermissions }) {
    const { t } = useTranslation();
    const { data, setData, patch, processing, errors } = useForm({
        name: role.name,
        display_name: role.display_name,
        permission: rolePermissions,
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

    const handleCheckedAll = (e) => {
        if (e.target.checked) {
            permissions.map(({id}) => {
                console.log(id)
                setData("permission", [...data.permission, id]);
            })
        } else {
            // setData(
            //     "permission",
            //     data.permission.filter((item) => {
            //         return true;
            //     })
            // );
        }

        // console.log(data.permission)
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('roles.update', role.id));
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update role</h2>}
        >
            <Head title="Update role" />

            <Breadcrumb breadcrumbs={[{name: t('home')}, {name: 'Role'}, {name: 'Update'}]}/>

            <div className="card flex-fill w-100">
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <InputLabel htmlFor="name" value="Name" className='form-label' />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="form-control form-control-lg"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className='mb-3'>
                            <InputLabel htmlFor="display_name" value="Display Name" className='form-label' />

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
                                <h3><strong>Assign Permissions</strong></h3>
                            </div>

                            <div className="col-auto ms-auto text-end mt-n1">
                                <PrimaryLink href={route('permission.store')} method='post' className='ml-1' as='button'>
                                    <FontAwesomeIcon icon={faSync}/>
                                </PrimaryLink>
                            </div>
                        </div>

                        <InputError message={errors.permissions} className="mt-2" />

                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" width="1%">
                                        <Checkbox
                                            className='form-check-input'
                                            onChange={handleCheckedAll}
                                        />
                                    </th>
                                    <th>Name</th>
                                    <th>Guard</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {permissions.map(({ id, display_name, guard_name }) => (
                                    <tr key={id}>
                                        <td>
                                            <Checkbox
                                                id={id}
                                                value={id}
                                                checked={data.permission.includes(id)}
                                                className='form-check-input'
                                                onChange={handleChecked}
                                            />
                                        </td>
                                        <td><td><InputLabel htmlFor={id} value={display_name} className='form-label' /></td></td>
                                        <td>{guard_name}</td>
                                        <td>
                                            <PermissionUpdate permissionId={id} permissionName={display_name}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PermissionUpdate>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <PrimaryButton disabled={processing}>Update</PrimaryButton>
                        <SecondaryLink href={route('roles.index')} className='ml-1'>Back</SecondaryLink>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
