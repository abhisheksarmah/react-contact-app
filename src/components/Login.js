import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { logIn } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const submitFormData = async () => {
    console.log("Submitting...");
    try {
      const response = await logIn(formValues);
      console.log(response);
      setFormValues(initialValues);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Input is validated");
      submitFormData();
    }
  }, [formErrors]);

  const validate = (values) => {
    console.log("Validating input");
    const errors = {};
    if (!values.username) {
      errors.username = "User name is required";
    }
    if (!values.password) {
      errors.password = "Password  is required";
    }
    return errors;
  };

  return (
    <div>
      <h2>Login</h2>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <p style={{ marginTop: "5px", color: "red" }}>
            {formErrors.username}
          </p>
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p style={{ marginTop: "5px", color: "red" }}>
            {formErrors.password}
          </p>
        </div>
        <button className="ui fluid button blue">Login</button>
      </form>
    </div>
  );
}
