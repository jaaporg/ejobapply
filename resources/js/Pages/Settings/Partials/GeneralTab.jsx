import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
// import Checkbox from '@/Components/Checkbox';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function GeneralTab({ className = '' }) {
    const { data, setData, errors, put, processing, progress, recentlySuccessful } = useForm({
        app_name: '',
        app_logo: '',
        app_favicon: '',
    });

    const updateSettings = (e) => {
        e.preventDefault();

        put(route('settings.update'));

        console.log(data);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">General Settings</h2>

            </header>

            <form onSubmit={updateSettings} className="mt-3 space-y-6" >
                <div>
                    <InputLabel htmlFor="app_name" value="App Name" />

                    <TextInput
                        id="app_name"
                        value={data.app_name}
                        onChange={(e) => setData('app_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="app_name"
                    />

                    <InputError message={errors.app_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="app_logo" value="App logo" />

                    {/* <TextInput
                        id="app_logo"
                        // value={data.app_logo}
                        onChange={(e) => setData('app_logo', e.target.files)}
                        type="file"
                        className="mt-1 block w-full"
                    /> */}
                    <input
                        type="file"
                        className="w-full px-4 py-2"
                        label="File"
                        name="app_logo"
                        onChange={(e) =>
                            setData("app_logo", e.target.files[0])
                        }
                    />

                    <InputError message={errors.app_logo} className="mt-2" />
                </div>

                {data.app_logo && (
                    <div>
                        {/* <img
                            alt="not found"
                            width={"250px"}
                            src={window.URL.createObjectURL(data.app_logo)}
                        /> */}
                        {data.app_logo}
                        <br />
                        <button onClick={() => setData('app_logo', '')}>Remove</button>
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="app_favicon" value="Favicon" />

                    <TextInput
                        id="app_favicon"
                        value={data.app_favicon}
                        onChange={(e) => setData('app_favicon', e.target.files[0])}
                        type="file"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.app_favicon} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved settings.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}