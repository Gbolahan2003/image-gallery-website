import React, { FC, useRef } from 'react';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Controller } from 'react-hook-form';


interface Props {
    name: string
    defaultValue?: string,
    control: any,
    errors: any,
}


const MyEditor: FC<Props> = ({ name, defaultValue, control, errors }) => {

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

    // const handleColor = () => {
    //     const quillEditor = editorRef.current?.getQuill();
    //     if (quillEditor) {
    //         quillEditor.;
    //     }
    // };

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
            <span className="ql-formats">
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
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <div>
                        <Editor
                            ref={editorRef}
                            modules={
                                {
                                    toolbar: toolbarOptions
                                }
                            }
                            value={field.value}
                            onTextChange={(e: EditorTextChangeEvent) => field.onChange(e.htmlValue)}
                            className='h-[50vh] pb-11'
                            headerTemplate={header}
                        />
                        <div className=''>
                            {errors[name] && <p className='text-red-500 mini_sub_text'>{errors[name]?.message}</p>}
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

export default MyEditor;
