export default function Breadcrumb({ breadcrumbs = [], className = '' }) {
    return (
        <nav className={"flex mb-3 breadcrumb" + className} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {breadcrumbs.map(({ name }, index) => (
                    <li className="inline-flex items-center" key={index}>
                        <div href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400">
                            {name}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
