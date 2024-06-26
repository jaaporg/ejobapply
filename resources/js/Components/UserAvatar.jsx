export default function UserAvatar({ className = '', children, ...props }) {
    return (
        <div className='d-flex align-items-start'>
            {props.src != null && (
                <img
                    {...props}
                    className={
                        `rounded-circle me-2 ` + className
                    }
                />
            )}
            <div className="mt-2">{children}</div>
        </div>
    );
}
