import { Link } from '@inertiajs/react';

export default function SettingsTab({ tabs = {}, active = '', children }) {
    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="">
                    <div className="sm:p-2 bg-white shadow sm:rounded-lg">
                        <ul className="nav-tabs">
                            {tabs.map(({ title, tab, url }, index) => (
                                <li key={index} className={'nav-link mt-1' + (tab == active ? ' active' : '')}>
                                    <Link href={url} className='nav-link d-none d-sm-inline-block ml-3'>
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-sm-9">
                {children}
            </div>
        </div>
    );
}
