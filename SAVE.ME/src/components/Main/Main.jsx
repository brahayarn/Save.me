import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; 
import { signUp, logIn, logOut } from "../../firebase/services/authService";
import styles from "./Main.css";
import textImage from "../../assets/images/textpg.png";
import backimg from '../../assets/images/backimg.svg';

const Main = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();



  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setSuccessMessage("Користувач успішно створений!");
      setError("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await logIn(email, password);
        const user = {
            email: userCredential.user.email,
            uid: userCredential.user.uid,
        }; 
        console.log("User Credential:", user); 
        setSuccessMessage("Користувач успішно увійшов!");
        setError("");
        setEmail("");
        setPassword("");
        navigate("/home", { state: { user } });
    } catch (err) {
        setError(err.message);
        setSuccessMessage("");
    }
};


  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      setSuccessMessage("Користувач успішно вийшов!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };
  return (
    <div className={styles.main}
    style={{ backgroundImage: `url(${backimg})` }}
    >
      <div className={styles.authform}>
      <h1>Будь в потоці</h1>
      <form >
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSignUp} className={styles.button}>Зареєструватися</button>
        <button onClick={handleLogIn} className={styles.button}>Ввійти</button>
      </form>
      </div>
      
      <div>
        <img src={textImage} alt="text-image" className={styles.text__image} />
      </div>
    </div>
  )
}
export default Main