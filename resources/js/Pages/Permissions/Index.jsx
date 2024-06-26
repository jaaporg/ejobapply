import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, permissions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Role</h2>}
        >
            <Head title="permissions" />

            <div className="row">
                <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="row mb-xl-3">
                                <div className="col-auto d-none d-sm-block">
                                    <h3><strong>User</strong></h3>
                                </div>

                                <div className="col-auto ms-auto text-end mt-n1">
                                    <Link href="#" className="btn btn-primary">New User</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Guard</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.data.map(({ id, name, status }) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{status}</td>
                                            <td>
                                                <Link className='btn btn-primary'>Edit</Link>
                                                <Link className='btn btn-danger'>Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* <Pagination className="mt-6" links={users.links} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}