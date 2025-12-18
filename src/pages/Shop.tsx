import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/storage';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);

    // Calculate max price
    const max = Math.max(...allProducts.map(p => p.price), 100);
    setMaxPrice(Math.ceil(max));
    setPriceRange([0, Math.ceil(max)]);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Shop All Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated collection of beauty essentials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 p-6 rounded-2xl bg-card border border-border">
              <div>
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
                </Label>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-4"
                />
              </div>

            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
