import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '@/lib/storage';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border hover:shadow-medium transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-accent">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-4xl">🌸</span>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-2xl font-bold text-primary">Rs. {product.price}</p>
            <Button
              onClick={handleAddToCart}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
