
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/lib/storage';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    setFeaturedProducts(products.filter(p => p.featured).slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen">

      {/*  HERO SECTION */}
      <section className="relative w-full h-screen">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 10000 }}
          loop={true}
          slidesPerView={1}
          className="w-full h-full"
        >
          {/*  Slide 1 */}
         

{/*  Slide 2*/}
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/images/per13.jpg')" }}
            >
              <div className=" p-6 rounded-xl text-center max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                  Discover Your <span className="text-primary">Signature Look</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  Beautiful. Confident. Unapologetically You.
                </p>
                <Link to="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>

      

          {/* Slide 3 */}

          <SwiperSlide>
            <div className="relative w-full h-screen overflow-hidden">

              {/* Background Video */}
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/images/bg_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Luxury in Motion
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  Experience elegance like never before
                </p>

                <Link to="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

            </div>
          </SwiperSlide>
       



             <SwiperSlide>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: "url('/images/per16.jpg')" }}
            >
              <div className=" p-6 rounded-xl text-center max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                  Discover Your <span className="text-primary">Signature Look</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  Beautiful. Confident. Unapologetically You.
                </p>
                <Link to="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
           </Swiper>
      </section>

      {/*  Featured Products */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Featured Favorites
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked essentials to elevate your beauty routine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/*  Benefits Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🌿',
                title: 'Natural Ingredients',
                description: 'Formulated with gentle, skin-loving botanicals'
              },
              {
                emoji: '✨',
                title: 'Cruelty Free',
                description: 'Never tested on animals, always kind'
              },
              {
                emoji: '💕',
                title: 'Made with Love',
                description: 'Crafted with care for your beauty journey'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow"
              >
                <div className="text-5xl mb-4">{benefit.emoji}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
