import InputLabel from '@/Components/InputLabel';

export default function BackupTab({ className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Database Backup</h2>
            </header>

            <div>
                <InputLabel htmlFor="app_logo" value="Clear view cache" />
            </div>
        </section>
    )
}