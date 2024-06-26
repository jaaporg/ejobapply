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

export default function Create({ auth, roles, countries }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, progress } = useForm({
        first_name: '',
        last_name: '',
        gender: 0,
        dob: '1996-12-05',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip_code: '',
        country_id: ' ',
        phone: '',
        username: '',
        email: '',
        role: '',
        status: '',
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

    const gender = [
        { id: '1', name: t('male') },
        { id: '2', name: t('female') },
    ]

    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
        >
            <Head title="Create User" />

            <Breadcrumb breadcrumbs={[{ name: t('home') }, { name: 'Users' }, { name: 'Create' }]} />

            <div className="row">
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-body">
                            <div className="col-auto d-none d-sm-block mb-3">
                                <h2><strong>Create User</strong></h2>
                            </div>
                            <form onSubmit={submit}>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Profile Information</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Set Credentials</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Image upload</button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className='mb-3 mt-3'>
                                            <InputLabel htmlFor="first_name" value="First Name*" className='form-label' />
                                            <TextInput
                                                id="first_name"
                                                type="first_name"
                                                name="first_name"
                                                value={data.first_name}
                                                className="form-control form-control-lg"
                                                autoComplete="first_name"
                                                isFocused={true}
                                                onChange={(e) => setData('first_name', e.target.value)}
                                            />
                                            <InputError message={errors.first_name} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="last_name" value="Last Name*" className='form-label' />
                                            <TextInput
                                                id="last_name"
                                                type="last_name"
                                                name="last_name"
                                                value={data.last_name}
                                                className="form-control form-control-lg"
                                                autoComplete="last_name"
                                                isFocused={true}
                                                onChange={(e) => setData('last_name', e.target.value)}
                                            />
                                            <InputError message={errors.last_name} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="gender" value="Gender" className='form-label' />
                                            <SelectInput
                                                id="gender"
                                                name="gender"
                                                value={data.gender}
                                                className="form-control form-control-lg"
                                                autoComplete="gender"
                                                placeholder="Select Gender"
                                                options={gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                            />
                                            <InputError message={errors.gender} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="dob" value="Date of Birth" className='form-label' />
                                            <TextInput
                                                id="dob"
                                                type="date"
                                                name="dob"
                                                value={data.dob}
                                                className="form-control form-control-lg"
                                                autoComplete="dob"
                                                isFocused={true}
                                                onChange={(e) => setData('dob', e.target.value)}
                                            />
                                            <InputError message={errors.dob} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="address_1" value="Address 1" className='form-label' />
                                            <TextareaInput
                                                id="address_1"
                                                name="address_1"
                                                value={data.address_1}
                                                className="form-control form-control-lg"
                                                autoComplete="address_1"
                                                onChange={(e) => setData('address_1', e.target.value)}
                                            ></TextareaInput>
                                            <InputError message={errors.address_1} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="address_2" value="Address 2" className='form-label' />
                                            <TextareaInput
                                                id="address_2"
                                                name="address_2"
                                                value={data.address_2}
                                                className="form-control form-control-lg"
                                                autoComplete="address_2"
                                                onChange={(e) => setData('address_2', e.target.value)}
                                            ></TextareaInput>
                                            <InputError message={errors.address_2} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="city" value="City" className='form-label' />
                                            <TextInput
                                                id="city"
                                                name="city"
                                                value={data.city}
                                                className="form-control form-control-lg"
                                                autoComplete="city"
                                                onChange={(e) => setData('city', e.target.value)}
                                            ></TextInput>
                                            <InputError message={errors.city} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="state" value="State/Province" className='form-label' />
                                            <TextInput
                                                id="state"
                                                name="state"
                                                value={data.state}
                                                className="form-control form-control-lg"
                                                autoComplete="state"
                                                onChange={(e) => setData('state', e.target.value)}
                                            ></TextInput>
                                            <InputError message={errors.state} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="zip_code" value="Zip/Postal Code" className='form-label' />
                                            <TextInput
                                                type="number"
                                                id="zip_code"
                                                name="zip_code"
                                                value={data.zip_code}
                                                className="form-control form-control-lg"
                                                autoComplete="zip_code"
                                                onChange={(e) => setData('zip_code', e.target.value)}
                                            ></TextInput>
                                            <InputError message={errors.zip_code} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="country_id" value="Country" className='form-label' />
                                            <SelectInput
                                                id="country_id"
                                                name="country_id"
                                                value={data.country_id}
                                                className="form-control form-control-lg"
                                                autoComplete="country_id"
                                                placeholder="Select Country"
                                                options={countries}
                                                onChange={(e) => setData('country_id', e.target.value)}
                                            />
                                            <InputError message={errors.country_id} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="phone" value="Phone" className='form-label' />
                                            <TextInput
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                className="form-control form-control-lg"
                                                autoComplete="phone"
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="username" value="Username*" className='form-label' />
                                            <TextInput
                                                id="username"
                                                type="text"
                                                name="username"
                                                value={data.username}
                                                className="form-control form-control-lg"
                                                autoComplete="username"
                                                onChange={(e) => setData('username', e.target.value)}
                                            />
                                            <InputError message={errors.username} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="email" value="Email*" className='form-label' />
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
                                            <InputLabel htmlFor="role" value="User Type*" className='form-label' />
                                            <SelectInput
                                                id="role"
                                                name="role"
                                                value={data.role}
                                                className="form-control form-control-lg"
                                                autoComplete="role"
                                                placeholder="Select User Type"
                                                trackBy={'name'}
                                                options={roles}
                                                onChange={(e) => setData('role', e.target.value)}
                                            />
                                            <InputError message={errors.role} className="mt-2" />
                                        </div>

                                        <div className='mb-3'>
                                            <InputLabel htmlFor="status" value="Status*" className='form-label' />
                                            <SelectInput
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                className="form-control form-control-lg"
                                                autoComplete="status"
                                                placeholder="Select Status"
                                                options={status}
                                                onChange={(e) => setData('status', e.target.value)}
                                            />
                                            <InputError message={errors.status} className="mt-2" />
                                        </div>                                     
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="mb-3 mt-3">
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
                                            <InputLabel htmlFor="avatar" value="Profile Image" className='form-label' />

                                            <TextInput
                                                id="avatar"
                                                type="file"
                                                value={data.avatar}
                                                className="form-control"
                                                onChange={e => setData('avatar', e.target.files[0])}
                                            />

                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>Save</PrimaryButton>
                                <SecondaryLink href={route('user.index')} className='ml-1'>Back</SecondaryLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
