import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/citibankbody.png';
import formimage from '../assets/citi.png';
import icon from '../assets/download.svg'; // Replace with your eye icon if needed
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdQrCodeScanner } from 'react-icons/md';
import './login.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message  || 'Invalid credentials, please try again');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="citi-card-container">
        <div className="citi-card-header">
          <p>CITI CUSTOM CASH® CARD</p>
          <h1>Earn 5% cash back on purchases</h1>
          <div className="card-new-para">
            in your top eligible spend category each billing cycle, up to the first $500 spent.
          </div>
          <button className="learn-more-btn">Apply Now</button>
        </div>
        <div className="login-card">
          <img src={formimage} alt="Card" className="login-card-img" />
        </div>
        <div className="citi-card-login-form">
          <div className="citi-card-login">
            <div className="login-field">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                placeholder="userID"
                id="userId"
                name="userId"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={ showPassword ? 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMy43OTkgMTEuMzcxYy0xLjgwNS0yLjIyMy0zLjU1OC0zLjkzNi01LjMwOC01LjE1NGw0LjM2My00LjM2M2EuNS41IDAgMSAwLS43MDctLjcwOGwtNC41MTUgNC41MTZDMTUuNzkzIDQuNTYgMTMuOTQ4IDQgMTIuMDM0IDQgNy45OTkgNCA0LjIzMyA2LjQ1Ni4yMDYgMTEuMzY3YS44ODMuODgzIDAgMCAwLS4wMDIgMS4xM2MxLjgyNyAyLjI1NSAzLjU5NiAzLjk5OCA1LjM1NiA1LjIzNmwtNC40MTMgNC40MTNhLjUwMi41MDIgMCAwIDAgLjM1NS44NTQuNDk4LjQ5OCAwIDAgMCAuMzUzLS4xNDZsNC41Ni00LjU2QzguMjcxIDE5LjQyNiAxMC4xMjUgMjAgMTIuMDM3IDIwYzQuMDE0IDAgNy43NS0yLjUwMyAxMS43NjYtNy41MDhhLjg4My44ODMgMCAwIDAtLjAwMy0xLjEyWm0tMTEuNzYzIDcuNjNjLTEuNjMzIDAtMy4yNS0uNDczLTQuODkzLTEuNDM2bDIuNDE3LTIuNDE5QTMuOTgxIDMuOTgxIDAgMCAwIDEyIDE2YTMuOTg4IDMuOTg4IDAgMCAwIDIuODI5LTEuMTcyYzEuNDQtMS40NCAxLjUzNS0zLjY5OC4zMTctNS4yNjdsMi42MjItMi42MjNjMS42ODUgMS4xNCAzLjQgMi43OSA1LjIgNC45OTZDMTkuMDg0IDE2Ljc1NCAxNS42MSAxOSAxMi4wMzYgMTlaTTkuODggOS44NzhhMi45NzggMi45NzggMCAwIDEgMy44NTMtLjMxOWwtNC4xNzEgNC4xNzJBMi45OTcgMi45OTcgMCAwIDEgOS44OCA5Ljg4Wk0xNSAxMmMwIC44MDEtLjMxMyAxLjU1NS0uODc5IDIuMTIxYTIuOTc2IDIuOTc2IDAgMCAxLTIuMTIuODhjLS42MzMgMC0xLjIzLS4yLTEuNzM0LS41Nmw0LjE3NC00LjE3NGMuMzYuNTA0LjU2IDEuMTAyLjU2IDEuNzMzWm0tMTMuOTY2LS4wNjZDNC45MjggNy4yMDQgOC40MjUgNSAxMi4wMzcgNWMxLjYzMiAwIDMuMjM3LjQ1OCA0Ljg2NSAxLjM5M0wxNC40NCA4Ljg1NEEzLjk3NyAzLjk3NyAwIDAgMCAxMiA4YTMuOTkyIDMuOTkyIDAgMCAwLTIuODI5IDEuMTcxYy0xLjQ0IDEuNDQxLTEuNTM0IDMuNy0uMzE3IDUuMjY4bC0yLjU3NSAyLjU3NmMtMS42OTEtMS4xNi0zLjQyMi0yLjgzOS01LjI0NC01LjA4WiIgZmlsbD0iIzA1NkRBRSIvPjwvc3ZnPg==' : icon }
                alt="Toggle Password Visibility"
                className="icon"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="citi-card-login">
            <div className="remember-user">
              <input type="checkbox" id="rememberUserId" name="rememberUserId" />
              <label htmlFor="rememberUserId">Remember User ID</label>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button className="sign-on-btn" onClick={handleLogin}>
              Sign On
            </button>
          )}
          {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

          <div className="citi-card-footer">
            <div className="footer-linkarea">

              <div className="footer-links">
                <a href="/register">Register </a>
                <span className="footer-para">/</span>
                <a href="/activate"> Activate</a>
              </div>
              <div className="footer-links">
                <span className="footer-para">Forgot </span>
                <a href="/forgot">User ID</a>
                <span className="footer-para">or </span>
                <a href="/password">Password</a>
              </div>
            </div>
         
          </div>

          <div className="footer-down-links">
              <MdQrCodeScanner className="footer-drive" />
              <a href="/passwordless">Password less Sign On</a>
            </div>
        </div>
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;