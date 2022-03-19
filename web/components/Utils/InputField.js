import { useField } from "formik";

export const InputField = ({ name, placeholder, ...props }) => {
    const [field, { error }] = useField(name);
    return (

        <input name={name} {...props} placeholder={placeholder} id={field.name}></input>
    )
}