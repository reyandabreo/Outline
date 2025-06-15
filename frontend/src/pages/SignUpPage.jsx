import { useState } from 'react';
import axios from '../lib/axios';
import { setToken } from '../lib/auth';
import { useNavigate } from 'react-router';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/auth/signup', form);
    setToken(data.token);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input type="text" placeholder="Username" className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="email" placeholder="Email" className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="input input-bordered w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
