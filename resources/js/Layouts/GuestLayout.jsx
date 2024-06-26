import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>

        <main className="d-flex w-100">
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
