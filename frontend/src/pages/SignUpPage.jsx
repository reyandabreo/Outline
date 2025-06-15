import { useState } from 'react';
import axios from '../lib/axios';
import { setToken } from '../lib/auth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/auth/signup', form);
      setToken(data.token);
      toast.success('Signup successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 animate-fade-in-up">
        <div className="card-body space-y-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Create an Account 📝
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={form.username}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={form.email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
              value={form.password}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-primary font-medium hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
