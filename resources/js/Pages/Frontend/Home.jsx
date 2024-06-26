import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Home({}) {
    return (
        <GuestLayout>
            <Head title="Home Page" />
            <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">
                    Sign in to your account to continue
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-3">
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <form onSubmit={submit}>
                            <div className='mb-3'>
                                <InputLabel htmlFor="email" value="Email" className='form-label' />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-control form-control-lg"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-3">
                                <InputLabel htmlFor="password" value="Password" className='form-label'/>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-control form-control-lg"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="block mt-4">
                                <label className="form-check-label text-small">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        className='form-check-input'
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <PrimaryButton className="btn btn-lg btn-primary" disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
