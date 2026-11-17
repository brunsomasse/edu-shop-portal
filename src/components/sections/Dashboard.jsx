import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const EMPTY_PRODUCT_FORM = {
  title: '',
  category: 'Web Development',
  price: '',
  badge: '',
  description: '',
  featuresText: '',
  sort_order: 10,
  is_active: true,
};

export default function Dashboard({ session }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState('student');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  // RBAC Product Management State (instructor / admin)
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);
  const [productFeedback, setProductFeedback] = useState({ type: '', text: '' });
  const [savingProduct, setSavingProduct] = useState(false);

  const canManageProducts = profile?.role === 'instructor' || profile?.role === 'admin';
  const isAdmin = profile?.role === 'admin';

  const fetchManagedProducts = useCallback(async () => {
    setProductsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
    setProductsLoading(false);
  }, []);

  const fetchProfileAndOrders = useCallback(
    async (userId) => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileData) {
        setProfile(profileData);
        if (profileData.role === 'instructor' || profileData.role === 'admin') {
          fetchManagedProducts();
        }
      }

      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersData) setOrders(ordersData);
    },
    [fetchManagedProducts]
  );

  useEffect(() => {
    if (session?.user) {
      fetchProfileAndOrders(session.user.id);
    } else {
      setProfile(null);
      setOrders([]);
      setProducts([]);
    }
  }, [session, fetchProfileAndOrders]);

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

  const openCreateForm = () => {
    setEditingProductId(null);
    setProductForm({
      ...EMPTY_PRODUCT_FORM,
      sort_order: products.length + 1,
    });
    setProductFeedback({ type: '', text: '' });
    setShowProductForm(true);
  };

  const openEditForm = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title || '',
      category: product.category || 'Web Development',
      price: String(product.price ?? ''),
      badge: product.badge || '',
      description: product.description || '',
      featuresText: Array.isArray(product.features) ? product.features.join('\n') : '',
      sort_order: product.sort_order ?? 0,
      is_active: Boolean(product.is_active),
    });
    setProductFeedback({ type: '', text: '' });
    setShowProductForm(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    setProductFeedback({ type: '', text: '' });

    const parsedFeatures = productForm.featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title: productForm.title.trim(),
      category: productForm.category.trim() || 'Web Development',
      price: Number(productForm.price),
      badge: productForm.badge.trim() || null,
      description: productForm.description.trim() || null,
      features: parsedFeatures,
      sort_order: Number(productForm.sort_order) || 0,
      is_active: Boolean(productForm.is_active),
    };

    let error;
    if (editingProductId) {
      ({ error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProductId));
    } else {
      ({ error } = await supabase.from('products').insert({
        ...payload,
        created_by: session.user.id,
      }));
    }

    if (error) {
      setProductFeedback({ type: 'error', text: error.message });
    } else {
      setProductFeedback({
        type: 'success',
        text: editingProductId ? 'Product updated.' : 'Product published to catalog.',
      });
      setShowProductForm(false);
      setEditingProductId(null);
      await fetchManagedProducts();
      window.dispatchEvent(new Event('products-updated'));
    }
    setSavingProduct(false);
  };

  const handleToggleProductActive = async (product) => {
    setProductFeedback({ type: '', text: '' });
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id);

    if (error) {
      setProductFeedback({ type: 'error', text: error.message });
    } else {
      await fetchManagedProducts();
      window.dispatchEvent(new Event('products-updated'));
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!isAdmin) return;
    if (!window.confirm(`Permanently delete "${product.title}"?`)) return;

    setProductFeedback({ type: '', text: '' });
    const { error } = await supabase.from('products').delete().eq('id', product.id);

    if (error) {
      setProductFeedback({ type: 'error', text: error.message });
    } else {
      setProductFeedback({ type: 'success', text: `"${product.title}" deleted.` });
      await fetchManagedProducts();
      window.dispatchEvent(new Event('products-updated'));
    }
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

      {/* Role-Specific Banners */}
      {profile?.role === 'instructor' && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-indigo-900">Instructor Studio</h3>
          <p className="text-sm text-indigo-700 mt-1">
            You have instructor permissions to create, update, and publish offerings in the live catalog.
          </p>
        </div>
      )}

      {profile?.role === 'admin' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-amber-900">Administrator Console</h3>
          <p className="text-sm text-amber-700 mt-1">
            Full catalog management (create, edit, archive, and permanent delete) active via PostgreSQL RLS.
          </p>
        </div>
      )}

      {/* RBAC Dynamic Product Catalog Manager */}
      {canManageProducts && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Product & Offering Catalog</h3>
              <p className="text-sm text-gray-500">
                Changes sync immediately to the public storefront via Supabase RLS.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Product
            </button>
          </div>

          {productFeedback.text && (
            <div
              className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                productFeedback.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {productFeedback.text}
            </div>
          )}

          {showProductForm && (
            <form
              onSubmit={handleSaveProduct}
              className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h4 className="font-bold text-slate-900">
                  {editingProductId ? 'Edit Catalog Item' : 'Add Catalog Item'}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g., AWS Solutions Architect Bootcamp"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Cloud Certifications">Cloud Certifications</option>
                    <option value="DevOps & IaC">DevOps & IaC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="1500.00"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="e.g., Most Popular"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={productForm.sort_order}
                    onChange={(e) =>
                      setProductForm({ ...productForm, sort_order: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.is_active}
                      onChange={(e) =>
                        setProductForm({ ...productForm, is_active: e.target.checked })
                      }
                      className="rounded border-slate-300"
                    />
                    Visible on public storefront
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  placeholder="Brief summary of deliverables..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Included Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={productForm.featuresText}
                  onChange={(e) =>
                    setProductForm({ ...productForm, featuresText: e.target.value })
                  }
                  placeholder={'Responsive React / Tailwind UI\nSupabase Auth & RLS\nCI/CD Automated Deployment'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  {savingProduct ? 'Saving...' : editingProductId ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          )}

          {productsLoading ? (
            <p className="text-sm text-gray-500">Loading catalog items...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-gray-500">No products found in Supabase yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="py-3 pr-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3.5 pr-4">
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        {item.badge && (
                          <span className="inline-block mt-0.5 text-[11px] font-medium text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{item.category}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ${
                            item.is_active
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(item)}
                            title="Edit product"
                            className="p-1.5 text-gray-600 hover:text-blue-900 rounded hover:bg-blue-50 cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleProductActive(item)}
                            title={item.is_active ? 'Hide from storefront' : 'Publish to storefront'}
                            className="p-1.5 text-gray-600 hover:text-amber-700 rounded hover:bg-amber-50 cursor-pointer"
                          >
                            {item.is_active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(item)}
                              title="Delete permanently (Admin only)"
                              className="p-1.5 text-gray-600 hover:text-red-700 rounded hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
