// import React, { FC } from 'react';
// import { Field, ErrorMessage } from 'formik';
// import { Calendar } from 'primereact/calendar';


// interface CalendarInputProps {
//     label: string,
//     name: string,
//     formik?: any,
//     isRequired?: boolean,
//     defaultValue?: string
//     placeholder?: string
//     minDate?: Date | string
//     maxDate?: Date
//     showTime?: boolean
//     timeOnly?: boolean
//     view?:string
// }

// const CustomCalendarInput: FC<CalendarInputProps> = ({ view="date", minDate, maxDate, label, name, isRequired, formik, defaultValue, timeOnly = false, placeholder, showTime = false, ...props }) => {

//     if (timeOnly) {
//         return (
//             <div className={`space-y-1`}>
//                 <label htmlFor={name}>{isRequired && <span className="text-red-600">*</span>}{label}</label>
//                 <Field name={name}>
//                     {({ field }: any) => (
//                         <Calendar
//                             {...field}
//                             {...props}
//                             id={name}
//                             readOnlyInput
//                             timeOnly
//                             showIcon
//                             hourFormat='12'
//                             placeholder={defaultValue || placeholder}
//                             className={`w-full text-sm h-10 border border-slate-300 rounded-lg ${formik?.touched[name] && formik?.errors[name] ? 'p-invalid' : ''}`}
//                         />
//                     )}
//                 </Field>
//                 <ErrorMessage name={name} component="div" className='text-red-500 mini_sub_text' />
//             </div>
//         )
//     } else {
//         return (
//             <div className={`space-y-1`}>
//                 <label htmlFor={name}>{isRequired && <span className="text-red-600">*</span>}{label}</label>
//                 <Field name={name}
//                 >
//                     {({ field }: any) => (
//                         <Calendar
//                             {...field}
//                             {...props}
//                             id={name}
//                             minDate={minDate}
//                             maxDate={maxDate}
//                             showIcon
//                             readOnlyInput
//                             view={view}
//                             showTime={showTime}
//                             hourFormat='12'
//                             dateFormat="dd/mm/yy"
//                             placeholder={defaultValue || placeholder}
//                             className={`w-full text-sm h-10 border border-slate-300 rounded-lg ${formik?.touched[name] && formik?.errors[name] ? 'p-invalid' : ''}`}
//                         />
//                     )}
//                 </Field>
//                 <ErrorMessage name={name} component="div" className='text-red-500 mini_sub_text' />
//             </div>
//         )
//     }

// }

// export default CustomCalendarInput

import React from 'react'

const CustomCalender = () => {
  return (
    <div>CustomCalender</div>
  )
}

export default CustomCalender