import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, addToCart } from '@/lib/storage';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products from same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/shop">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-accent border border-border">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <span className="text-9xl">🌸</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({Math.floor(Math.random() * 100) + 50} reviews)</span>
              </div>
            )}

            <p className="text-3xl font-bold text-primary mb-8">Rs. {product.price}</p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-sm font-medium mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full"
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-medium"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {product.stock && (
              <p className="text-sm text-muted-foreground">
                {product.stock} items in stock
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
