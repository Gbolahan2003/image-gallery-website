import React, { FC, useState } from 'react';
import { useController } from 'react-hook-form';
import { ErrorMessage } from './errorMessage';


interface Props {
    name: string;
    label?: string;
    control: any;
    id?: string
}

const CustomCheckBox: FC<Props> = ({ name, control, label, id }) => {


    const { field, fieldState } = useController({
        name,
        control,
    });

    const [value, setValue] = useState((field.value === "1" ? true : false) || false)

    const handleChange = (newValue: boolean) => {
        setValue(newValue)
        field.onChange(newValue ? "1" : "0")
    }


    return (
        <div className='space-y-2'>
            <div className='flex gap-3 items-center'>
                <input
                    id={id}
                    checked={value}
                    type='checkbox'
                    onChange={(e) => handleChange(e.target.checked)}
                    className="w-4 h-4 text-theme accent-theme bg-gray-100 border-gray-300 rounded focus:ring-theme"
                />
                {
                    label && (
                        <label htmlFor={id}>{label}</label>
                    )
                }
            </div>
            {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
        </div>
    );
};

export default CustomCheckBox;
