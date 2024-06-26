import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, permissions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions Edit</h2>}
        >
            <Head title="Permissions Edit" />

            <div className="row">
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="row mb-xl-3">
                                <div className="col-auto d-none d-sm-block">
                                    <h3><strong>Permissions Edit</strong></h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="bg-light p-4 rounded">
                                <h2>Edit permission</h2>
                                <div className="lead">
                                    Editing permission.
                                </div>

                                <div className="container mt-4">

                                    <form method="POST" action="{{ route('permissions.update', $permission->id) }}">
                                        <div className="mb-3">
                                            <label for="name" className="form-label">Name</label>
                                            {/* <input value="{{ $permission->name }}"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Name" required> */}

                                                {/* <span className="text-danger text-left">{{ $errors-> first('name')}}</span> */}
                                        </div>

                                        <button type="submit" className="btn btn-primary">Save permission</button>
                                        <a href="{{ route('permissions.index') }}" className="btn btn-default">Back</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}