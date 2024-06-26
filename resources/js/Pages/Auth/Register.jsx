import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        organization_name: '',
    });

    useEffect(() => {
        console.log(errors)
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="card">
                <div className="card-body">
                    <div className="m-sm-3">
                        <div className="text-center mt-4">
                            <h1 className="h2">Get started</h1>
                            <p className="lead">
                                Start creating the best possible user experience for you customers.
                            </p>
                        </div>

                        {errors.error && (
                            <div className="mb-4 font-medium text-sm text-red-600">
                                {errors.error}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="organization_name" value="Organization Name" className='form-label' />

                                <TextInput
                                    id="organization_name"
                                    name="organization_name"
                                    value={data.organization_name}
                                    className="form-control form-control-lg"
                                    autoComplete="organization_name"
                                    isFocused={true}
                                    onChange={(e) => setData('organization_name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.organization_name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name" className='form-label' />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="form-control form-control-lg"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" className='form-label' />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-control form-control-lg"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" className='form-label' />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-control form-control-lg"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='form-label' />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="form-control form-control-lg"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('login')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
