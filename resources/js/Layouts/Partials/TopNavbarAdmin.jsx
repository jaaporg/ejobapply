// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function TopNavbarAdmin({ auth }) {
	return (
		<nav className="navbar navbar-expand navbar-light navbar-bg">
			<a className="sidebar-toggle js-sidebar-toggle">
				{/* <i className="hamburger align-self-center"></i> */}
			</a>
			<div className="navbar-collapse">
			{/* <div className="navbar-collapse collapse"> */}
				<ul className="navbar-nav navbar-align">
					<li className="nav-item dropdown text-right">
						<a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#"
							data-bs-toggle="dropdown">
							<span className="text-dark">English</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end">
							<Link
								href={route('profile.edit')}
								className="dropdown-item"
							><i className="align-middle me-1"
								data-feather="user"></i>Bangla</Link>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#"
							data-bs-toggle="dropdown">
							<i className="align-middle" data-feather="settings"></i>
						</a>

						<a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#"
							data-bs-toggle="dropdown">
							{/* <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-1"
						alt="Charles Hall" /> */}
							<span className="text-dark">{auth.name}</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end">
							<Link
								href={route('profile.edit')}
								className="dropdown-item"
							>
								<i className="align-middle me-1"
								data-feather="user"></i>
								Profile
							</Link>

							<Link
								href={route('password.edit')}
								className="dropdown-item"
							>
								<i className="align-middle me-1"
								data-feather="user"></i>
								Update Password
							</Link>

							<div className="dropdown-divider"></div>

							<Link className="dropdown-item" href={route('logout')} method="post" as="button">Log out</Link>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
}
