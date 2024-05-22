import React, { FC } from 'react'
import { Calendar } from 'primereact/calendar';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from './errorMessage'


interface Props {
    control: any,
    defaultValue?: string,
    name: string
    isRequired?: boolean,
    label: string,
    placeholder?: string,
    errors: any
}



const CustomCalendarField: FC<Props> = ({ errors, control, defaultValue, name, isRequired, label, placeholder }) => {

    return (
        <div>
            <label htmlFor={name}> {isRequired && <span className="text-red-600">*</span>} {label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState }) => (
                    <div className='space-y-1'>
                        <Calendar inputId={field.name} value={field.value} onChange={field.onChange} dateFormat="dd/mm/yy" className={`w-full text-sm h-10 border border-slate-300 rounded-lg ${fieldState.error ? 'p-invalid' : ''}`}
                            placeholder={placeholder} showIcon />
                        {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
                    </div>
                )}
            />
        </div>
    )
}

export default CustomCalendarField