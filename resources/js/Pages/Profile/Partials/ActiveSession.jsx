export default function ActiveSession({ sessions = [], className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Login Session</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>
                            IP
                        </th>
                        <th>Agent</th>
                        <th>Last Activity</th>
                    </tr>
                </thead>

                <tbody>
                    {sessions.map(({ id, ip, agent, last_activity }) => (
                        <tr key={id}>
                            <td>{ip}</td>
                            <td>{agent}</td>
                            <td>{last_activity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </section>
    );
}
