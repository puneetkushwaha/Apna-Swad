import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, AlertCircle, Star } from 'lucide-react';
import Skeleton from '../components/Loader/Skeleton';
import './LoginPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(name, email, phone, password, referralCode);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential, referralCode);
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
          <h2 className="brand-font">Create Account</h2>
          <p className="auth-subtitle">Join the Apna Swad heritage family</p>
        </div>
        
        {error && (
          <div className="auth-error-premium">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form-premium">
          <div className="input-block-premium">
            <label>Full Name</label>
            <div className="input-wrapper-premium">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                className="input-premium"
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          </div>

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
            <label>Mobile Number (for WhatsApp)</label>
            <div className="input-wrapper-premium">
              <Phone size={18} className="input-icon" />
              <input 
                type="tel" 
                className="input-premium"
                placeholder="10-digit number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                maxLength="10"
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

          <div className="input-block-premium">
            <label>Referral Code (Optional)</label>
            <div className="input-wrapper-premium">
              <Star size={18} className="input-icon" />
              <input 
                type="text" 
                className="input-premium"
                placeholder="ASXXXXXX" 
                value={referralCode} 
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())} 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn-premium" disabled={loading}>
            {loading ? <Skeleton type="text" style={{ width: '150px', background: 'rgba(255,255,255,0.2)', margin: 0 }} /> : 'Start Your Experience'}
          </button>
        </form>

        <div className="auth-divider-premium">
          <span>SECURE SOCIAL SIGNUP</span>
        </div>

        <div className="google-auth-wrapper">
          <GoogleLogin 
            onSuccess={handleGoogleSuccess} 
            onError={() => setError('Google Login Failed')}
            theme="outline"
            size="large"
            text="signup_with"
            shape="circle"
            width="370"
          />
        </div>

        <p className="auth-footer-premium">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
