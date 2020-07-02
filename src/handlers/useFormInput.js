const useFormInput = (value, setValue) => {
    const handleChange = event => {
        setValue(event.target.value);
    };

    return {
        name: value,
        value,
        onChange: handleChange,
    };
};

export default useFormInput;