import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#f8f5f0]">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-8 text-emerald-800">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-emerald-700 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
