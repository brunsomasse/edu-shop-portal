import React from 'react';

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(0.96); opacity: 0.35; }
          50% { transform: scale(1.06); opacity: 0.7; }
        }
        .animate-logo-float {
          animation: logoFloat 4s ease-in-out infinite;
        }
        .animate-ring-pulse {
          animation: ringPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Frosted Translucent Backdrop (replaces solid bg-black) */}
      <div
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      >
        {/* Subtle Animated EduShop Global Logo on the Left */}
        <div className="hidden md:flex flex-col items-center justify-center h-full mr-[28rem] select-none pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Ambient Pulse Ring */}
            <div className="absolute w-36 h-36 rounded-full border border-blue-400/40 bg-blue-500/10 animate-ring-pulse" />
            <div className="absolute w-48 h-48 rounded-full border border-indigo-300/20 animate-ring-pulse" />

            {/* EduShop Global Geometric Cube SVG */}
            <div className="relative bg-white/95 p-5 rounded-2xl shadow-2xl border border-blue-100 animate-logo-float">
              <svg
                className="w-16 h-16 text-blue-900"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="32,4 56,18 56,46 32,60 8,46 8,18"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="rgba(30, 58, 138, 0.08)"
                />
                <polyline
                  points="8,18 32,32 56,18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="32"
                  y2="60"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <polygon
                  points="32,12 48,21 32,30 16,21"
                  fill="currentColor"
                  opacity="0.25"
                />
              </svg>
            </div>
          </div>

          <p className="mt-6 text-white font-bold tracking-widest uppercase text-sm drop-shadow">
            EduShop <span className="text-blue-300 font-normal">Global</span>
          </p>
          <p className="mt-1 text-xs text-slate-200/80">
            Click anywhere outside to return to catalog
          </p>
        </div>
      </div>

      {/* Right Slide-Over Cart Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Your cart is empty. Add some cloud blueprints or web packages!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 border border-gray-300 rounded text-center py-1 text-sm"
                      />
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}