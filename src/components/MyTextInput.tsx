import { ErrorMessage, useField } from 'formik';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'search' | 'color' | 'file' | 'hidden';
    placeholder?: string;
    [x: string]: any;
}


export const MyTextInput = ( { label, ...props }: Props ) => {

    const [ field ] = useField(props)

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <input className="form-control" { ...field } { ...props } />
            <ErrorMessage name={ props.name } component="span" />
        </>
    )
}
