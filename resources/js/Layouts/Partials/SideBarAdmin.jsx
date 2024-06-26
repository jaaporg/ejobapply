import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function SideBarAdmin({ auth }) {
    const { t } = useTranslation();
    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <Link
                    href={route('dashboard')}
                    className="sidebar-brand"
                >
                    <span className="align-middle">AdminKit</span>
                </Link>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        {t('pages')}
                    </li>

                    { auth.permissions.includes('dashboard') && (
                        <li className={"sidebar-item" + (route().current('dashboard') ? ' active' : '')} >
                            <NavLink
                                href={route('dashboard')}
                                className="sidebar-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                <span className="align-middle">{t('dashboard')}</span>
                            </NavLink>
                        </li>
                    )}

                    { auth.permissions.includes('user.index') && (
                        <li className={"sidebar-item" + (route().current('user.*') ? ' active' : '')} >
                            <NavLink
                                href={route('user.index')}
                                className="sidebar-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-user align-middle"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span className="align-middle">{t('user')}</span>
                            </NavLink>
                        </li>
                    )}

                    { auth.permissions.includes('roles.index') && (
                        <li className={"sidebar-item" + (route().current('roles.*') ? ' active' : '')} >
                            <NavLink
                                href={route('roles.index')}
                                className="sidebar-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-check-square align-middle"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                <span className="align-middle">{t('role')}</span>
                            </NavLink>
                        </li>
                    )}

                    { auth.permissions.includes('activity_log.index') && (
                        <li className={"sidebar-item" + (route().current('activity_log.*') ? ' active' : '')} >
                            <NavLink
                                href={route('activity_log.index')}
                                className="sidebar-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-check-square align-middle"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                <span className="align-middle">{t('activity log')}</span>
                            </NavLink>
                        </li>
                    )}
                    
                    {/* { auth.permissions.includes('settings') && (
                        <>
                            <li className="sidebar-header">
                                {t('tools & settings')}
                            </li> 

                            <li className={"sidebar-item" + (route().current('settings') ? ' active' : '')} >
                                <NavLink
                                    href={route('settings')}
                                    className="sidebar-link"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-list align-middle"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    <span className="align-middle">{t('settings')}</span>
                                </NavLink>
                            </li>
                        </>
                    )} */}
                </ul>
            </div>
        </nav>
    );
}
