'use client'
import React, { FC, useState } from 'react'
import SimpleBar from 'simplebar-react';
import Iconify from '../elements/icon';
import clsx from 'clsx';
import { SelectOptions } from '@/app/lib/interfaces';
import { Button } from '../elements/button';



interface SelectFieldProps {
    label?: string;
    className?: string;
    icon?: string;
    isDisabled?: boolean;
    hasError?: any;
    isRequired?: boolean;
    errorMessage?: string | undefined;
    selectOptions: SelectOptions[];
    defaultValue?: string;
    placeholder?: string,
    optionBtnLabel?: string,
    handleOptionBtn?: () => void
    handleChange: (value: string | number) => void
    filterType?: boolean
}



const SelectField: FC<SelectFieldProps> = ({
    label,
    className,
    icon,
    isDisabled = false,
    hasError,
    isRequired,
    errorMessage,
    selectOptions,
    defaultValue = "",
    placeholder,
    optionBtnLabel,
    handleOptionBtn,
    handleChange,
    filterType = false
}) => {

    const [openTab, setOpenTab] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")

    const updateOptionField = (option: any) => {
        if (option) {
            handleChange(option.id)
        }
        // setValue(field, option.id);
        setSelectedOption(option.name);
        setOpenTab(false);
    }




    return (
        <div>
            <label htmlFor={label}> {isRequired && <span className="text-red-600">*</span>} {label}</label>
            <div className='relative'>
                <section>
                    <button
                        type='button'
                        disabled={isDisabled}
                        onClick={() => setOpenTab(!openTab)}
                        onBlur={() =>
                            setTimeout(() => {
                                setOpenTab(false)
                            }, 500)
                        }
                        className={clsx(
                            'w-full rounded-md border border-gray-300 input bg-white bg-transparent px-3 outline-none placeholder:text-sm placeholder:text-gray-250 focus-within:border-theme disabled:bg-gray-100 subtitles flex justify-between items-center',
                            hasError && 'border-red-500',
                            className,
                        )}>
                        <div className='flex items-center w-full justify-between'>
                            {
                                filterType ? (
                                    <p className='whitespace-nowrap w-[96%] truncate'>{defaultValue ? defaultValue : selectedOption ? selectedOption : <p className='text-mute'>{placeholder}</p>}</p>
                                ) : (
                                    <p className='whitespace-nowrap w-[96%] truncate'>{selectedOption ? selectedOption : defaultValue ? defaultValue : <p className='text-mute'>{placeholder}</p>}</p>
                                )
                            }

                            <div className='flex-none'>
                                <Iconify icon='iconamoon:arrow-down-2' className='text-2xl text-mute' />
                            </div>
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openTab ? 'max-h-64 mt-1 opacity-100 shadow-lg' : 'max-h-0 opacity-0'} absolute z-[50] bg-white w-full border border-slate-200 rounded-lg`}
                    >

                        <SimpleBar className='max-h-56'>
                            {selectOptions.map((option: any, index: any) => (
                                <button type='button' key={index} onClick={() => updateOptionField(option)} className='cursor-pointer options truncate whitespace-nowrap text-ellipsis w-full mx-auto py-3 px-4 hover:bg-gray-100'>
                                    {option.name}
                                </button>

                            ))}
                            {
                                handleOptionBtn && (
                                    <div className='p-3'>
                                        <Button variant='primary' size='full' onClick={handleOptionBtn}>{optionBtnLabel}</Button>
                                    </div>
                                )
                            }
                        </SimpleBar>
                    </div>
                </section>
                <p>{errorMessage}</p>
            </div>
        </div>
    )
}

export default SelectField