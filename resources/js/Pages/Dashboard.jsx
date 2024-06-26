import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard({ auth }) {
    useEffect(() => {
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
        // Line chart
        new Chart(document.getElementById("chartjs-dashboard-line"), {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Sales ($)",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: window.theme.primary,
                    data: [
                        2115,
                        1562,
                        1584,
                        1892,
                        1587,
                        1923,
                        2566,
                        2448,
                        2805,
                        3438,
                        2917,
                        3327
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    intersect: false
                },
                hover: {
                    intersect: true
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                        reverse: true,
                        gridLines: {
                            color: "rgba(0,0,0,0.0)"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            stepSize: 1000
                        },
                        display: true,
                        borderDash: [3, 3],
                        gridLines: {
                            color: "rgba(0,0,0,0.0)"
                        }
                    }]
                }
            }
        });

        new Chart(document.getElementById("chartjs-dashboard-pie"), {
            type: "pie",
            data: {
                labels: ["Chrome", "Firefox", "IE"],
                datasets: [{
                    data: [4306, 3801, 1689],
                    backgroundColor: [
                        window.theme.primary,
                        window.theme.warning,
                        window.theme.danger
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: !window.MSInputMethodContext,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                cutoutPercentage: 75
            }
        });

        new Chart(document.getElementById("chartjs-dashboard-bar"), {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "This year",
                    backgroundColor: window.theme.primary,
                    borderColor: window.theme.primary,
                    hoverBackgroundColor: window.theme.primary,
                    hoverBorderColor: window.theme.primary,
                    data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                    barPercentage: .75,
                    categoryPercentage: .5
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        stacked: false,
                        ticks: {
                            stepSize: 20
                        }
                    }],
                    xAxes: [{
                        stacked: false,
                        gridLines: {
                            color: "transparent"
                        }
                    }]
                }
            }
        });

        var markers = [{
            coords: [31.230391, 121.473701],
            name: "Shanghai"
        },
        {
            coords: [28.704060, 77.102493],
            name: "Delhi"
        },
        {
            coords: [6.524379, 3.379206],
            name: "Lagos"
        },
        {
            coords: [35.689487, 139.691711],
            name: "Tokyo"
        },
        {
            coords: [23.129110, 113.264381],
            name: "Guangzhou"
        },
        {
            coords: [40.7127837, -74.0059413],
            name: "New York"
        },
        {
            coords: [34.052235, -118.243683],
            name: "Los Angeles"
        },
        {
            coords: [41.878113, -87.629799],
            name: "Chicago"
        },
        {
            coords: [51.507351, -0.127758],
            name: "London"
        },
        {
            coords: [40.416775, -3.703790],
            name: "Madrid "
        }
        ];
        var map = new jsVectorMap({
            map: "world",
            selector: "#world_map",
            zoomButtons: true,
            markers: markers,
            markerStyle: {
                initial: {
                    r: 9,
                    strokeWidth: 7,
                    stokeOpacity: .4,
                    fill: window.theme.primary
                },
                hover: {
                    fill: window.theme.primary,
                    stroke: window.theme.primary
                }
            },
            zoomOnScroll: false
        });
        window.addEventListener("resize", () => {
            map.updateSize();
        });

        document.addEventListener("DOMContentLoaded", function () {
			var date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
			var defaultDate = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
			document.getElementById("datetimepicker-dashboard").flatpickr({
				inline: true,
				prevArrow: "<span title=\"Previous month\">&laquo;</span>",
				nextArrow: "<span title=\"Next month\">&raquo;</span>",
				defaultDate: defaultDate
			});
		});
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="container-fluid p-0">

                <h1 className="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>

                <div className="row">
                    <div className="col-xl-6 col-xxl-5 d-flex">
                        <div className="w-100">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Sales</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="truck"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">2.382</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i
                                                    className="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Visitors</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="users"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">14.212</h1>
                                            <div className="mb-0">
                                                <span className="text-success"> <i
                                                    className="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Earnings</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="dollar-sign"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">$21.300</h1>
                                            <div className="mb-0">
                                                <span className="text-success"> <i
                                                    className="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col mt-0">
                                                    <h5 className="card-title">Orders</h5>
                                                </div>

                                                <div className="col-auto">
                                                    <div className="stat text-primary">
                                                        <i className="align-middle" data-feather="shopping-cart"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <h1 className="mt-1 mb-3">64</h1>
                                            <div className="mb-0">
                                                <span className="text-danger"> <i
                                                    className="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
                                                <span className="text-muted">Since last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-xxl-7">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Recent Movement</h5>
                            </div>
                            <div className="card-body py-3">
                                <div className="chart chart-sm">
                                    <canvas id="chartjs-dashboard-line"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Browser Usage</h5>
                            </div>
                            <div className="card-body d-flex">
                                <div className="align-self-center w-100">
                                    <div className="py-3">
                                        <div className="chart chart-xs">
                                            <canvas id="chartjs-dashboard-pie"></canvas>
                                        </div>
                                    </div>

                                    <table className="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Chrome</td>
                                                <td className="text-end">4306</td>
                                            </tr>
                                            <tr>
                                                <td>Firefox</td>
                                                <td className="text-end">3801</td>
                                            </tr>
                                            <tr>
                                                <td>IE</td>
                                                <td className="text-end">1689</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Real-Time</h5>
                            </div>
                            <div className="card-body px-4">
                                <div id="world_map"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                        <div className="card flex-fill">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Calendar</h5>
                            </div>
                            <div className="card-body d-flex">
                                <div className="align-self-center w-100">
                                    <div className="chart">
                                        <div id="datetimepicker-dashboard"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-8 col-xxl-9 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Latest Projects</h5>
                            </div>
                            <table className="table table-hover my-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className="d-none d-xl-table-cell">Start Date</th>
                                        <th className="d-none d-xl-table-cell">End Date</th>
                                        <th>Status</th>
                                        <th className="d-none d-md-table-cell">Assignee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Project Apollo</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                                    </tr>
                                    <tr>
                                        <td>Project Fireball</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-danger">Cancelled</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                    <tr>
                                        <td>Project Hades</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Sharon Lessman</td>
                                    </tr>
                                    <tr>
                                        <td>Project Nitro</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-warning">In progress</span></td>
                                        <td className="d-none d-md-table-cell">Vanessa Tucker</td>
                                    </tr>
                                    <tr>
                                        <td>Project Phoenix</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                    <tr>
                                        <td>Project X</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Sharon Lessman</td>
                                    </tr>
                                    <tr>
                                        <td>Project Romeo</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-success">Done</span></td>
                                        <td className="d-none d-md-table-cell">Christina Mason</td>
                                    </tr>
                                    <tr>
                                        <td>Project Wombat</td>
                                        <td className="d-none d-xl-table-cell">01/01/2023</td>
                                        <td className="d-none d-xl-table-cell">31/06/2023</td>
                                        <td><span className="badge bg-warning">In progress</span></td>
                                        <td className="d-none d-md-table-cell">William Harris</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xxl-3 d-flex">
                        <div className="card flex-fill w-100">
                            <div className="card-header">

                                <h5 className="card-title mb-0">Monthly Sales</h5>
                            </div>
                            <div className="card-body d-flex w-100">
                                <div className="align-self-center chart chart-lg">
                                    <canvas id="chartjs-dashboard-bar"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
