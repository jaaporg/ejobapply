import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', countries }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address_1,
        country_id: user.country_id ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-3 space-y-6">
                <div>
                    <InputLabel htmlFor="first_name" value="First Name*" />
                    <TextInput
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        autoComplete="first_name"
                    />
                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name*" />
                    <TextInput
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        autoComplete="last_name"
                    />
                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
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

                <div>
                    <InputLabel htmlFor="address" value="Address" className='form-label' />

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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
