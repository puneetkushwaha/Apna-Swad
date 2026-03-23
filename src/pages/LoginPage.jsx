import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Skeleton from '../components/Loader/Skeleton';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      navigate('/');
    } catch (err) {
      setError('Google Login Failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-bg-decoration top-right"></div>
      <div className="auth-bg-decoration bottom-left"></div>

      <div className="auth-card-premium">
        <div className="auth-logo-section">
          <Link to="/">
            <img src="/mascot_logo.png" alt="Apna Swad Mascot" />
          </Link>
          <h2 className="brand-font">Welcome Back</h2>
          <p className="auth-subtitle">Login to your premium heritage experience</p>
        </div>
        
        {error && (
          <div className="auth-error-premium">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form-premium">
          <div className="input-block-premium">
            <label>Email Address</label>
            <div className="input-wrapper-premium">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                className="input-premium"
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="input-block-premium">
            <label>Password</label>
            <div className="input-wrapper-premium">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                className="input-premium"
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn-premium" disabled={loading}>
            {loading ? <Skeleton type="text" style={{ width: '120px', background: 'rgba(255,255,255,0.2)', margin: 0 }} /> : 'Log In to Account'}
          </button>
        </form>

        <div className="auth-divider-premium">
          <span>SECURE SOCIAL LOGIN</span>
        </div>

        <div className="google-auth-wrapper">
          <GoogleLogin 
            onSuccess={handleGoogleSuccess} 
            onError={() => setError('Google Login Failed')}
            theme="outline"
            size="large"
            text="signin_with"
            shape="circle"
            width="300"
          />
        </div>

        <p className="auth-footer-premium">
          Don't have an account? <Link to="/signup">Start your journey</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
