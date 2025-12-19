
// import { useEffect, useState } from 'react';
// import { getProducts } from '@/lib/storage';
// import { Product } from '@/lib/types';
// import ProductCard from '@/components/ProductCard';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import { Label } from '@/components/ui/label';

// const Shop = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
//   const [maxPrice, setMaxPrice] = useState<number>(100);


//   const [selectedFragrance, setSelectedFragrance] = useState<string>('all');

//   const fragrances = [
//     'PARADE',
//     'SAINT-GERMAINS-DES-PRÉS',
//     'COLOGNE FRANÇAISE',
//     'DANS PARIS',
//     'LA PEAU NUE',
//     'RIMBAUD',
//     'BOIS DORMANT',
//     'EAU DE CALIFORNIE',
//     'REPTILE',
//     'BLACK TIE',
//     'NIGHTCLUBBING',
//   ];

//   useEffect(() => {
//     const allProducts = getProducts();
//     setProducts(allProducts);
//     setFilteredProducts(allProducts);

//     const max = Math.max(...allProducts.map(p => p.price), 100);
//     setMaxPrice(Math.ceil(max));
//     setPriceRange([0, Math.ceil(max)]);
//   }, []);

//   useEffect(() => {
//     let filtered = products;

   
//     filtered = filtered.filter(
//       p => p.price >= priceRange[0] && p.price <= priceRange[1]
//     );

//     if (selectedFragrance !== 'all') {
//       filtered = filtered.filter(
//         p => p.fragrance === selectedFragrance
//       );
//     }

//     setFilteredProducts(filtered);
//   }, [priceRange, selectedFragrance, products]);

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4">

//         <div className="mb-12">
//           <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
//             Shop All Products
//           </h1>
//           <p className="text-lg text-muted-foreground">
//           Explore Our Curated Collection of Exquisite Perfumes
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           <aside className="lg:col-span-1">
//             <div className="sticky top-24 space-y-8 p-6 rounded-2xl bg-card border">

//               <h3 className="font-semibold text-lg">Filters</h3>

           
//               <div>
//                 <Label className="text-sm font-medium mb-3 block">
//                   Fragrance
//                 </Label>

//                 <Select
//                   value={selectedFragrance}
//                   onValueChange={setSelectedFragrance}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="All Fragrances" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value="all"> Fragrances</SelectItem>
//                     {fragrances.map(fragrance => (
//                       <SelectItem key={fragrance} value={fragrance}>
//                         {fragrance}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

    
//               <div>
//                 <Label className="text-sm font-medium mb-3 block">
//                   Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
//                 </Label>
//                 <Slider
//                   min={0}
//                   max={maxPrice}
//                   step={1}
//                   value={priceRange}
//                   onValueChange={setPriceRange}
//                 />
//               </div>

//             </div>
//           </aside>

//           {/* PRODUCTS */}
//           <div className="lg:col-span-3">
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-20">
//                 <p className="text-xl text-muted-foreground">
//                   No products found matching your filters.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;



import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/storage';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  /* PRICE */
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  /* VOLUME (ml) */
  const [volumeRange, setVolumeRange] = useState<number[]>([0, 100]);
  const [maxVolume, setMaxVolume] = useState<number>(100);

  /* FRAGRANCE */
  const [selectedFragrance, setSelectedFragrance] = useState<
    string | undefined
  >(undefined);

  const fragrances = [
    'PARADE',
    'SAINT-GERMAINS-DES-PRÉS',
    'COLOGNE FRANÇAISE',
    'DANS PARIS',
    'LA PEAU NUE',
    'RIMBAUD',
    'BOIS DORMANT',
    'EAU DE CALIFORNIE',
    'REPTILE',
    'BLACK TIE',
    'NIGHTCLUBBING',
  ];

  /* LOAD PRODUCTS */
  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);

    const maxP = Math.max(...allProducts.map(p => p.price), 100);
    const maxV = Math.max(...allProducts.map(p => p.volume ?? 0), 100);

    setMaxPrice(Math.ceil(maxP));
    setPriceRange([0, Math.ceil(maxP)]);

    setMaxVolume(Math.ceil(maxV));
    setVolumeRange([0, Math.ceil(maxV)]);
  }, []);

  /* APPLY FILTERS */
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Volume filter
    filtered = filtered.filter(
      p => p.volume >= volumeRange[0] && p.volume <= volumeRange[1]
    );

    // Fragrance filter
    if (selectedFragrance && selectedFragrance !== 'all') {
      filtered = filtered.filter(
        p => p.fragrance === selectedFragrance
      );
    }

    setFilteredProducts(filtered);
  }, [priceRange, volumeRange, selectedFragrance, products]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Shop Our Fragrance Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover timeless scents crafted for every moment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTERS */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8 p-6 rounded-2xl bg-card border">

              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedFragrance(undefined);
                    setPriceRange([0, maxPrice]);
                    setVolumeRange([0, maxVolume]);
                  }}
                >
                  Clear
                </Button>
              </div>

              {/* FRAGRANCE */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Fragrance
                </Label>

                <Select
                  value={selectedFragrance}
                  onValueChange={setSelectedFragrance}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Fragrances" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Fragrances</SelectItem>
                    {fragrances.map(fragrance => (
                      <SelectItem key={fragrance} value={fragrance}>
                        {fragrance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PRICE */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: ₹{priceRange[0]} – ₹{priceRange[1]}
                </Label>

                <Slider
                  min={0}
                  max={maxPrice}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>

              {/* VOLUME */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Volume: {volumeRange[0]}ml – {volumeRange[1]}ml
                </Label>

                <Slider
                  min={0}
                  max={maxVolume}
                  step={10}
                  value={volumeRange}
                  onValueChange={setVolumeRange}
                />
              </div>

            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
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
