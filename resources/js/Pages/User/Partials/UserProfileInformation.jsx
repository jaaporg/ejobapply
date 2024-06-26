import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';

export default function UserProfileInformation({ user, className='' }) {

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            </header>

            <div className='mb-3'>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={user.name}
                    readonly='true'
                />
            </div>

            <div className='mb-3'>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={user.email}
                    readonly='true'
                />
            </div>

            <div className='mb-3'>
                <InputLabel htmlFor="country_id" value="Country" className='form-label' />
            </div>

            <div className='mb-3'>
                <InputLabel htmlFor="address" value="Address" className='form-label' />

                <TextareaInput
                    id="address"
                    name="address"
                    value={user.address}
                    className="form-control form-control-lg"
                    autoComplete="address"
                    readonly='true'
                ></TextareaInput>
            </div>
        </section>
    );
}
