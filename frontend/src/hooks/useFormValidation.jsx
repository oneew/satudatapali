import React from 'react'

const useFormValidation = () => {
    const [error, setError] = React.useState({
        name: false,
        email: false,
        username: false,
        password: false,
      });
      const [helperText, setHelperText] = React.useState({
        name: "",
        email: "",
        username: "",
        password: "",
      });
    
      const validate = (name, email, username, password) => {
        let isValid = true;
    
        if (name.length < 3) {
          setError((prev) => ({ ...prev, name: true }));
          setHelperText((prev) => ({
            ...prev,
            name: "Nama harus minimal 3 karakter.",
          }));
          isValid = false;
        } else {
          setError((prev) => ({ ...prev, name: false }));
          setHelperText((prev) => ({ ...prev, name: "" }));
        }
        if (username.length < 3) {
          setError((prev) => ({ ...prev, name: true }));
          setHelperText((prev) => ({
            ...prev,
            name: "Username harus minimal 3 karakter.",
          }));
          isValid = false;
        } else {
          setError((prev) => ({ ...prev, name: false }));
          setHelperText((prev) => ({ ...prev, name: "" }));
        }
    
        if (password.length < 8) {
          setError((prev) => ({ ...prev, name: true }));
          setHelperText((prev) => ({
            ...prev,
            name: "Password harus memiliki minimal 8 karakter.",
          }));
          isValid = false;
        } else {
          setError((prev) => ({ ...prev, name: false }));
          setHelperText((prev) => ({ ...prev, name: "" }));
        }
    
        if (!email.includes("@") || !email.includes(".")) {
          setError((prev) => ({ ...prev, email: true }));
          setHelperText((prev) => ({ ...prev, email: "Email tidak valid." }));
          isValid = false;
        } else {
          setError((prev) => ({ ...prev, email: false }));
          setHelperText((prev) => ({ ...prev, email: "" }));
        }
    
        return isValid;
      };

    return {error, helperText, validate, setError, setHelperText};
}

export default useFormValidation;