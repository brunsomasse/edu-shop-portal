import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Dashboard({ session }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState('student');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session?.user) {
      fetchProfileAndOrders(session.user.id);
    } else {
      setProfile(null);
      setOrders([]);
    }
  }, [session]);

  const fetchProfileAndOrders = async (userId) => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileData) setProfile(profileData);

    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersData) setOrders(ordersData);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: roleSelection } },
      });
      setMessage(error ? error.message : 'Account created! Check your email or sign in.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <section id="portal-auth" className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Create Portal Account' : 'Portal Sign In'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Access your student courses, instructor blueprints, or admin controls.
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Role</label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor / Author</option>
              </select>
            </div>
          )}

          {message && <p className="text-sm text-indigo-600 font-medium">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 w-full text-center text-sm text-indigo-600 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Register'}
        </button>
      </section>
    );
  }

  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-100 text-indigo-700">
            Role: {profile?.role || 'Loading...'}
          </span>
          <h2 className="text-xl font-bold text-gray-900 mt-2">{session.user.email}</h2>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      {/* Role-Specific Panels */}
      {profile?.role === 'instructor' && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-indigo-900">Instructor Studio</h3>
          <p className="text-sm text-indigo-700 mt-1">
            You have instructor permissions to publish new Terraform blueprints and cloud courses.
          </p>
        </div>
      )}

      {profile?.role === 'admin' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-amber-900">Administrator Console</h3>
          <p className="text-sm text-amber-700 mt-1">
            Full RLS bypass auditing and user role management active.
          </p>
        </div>
      )}

      {/* Order History (All Authenticated Roles) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Enrolled Resources & Orders</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders recorded yet. Add items from the catalog and checkout!</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg p-4 flex justify-between items-center bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Order #{order.id.slice(0, 8)} • {order.items.length} item(s)
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}