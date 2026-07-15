import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { MagneticButton } from '../components/MagneticButton';
import { ScrollReveal } from '../components/ScrollReveal';

export const Home = () => {
  const { isLightsOn } = useTheme();
  const { products } = useProducts();

  // Get a few featured products (e.g., Chandelier, Filament Bulb, Sconce, Table Lamp)
  const featuredProducts = products.filter(p => 
    ["luma-001", "luma-002", "luma-003", "luma-004"].includes(p.id)
  );

  const categories = [
    { name: 'LED Bulbs', count: 12 },
    { name: 'Chandeliers', count: 8 },
    { name: 'Wall Lights', count: 15 },
    { name: 'Table Lamps', count: 10 },
    { name: 'Floor Lamps', count: 6 },
    { name: 'Ceiling Lights', count: 9 },
    { name: 'Pendant Lights', count: 11 },
    { name: 'Outdoor Lights', count: 7 },
    { name: 'Smart Lights', count: 14 },
    { name: 'Decorative Lamps', count: 5 }
  ];

  return (
    <div className="w-full pt-28 pb-16 flex flex-col space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 py-12">
        {/* Dynamic Glowing Spotlight behind Hero */}
        <div 
          className="absolute w-[600px] h-[350px] top-[10%] rounded-full blur-3xl opacity-0 scale-75 transition-all duration-[1000ms] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(246, 177, 0, 0.15) 0%, rgba(246, 177, 0, 0) 70%)',
            opacity: isLightsOn ? 1 : 0,
            transform: isLightsOn ? 'scale(1)' : 'scale(0.7)',
            zIndex: 0
          }}
        />

        <ScrollReveal yOffset={40} className="relative z-10 max-w-4xl flex flex-col items-center space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles size={12} />
            <span>Premium Showroom Experience</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight leading-[1.05] text-neutral-900 dark:text-white transition-colors duration-700">
            Artisanal Light, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600">
              Sculpted
            </span> for Spaces.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium leading-relaxed transition-colors duration-700">
            Enter Luma, a curated showroom where lighting design becomes an art form. Flip the switch above to illuminate our digital showroom and watch our designs react.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <MagneticButton>
              <Link 
                to="/showroom"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-bold transition-all duration-500 shadow-lg text-sm tracking-wide cursor-pointer"
                style={{
                  background: isLightsOn 
                    ? 'linear-gradient(135deg, #F6B100 0%, #D49000 100%)' 
                    : '#5C4033',
                  color: '#FFF',
                  boxShadow: isLightsOn 
                    ? '0 10px 25px rgba(246, 177, 0, 0.4)' 
                    : '0 10px 20px rgba(0, 0, 0, 0.15)'
                }}
              >
                <span>Explore Showroom</span>
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            
            <Link 
              to="/#categories"
              className="text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors py-3"
            >
              Browse Categories
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <Compass className="text-amber-500" size={24} />, 
            title: "Architectural Precision", 
            desc: "Designed in collaboration with European architects to ensure visual proportion and clean line values." 
          },
          { 
            icon: <Lightbulb className="text-amber-500" size={24} />, 
            title: "State of Art LEDs", 
            desc: "95+ CRI chips that bring out the true richness of wooden surfaces, textiles, and wall textures." 
          },
          { 
            icon: <ShieldCheck className="text-amber-500" size={24} />, 
            title: "Lifetime Guarantee", 
            desc: "Solid brass housings, thick tempered glass, and high-frequency ballasts engineered for durability." 
          }
        ].map((prop, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.15}>
            <div className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col space-y-3">
              <span className="p-3 w-fit rounded-xl bg-amber-500/10">{prop.icon}</span>
              <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white">{prop.title}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{prop.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* 3. SHOWROOM CATEGORIES */}
      <section id="categories" className="flex flex-col space-y-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-900 dark:text-white">
              Curated Collections
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Browse our architectural ranges, custom manufactured for residential and hospitality environments.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <ScrollReveal key={cat.name} delay={(idx % 5) * 0.08}>
              <Link
                to={`/showroom?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 rounded-2xl glass hover:-translate-y-1 transition-all duration-500 border border-black/5 dark:border-white/5 text-center flex flex-col items-center justify-center space-y-2"
              >
                <div className="p-3 rounded-full bg-neutral-500/5 dark:bg-neutral-500/10 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors duration-300 text-neutral-600 dark:text-neutral-300">
                  <Lightbulb size={20} />
                </div>
                <h4 className="text-xs font-bold font-display text-neutral-800 dark:text-neutral-200 group-hover:text-amber-500 transition-colors duration-300">
                  {cat.name}
                </h4>
                <span className="text-[10px] text-neutral-400">{cat.count} Items</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="flex flex-col space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-900 dark:text-white">
                Showroom Highlights
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Experience our most popular lighting designs in their natural ambient form.
              </p>
            </div>
            <Link 
              to="/showroom"
              className="text-xs font-extrabold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center space-x-1"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ScrollReveal key={prod.id}>
              <ProductCard product={prod} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER / FOOTER BANNER */}
      <section className="relative overflow-hidden rounded-3xl glass border border-black/5 dark:border-white/5 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(246, 177, 0, 0.05) 0%, transparent 60%) pointer-events-none" />
        
        <ScrollReveal className="max-w-xl flex flex-col items-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 dark:text-white">
            Receive Our Designer Portfolio
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Subscribe to receive exclusive previews of our seasonal collections, designer interviews, and luxury interior design lookup books.
          </p>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Welcome to Luma's catalog circle!"); }}
            className="w-full flex flex-col sm:flex-row items-center gap-2 pt-2"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="px-4 py-3 rounded-xl text-xs w-full bg-neutral-500/5 dark:bg-neutral-500/10 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
            />
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl text-xs font-bold bg-[#5C4033] text-white hover:bg-neutral-800 transition-colors cursor-pointer w-full sm:w-auto shrink-0"
              style={{
                background: isLightsOn ? '#F6B100' : '#5C4033',
                color: isLightsOn ? '#000' : '#FFF'
              }}
            >
              Subscribe
            </button>
          </form>
        </ScrollReveal>
      </section>
    </div>
  );
};
