import React, { FC, useRef, memo } from 'react';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { ErrorMessage } from 'formik';


interface Props {
    defaultValue: string | undefined,
    formik: any,
    name: string
}


const MyEditor: FC<Props> = ({ defaultValue, formik, name }) => {


    const editorRef = useRef<Editor>(null);

    const handleHistory = () => {
        const quillEditor = editorRef.current?.getQuill();
        if (quillEditor) {
            quillEditor.history.undo();
        }
    };

    const handleHistoryRedo = () => {
        const quillEditor = editorRef.current?.getQuill();
        if (quillEditor) {
            quillEditor.history.redo();
        }
    };

    var toolbarOptions = [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'font': [] }],
        ['bold', 'underline', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        [{ 'color': [] }, { 'background': [] }],
        ['undo', 'redo'],
    ];


    const renderHeader = () => {
        return (
            <span className="hidden ql-formats">
                {/* <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className='ql-color' aria-label='Color' >io</button>
                <button className="ql-history" aria-label="History" onClick={handleHistory}><Iconify icon='majesticons:undo' className='text-3xl text-mute inline-flex' /></button>
                <button className="ql-history" aria-label="History" onClick={handleHistoryRedo}><Iconify icon='majesticons:redo' className='text-3xl text-mute inline-flex' /></button> */}
            </span>
        );
    };

    const header = renderHeader();



    return (
        <div >
            <Editor
                onTextChange={(e: EditorTextChangeEvent) => {
                    formik.setFieldValue(name, e.textValue);
                }}
                ref={editorRef}
                modules={
                    {
                        toolbar: toolbarOptions
                    }
                }
                // value={defaultValue}
                className='h-[50vh] pb-11'
                headerTemplate={header}
            />

            <ErrorMessage name={name} component="div" className='text-red-500 mini_sub_text' />
        </div>
    );
}

export default memo(MyEditor);

