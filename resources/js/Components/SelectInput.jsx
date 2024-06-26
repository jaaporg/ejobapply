import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ options = [], trackBy = 'id', labelName = 'name', placeholder = 'Select', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            <option value=" ">{ placeholder }</option>
            { options.map((row) => (
                <option value={row[trackBy]} key={row[trackBy]}>{row[labelName]}</option>
            ))}
        </select>
    );
});
