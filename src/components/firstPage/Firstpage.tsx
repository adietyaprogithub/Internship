import React, { useState } from "react";
import styles from "./firstpage.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

interface Info {
  first: string;
  phone: string;
  email: string;
}

function Firstpage() {
  const [data, setdata] = useState<Info>({
    first: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate(); // Use the correct hook name

  const [info, setinfo] = useState<Info[]>([]);
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({
    first: "",
    phone: "",
    email: "",
  });

  const chandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    setInputErrors({ ...inputErrors, [e.target.name]: "" }); // Clear error message
  };

  const handler = () => {
    const errors: { [key: string]: string } = {};

    if (data.first.length <= 2) {
      errors.first = "Name should be at least 3 characters long";
    }

    if (data.phone.length !== 10) {
      errors.phone = "Phone number should be 10 digits long";
    }

    if (data.email.length <= 4) {
      errors.email = "Email should be at least 5 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return; // Don't proceed if there are errors
    }

    setinfo([
      ...info,
      {
        first: data.first,
        phone: data.phone,
        email: data.email,
      },
    ]);

    // Save to local storage
    localStorage.setItem("info", JSON.stringify(info));

    // Clear input fields
    setdata({
      first: "",
      phone: "",
      email: "",
    });

    navigate("/secondpage"); // Use the navigate function to redirect
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.label1}>Form Submission</h2>
      <label htmlFor="first" className={styles.label}>
        Name
      </label>
      <br />
      <input
        type="text"
        name="first"
        id="first"
        required
        onChange={chandler}
        value={data.first}
        className={styles.input}
      />
      {inputErrors.first && <div className={styles.error}>{inputErrors.first}</div>}
      <br />
      <label htmlFor="phone" className={styles.label}>
        Phone
      </label>
      <br />
      <input
        type="number"
        name="phone"
        id="phone"
        required
        onChange={chandler}
        value={data.phone}
        className={styles.input}
      />
      {inputErrors.phone && <div className={styles.error}>{inputErrors.phone}</div>}
      <br />
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={chandler}
        value={data.email}
        className={styles.input}
      />
      {inputErrors.email && <div className={styles.error}>{inputErrors.email}</div>}
      <br />
      <div className={styles.btn}>
        <button onClick={handler} className={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Firstpage;
