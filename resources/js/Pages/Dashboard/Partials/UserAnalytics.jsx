import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";

export default function UserAnalytics({ count, monthlyCount, usersRegisteredThisMonth }) {
    const { t } = useTranslation();
    useEffect(() => {
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
        // Line chart
        new Chart(document.getElementById("chartjs-dashboard-line"), {
            type: "line",
            data: {
                labels: [t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun"), t("jul"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec")],
                datasets: [{
                    label: "Sales ($)",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: window.theme.primary,
                    data: monthlyCount
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
    }, []);
    return (
        <div className="row">
            <div className="col-xl-12 col-xxl-12 d-flex">
                <div className="w-100">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">{t('total user')}</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <FontAwesomeIcon icon={faUsers} />
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">{count.total_user}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">{t('new user')}</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <FontAwesomeIcon icon={faUsers} />
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">{usersRegisteredThisMonth}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">{t('active user')}</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <FontAwesomeIcon icon={faUsers} />
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">{count.active_user}</h1>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-3'>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">{t('inactive user')}</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <FontAwesomeIcon icon={faUsers} />
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">{count.inactive_user}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-12 col-xxl-7">
                <div className="card flex-fill w-100">
                    <div className="card-body py-3">
                        <h5 className="card-title mb-3">{t('registration history')}</h5>
                        <div className="chart chart-sm">
                            <canvas id="chartjs-dashboard-line"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
