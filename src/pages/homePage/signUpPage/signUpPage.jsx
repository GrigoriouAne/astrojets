import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signUpPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { registerUser } from "../../../utils/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    registerUser(email, password);
    navigate("/sign-in");
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img className={navbarStyles.waves} src={waves} alt="" aria-hidden="true" />
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link to="/sign-in" className={styles.footerLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;