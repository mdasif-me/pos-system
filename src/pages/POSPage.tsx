import { CreditCard, DollarSign, Minus, Plus, Smartphone, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Card, CardHeader } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { usePosStore } from '../stores/posStore';
import { PaymentMethod, Product } from '../types';

export const POSPage: React.FC = () => {
  const {
    products,
    categories,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    createTransaction,
    completeTransaction,
  } = usePosStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('cash');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Filter products based on category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode?.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    try {
      if (product.stock <= 0) {
        toast.error('Product is out of stock');
        return;
      }
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add product to cart');
      console.error('Add to cart error:', error);
    }
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    try {
      updateCartQuantity(productId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Update quantity error:', error);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    try {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      console.error('Remove from cart error:', error);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transaction = createTransaction(selectedPaymentMethod);
      completeTransaction(transaction);
      
      setIsCheckoutModalOpen(false);
      toast.success(`Payment successful! Transaction ID: ${transaction.id.slice(0, 8)}`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + tax;

  return (
    <div className="h-full flex">
      {/* Products Section */}
      <div className="flex-1 pr-6">
        <Card>
          <CardHeader title="Products" />
          
          {/* Search and Category Filter */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Search products or scan barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'
                }`}
                onClick={() => handleAddToCart(product)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400 text-lg font-semibold">
                      {product.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
                <p className="text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found matching your criteria
            </div>
          )}
        </Card>
      </div>

      {/* Cart Section */}
      <div className="w-96">
        <Card>
          <CardHeader 
            title="Cart" 
            action={
              cart.length > 0 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={clearCart}
                >
                  Clear All
                </Button>
              )
            }
          />

          {/* Cart Items */}
          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="p-1 rounded-full hover:bg-red-100 text-red-600 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <p className="font-semibold">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                size="lg"
                onClick={() => setIsCheckoutModalOpen(true)}
              >
                Checkout
              </Button>
            </>
          )}
        </Card>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        title="Checkout"
        size="md"
      >
        <div className="space-y-6">
          {/* Order Summary */}
          <div>
            <h4 className="font-medium mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="font-medium mb-3">Payment Method</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'cash', label: 'Cash', icon: DollarSign },
                { id: 'card', label: 'Card', icon: CreditCard },
                { id: 'digital_wallet', label: 'Digital', icon: Smartphone },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id as PaymentMethod)}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setIsCheckoutModalOpen(false)}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleCheckout}
              loading={isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};