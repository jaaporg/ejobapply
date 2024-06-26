export default function Badge({ status = 'success', children }) {
    return (
        <span
            className={'badge bg-' + status}
        >{children}</span>
    );
}
