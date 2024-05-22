import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from './errorMessage'
import { SelectOptions } from '@/app/lib/interfaces';
import PhoneInput from 'react-phone-input-2';
import Iconify from '@/components/elements/icon';
import clsx from 'clsx'

interface Props {
    label: string,
    name: string,
    control: any,
    isRequired?: boolean,
    defaultValue?: string,
    placeholder: string,
    errors: any,
    selectOptions?: SelectOptions[],
    type?: string,
    handleShowPassword?: () => void,
    handleOnChange?: (value: string) => void,
    handleOnBlur?: (value: string) => void
    disabled?: boolean,
    valid?: string | null
}


const CustomInputField: FC<Props> = ({ valid, handleOnBlur, disabled = false, selectOptions, type, label, handleShowPassword, name, control, isRequired, defaultValue, placeholder, errors, handleOnChange }) => {
    return (
        <div className='space-y-1 relative'>
            <label htmlFor={name}> {isRequired && <span className="text-red-600">*</span>} {label}</label>
            {
                selectOptions ? (
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        render={
                            ({ field, fieldState }) => (
                                <select
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                        if (handleOnChange) {
                                            handleOnChange(e.target.value)
                                        }
                                    }}
                                    className={`w-full text-sm h-10 border focus:border-theme border-slate-300 rounded-lg outline-none placeholder:text-sm placeholder:text-gray-250 focus-within:border-primary px-3 ${fieldState.error ? 'border-red-500' : ''}`}
                                    placeholder={placeholder}
                                >
                                    <option className='text-gray-200 text-sm' value="" >Select an option</option>
                                    {selectOptions.map((option: any, index: any) => (
                                        <option key={index} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                    />
                ) : (

                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        render={
                            ({ field, fieldState }) => (
                                type === 'tel' ? (
                                    <PhoneInput
                                        country="ng"
                                        placeholder={label}
                                        inputStyle={{ height: '40px', width: '100%', fontFamily: "poppins" }}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                ) : (
                                    <div className='flex items-center  relative'>
                                        <input
                                            type={type}
                                            id={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={(e) => {
                                                if (handleOnBlur) {
                                                    handleOnBlur(e.target.value)
                                                }
                                            }}
                                            className={`w-full text-sm h-10 border focus:border-theme border-slate-300 rounded-lg outline-none placeholder:text-sm placeholder:text-gray-250 focus-within:border-primary px-3 ${fieldState.error ? 'border-red-500' : ''}`}
                                            placeholder={placeholder}
                                            disabled={disabled}
                                        />
                                        {
                                            handleShowPassword && (
                                                <span className='absolute right-3 mt-1'>
                                                    <button
                                                        type='button'
                                                        onClick={handleShowPassword}
                                                        title={type === 'text' ? 'Hide password' : 'Show password'}
                                                    >
                                                        {
                                                            type === "password" ? (
                                                                <Iconify icon='fluent:eye-off-16-filled' className='text-xl text-mute' />
                                                            ) : (
                                                                <Iconify icon='fluent:eye-12-filled' className='text-xl text-mute' />
                                                            )
                                                        }
                                                    </button>
                                                </span>
                                            )
                                        }
                                    </div>
                                )

                            )}
                    />
                )
            }

            {
                valid !== null && (
                    <span
                        className={clsx(
                            'absolute inset-y-0 flex items-center right-3 top-5',
                        )}>
                        {valid === "loading" && (<Iconify icon='gg:spinner' className='text-xl text-gray-400 animate-spin' />)}
                        {valid === "failed" && (<Iconify icon='uil:times-circle' className='text-lg text-red-500' />)}
                        {valid === "success" && (<Iconify icon='lets-icons:check-fill' className='text-xl text-green-500' />)}
                    </span>
                )
            }

            {errors[name] && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
        </div>
    )
}

export default CustomInputField