import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions Create</h2>}
        >
            <Head title="Permissions Create" />

            <div className="row">
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="row mb-xl-3">
                                <div className="col-auto d-none d-sm-block">
                                    <h3><strong>Permissions Create</strong></h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="bg-light p-4 rounded">
                                <div className="container mt-4">
                                    <form method="POST" action="{{ route('permissions.store') }}">
                                        <div className="mb-3">
                                            <label for="name" className="form-label">Name</label>
                                            {/* <input value="{{ old('name') }}"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Name" required> */}
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