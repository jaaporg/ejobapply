import { useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function PermissionUpdate({ permissionId, permissionName, children }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, patch, processing, errors } = useForm({
        id: permissionId,
        display_name: permissionName,
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        patch(route('permission.update', data.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };
    return (
        <>
            <SecondaryButton onClick={confirmUserDeletion}>{children}</SecondaryButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-3">
                    <h2 className='mt-3'>Update Permission</h2>
                    <div className="mt-3">
                        <InputLabel htmlFor="name" value="Permission Name" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            ref={passwordInput}
                            value={data.display_name}
                            onChange={(e) => setData('display_name', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="name"
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" onClick={deleteUser} disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    )
}