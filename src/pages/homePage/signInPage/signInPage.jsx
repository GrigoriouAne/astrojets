import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signInPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { findUserByEmail, loginUser } from "../../../utils/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUser = findUserByEmail(email);

    if (!registeredUser) {
      setError("No account found. Please create one first.");
      return;
    }

    if (registeredUser.password === password) {
      loginUser(registeredUser.email);

      if (registeredUser.email.toLowerCase() === "astrojets.ws@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img className={navbarStyles.waves} src={waves} alt="" aria-hidden="true" />
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>

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

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>

        <p className={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/sign-up" className={styles.footerLink}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;