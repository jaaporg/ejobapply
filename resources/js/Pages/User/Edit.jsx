import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import SecondaryLink from '@/Components/SecondaryLink';
import SelectInput from '@/Components/SelectInput';
import Breadcrumb from '@/Components/Breadcrumb';
import { useTranslation } from "react-i18next";

export default function Edit({ auth, user, roles, userRole, countries }) {
    const { t } = useTranslation();
    const { data, setData, patch, processing, errors, progress } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address ?? '',
        username: user.username,
        role: userRole,
        email: user.email,
        country_id: user.country_id ?? 0,
        status: user.status,
        password: '',
        password_confirmation: '',
        avatar: '',
    });

    const status = [
        { id: '1', name: t('active') },
        { id: '2', name: t('deactivate') },
        { id: '3', name: t('suspend') },
        { id: '4', name: t('ban') },
    ]

    const submit = (e) => {
        e.preventDefault();
        patch(route('user.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('update user')}</h2>}
        >
            <Head title={t('update user')} />

            <Breadcrumb breadcrumbs={[{ name: t('home') }, { name: t('users') }, { name: t('update') }]} />

            <div className='row'>
                <div className='col-md-12'>
                    <div className="card flex-fill w-100">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Profile information</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Set Credentials</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Upload image</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className='mb-3 mt-3'>
                                            <InputLabel htmlFor="first_name" value={t('first name')} className='form-label' />
                                            <TextInput
                                                id="first_name"
                                                type="first_name"
                                                name="first_name"
                                                value={data.first_name}
                                                className="form-control form-control-lg"
                                                autoComplete="first_name"
                                                onChange={(e) => setData('first_name', e.target.value)}
                                            />
                                            <InputError message={errors.first_name} className="mt-2" />
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <InputLabel htmlFor="last_name" value={t('last name')} className='form-label' />
                                            <TextInput
                                                id="last_name"
                                                type="last_name"
                                                name="last_name"
                                                value={data.last_name}
                                                className="form-control form-control-lg"
                                                autoComplete="last_name"
                                                onChange={(e) => setData('last_name', e.target.value)}
                                            />
                                            <InputError message={errors.last_name} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="username" value={t('username')} className='form-label' />

                                            <TextInput
                                                id="username"
                                                type="username"
                                                name="username"
                                                value={data.username}
                                                className="form-control form-control-lg"
                                                autoComplete="username"
                                                onChange={(e) => setData('username', e.target.value)}
                                            />

                                            <InputError message={errors.username} className="mt-2" />
                                        </div>
                                        <div className='mb-3'>
                                            <InputLabel htmlFor="email" value={t('email')} className='form-label' />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="form-control form-control-lg"
                                                autoComplete="email"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div className='mb-3'>
                                            <InputLabel htmlFor="role" value={t('roles')} className='form-label' />

                                            <SelectInput
                                                id="role"
                                                name="role"
                                                value={data.role}
                                                className="form-control form-control-lg"
                                                autoComplete="role"
                                                placeholder={t('select role')}
                                                trackBy={'name'}
                                                options={roles}
                                                onChange={(e) => setData('role', e.target.value)}
                                            />

                                            <InputError message={errors.role_id} className="mt-2" />
                                        </div>
                                        <div className='mb-3'>
                                            <InputLabel htmlFor="address" value={t('address')} className='form-label' />

                                            <TextareaInput
                                                id="address"
                                                name="address"
                                                value={data.address}
                                                className="form-control form-control-lg"
                                                autoComplete="address"
                                                onChange={(e) => setData('address', e.target.value)}
                                            ></TextareaInput>

                                            <InputError message={errors.address} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="country_id" value={t('country')} className='form-label' />

                                            <SelectInput
                                                id="country_id"
                                                name="country_id"
                                                value={data.country_id}
                                                className="form-control form-control-lg"
                                                autoComplete="country_id"
                                                placeholder={t('select country')}
                                                options={countries}
                                                onChange={(e) => setData('country_id', e.target.value)}
                                            />

                                            <InputError message={errors.country_id} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="status" value={t('status')} className='form-label' />

                                            <SelectInput
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                className="form-control form-control-lg"
                                                autoComplete="status"
                                                placeholder={t('select status')}
                                                options={status}
                                                onChange={(e) => setData('status', e.target.value)}
                                            />

                                            <InputError message={errors.status} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="mb-3">
                                            <InputLabel htmlFor="password" value="Password" className='form-label' />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="form-control form-control-lg"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div className="mb-3">
                                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='form-label' />

                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="form-control form-control-lg"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                            />

                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div className="mb-3 mt-3">
                                            <InputLabel htmlFor="profile_picture" value="Profile Image" className='form-label' />

                                            <TextInput
                                                type="file"
                                                value={data.profile_picture}
                                                className="form-control"
                                                onChange={e => setData('profile_picture', e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>Update</PrimaryButton>
                                <SecondaryLink href={route('user.index')} className='ml-1'>Back</SecondaryLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
