import { useEffect, useState } from 'react';
import { getCart, updateCartQuantity, removeFromCart } from '@/lib/storage';
import { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start adding some beautiful products!
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6 border-border">
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-accent flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <span className="text-3xl">🌸</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-lg font-bold text-primary">Rs. {item.price}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border sticky top-24">
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg shadow-medium"
                onClick={() => toast.success('Checkout feature coming soon!')}
              >
                Proceed to Checkout
              </Button>

              <Link to="/shop">
                <Button variant="ghost" className="w-full mt-4">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
