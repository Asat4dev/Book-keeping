import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      await result.user.reload()

      navigate('/dashboard')
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Wrong email or password.'
          : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border rounded-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Welcome Back
        </h1>

        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg p-3 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-blue-600"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  )
}