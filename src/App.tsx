import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Star,
  MessageCircle,
  ChevronRight,
  Menu,
  X,
  Calendar,
  Users,
  Search,
  BedDouble,
  Wifi,
  Coffee,
  Waves,
  ShieldCheck,
  Clock,
  Gem,
  ArrowRight,
  Building2,
  Sparkles
} from 'lucide-react';
import { HOTELS, REVIEWS, HERO_IMAGES } from './constants';
import { Hotel } from './types';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Taj' | 'Private'>('All');
  const [scrolled, setScrolled] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [activeRatingSlide, setActiveRatingSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [view, setView] = useState<'home' | 'details'>('home');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    residence: HOTELS[0].name,
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const ratingInterval = setInterval(() => {
      setActiveRatingSlide((prev) => (prev + 1) % REVIEWS.length);
    }, 3000);

    const heroInterval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(ratingInterval);
      clearInterval(heroInterval);
    };
  }, []);

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `*New Inquiry for Tara Luxury Homes*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Residence:* ${formData.residence}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappPrimary}?text=${text}`, '_blank');
  };

  const filteredHotels = selectedFilter === 'All'
    ? HOTELS
    : HOTELS.filter(h => h.type === selectedFilter);

  const whatsappPrimary = "9971333299"; // Primary for queries
  const whatsappSecondary = "8743892048"; // Both calls and whatsapp
  const whatsappLink = `https://wa.me/919971333299`;

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled || view === 'details' ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setView('home')}
          >
            <div className="w-12 h-12 emerald-gradient rounded-xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-lg shadow-tara-emerald/20">T</div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold tracking-tighter leading-none ${scrolled || view === 'details' ? 'text-luxury-black' : 'text-white'}`}>TARA</span>
              <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${scrolled || view === 'details' ? 'text-gold' : 'text-gold-light'}`}>Luxury Homes</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {view === 'home' ? (
              ['Home', 'Apartments', 'Rating', 'Booking'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-[10px] font-bold tracking-[0.3em] uppercase hover:text-gold transition-all relative group ${scrolled ? 'text-luxury-black' : 'text-white'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
                </a>
              ))
            ) : (
              <button
                onClick={() => setView('home')}
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-luxury-black hover:text-gold transition-all flex items-center gap-2"
              >
                <ArrowRight size={14} className="rotate-180" /> Back to Home
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(212, 175, 55, 0)",
                  "0px 0px 20px rgba(212, 175, 55, 0.5)",
                  "0px 0px 0px rgba(212, 175, 55, 0)"
                ],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(90deg)",
                  "hue-rotate(180deg)",
                  "hue-rotate(270deg)",
                  "hue-rotate(360deg)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
                filter: { duration: 4, repeat: Infinity, ease: "linear" },
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
              onClick={() => {
                if (view !== 'home') setView('home');
                setTimeout(() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="gold-gradient px-8 py-3 rounded-full text-luxury-black text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-xl transition-all flex items-center gap-2"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-luxury-black" /> : <Menu size={24} className={scrolled || view === 'details' ? 'text-luxury-black' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-luxury-cream flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-4 text-luxury-black"><X size={32} /></button>
            {['Home', 'Apartments', 'Rating', 'Booking'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif font-bold text-luxury-black hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Follow our journey</p>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">IG</div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">FB</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-black">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeHeroSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 z-0"
              >
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  src={HERO_IMAGES[activeHeroSlide]}
                  alt="Tara Luxury Home"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-luxury-cream"></div>
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 text-center px-6 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold-light text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                  The Pinnacle of Refinement
                </span>
                <h1 className="text-6xl md:text-9xl text-white font-serif font-bold mb-8 leading-[0.9] tracking-tighter text-balance">
                  Where Every <br /> <span className="text-gold italic">Stay is a Story</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl font-luxury italic max-w-2xl mx-auto mb-12">
                  Discover a curated collection of the world's most exquisite residences, from heritage palaces to modern architectural masterpieces.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a href="#collections" className="gold-gradient px-12 py-5 rounded-full text-luxury-black font-bold tracking-[0.2em] uppercase hover:shadow-2xl hover:shadow-gold/40 transition-all hover:-translate-y-1">
                    View Collections
                  </a>
                  <a href="#booking" className="bg-white/10 backdrop-blur-xl border border-white/30 px-12 py-5 rounded-full text-white font-bold tracking-[0.2em] uppercase hover:bg-white/20 transition-all">
                    Private Inquiry
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent"></div>
              <span className="text-[9px] uppercase tracking-[0.5em] text-gold-light font-bold">Explore</span>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-20 -mt-24 max-w-7xl mx-auto px-6 w-full">
            <div className="bg-white p-10 md:p-16 rounded-[40px] luxury-shadow border border-black/5 grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { label: 'Destinations', val: '12+', sub: 'Globally curated' },
                { label: 'Guest Rating', val: '4.9/5', sub: 'Verified reviews' },
                { label: 'Experience', val: '20Y+', sub: 'Luxury hospitality' },
                { label: 'Concierge', val: '24/7', sub: 'Personalized care' }
              ].map((s, i) => (
                <div key={i} className="text-center space-y-2">
                  <p className="text-4xl font-serif font-bold text-tara-emerald">{s.val}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Apartments Section */}
          <section id="apartments" className="py-32 px-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-gold font-luxury italic text-3xl mb-4">Curated Apartments</h2>
                <h3 className="text-5xl md:text-6xl font-serif font-bold text-luxury-black leading-tight">The Tara Signature <br /> Collection</h3>
              </div>
              <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-sm border border-black/5">
                {['All', 'Taj', 'Private'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f as any)}
                    className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${selectedFilter === f ? 'emerald-gradient text-white shadow-lg shadow-tara-emerald/20' : 'text-gray-400 hover:text-luxury-black'}`}
                  >
                    {f === 'Taj' ? 'Heritage' : f === 'Private' ? 'Modern' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex flex-col h-full cursor-pointer"
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-8 luxury-shadow">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 ${hotel.type === 'Taj' ? 'bg-gold/80 text-white' : 'bg-tara-emerald/80 text-white'}`}>
                        {hotel.type === 'Taj' ? 'Heritage Palace' : 'Modern Estate'}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotel(hotel);
                          setView('details');
                        }}
                        className="w-full bg-white py-4 rounded-2xl text-luxury-black text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-colors"
                      >
                        View Residence <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-3xl font-serif font-bold mb-2 group-hover:text-gold transition-colors">{hotel.name}</h4>
                        <div className="flex items-center gap-2 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                          <MapPin size={14} className="text-gold" />
                          {hotel.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-gold/10 px-3 py-1.5 rounded-lg text-gold">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-light italic">
                      "{hotel.description}"
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-black/5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-tara-emerald font-bold text-[10px] uppercase tracking-widest">
                          <Building2 size={16} />
                          {hotel.bhk}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-serif font-bold text-luxury-black">₹{hotel.price.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block">per night</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Rating Section (Sliding Experience) */}
          <section id="rating" className="bg-tara-slate py-20 text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-gold font-luxury italic text-2xl mb-2">Guest Reviews</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight">What Our Guests Say</h3>
              </div>

              <div className="relative h-80 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRatingSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute w-full max-w-3xl flex flex-col items-center text-center space-y-6 px-4"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gold/30 p-1 shadow-2xl">
                      <img
                        src={REVIEWS[activeRatingSlide].image}
                        alt={REVIEWS[activeRatingSlide].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: REVIEWS[activeRatingSlide].rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-gold" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg md:text-2xl font-serif italic text-white/90 leading-relaxed max-w-2xl">
                      "{REVIEWS[activeRatingSlide].comment}"
                    </p>
                    <div>
                      <p className="text-gold font-bold uppercase tracking-[0.3em] text-sm">{REVIEWS[activeRatingSlide].name}</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Verified Resident</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRatingSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${activeRatingSlide === i ? 'bg-gold w-8' : 'bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section id="booking" className="py-32 px-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-luxury-cream p-12 rounded-[40px] luxury-shadow border border-black/5 relative">
                  <div className="absolute -top-6 -right-6 w-20 h-20 emerald-gradient rounded-3xl flex items-center justify-center text-white shadow-xl">
                    <Gem size={32} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-luxury-black mb-8">Inquire Privately</h3>
                  <form className="space-y-8" onSubmit={handleInquirySubmit}>
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-black/5 py-4 focus:border-gold outline-none transition-all peer placeholder-transparent"
                        placeholder="Full Name"
                      />
                      <motion.label
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-400 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-xs pointer-events-none"
                      >
                        Full Name
                      </motion.label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-black/5 py-4 focus:border-gold outline-none transition-all peer placeholder-transparent"
                        placeholder="Contact Number"
                      />
                      <motion.label
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-gray-400 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-xs pointer-events-none"
                      >
                        Contact Number
                      </motion.label>
                    </div>

                    <div className="relative group">
                      <select
                        id="residence"
                        value={formData.residence}
                        onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-black/5 py-4 focus:border-gold outline-none transition-all appearance-none"
                      >
                        {HOTELS.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
                      </select>
                      <motion.label
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        htmlFor="residence"
                        className="absolute left-0 -top-3.5 text-gold text-xs uppercase tracking-widest font-bold"
                      >
                        Preferred Residence
                      </motion.label>
                    </div>

                    <div className="relative group">
                      <textarea
                        required
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-black/5 py-4 focus:border-gold outline-none transition-all peer placeholder-transparent resize-none"
                        placeholder="Message"
                      ></textarea>
                      <motion.label
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                        htmlFor="message"
                        className="absolute left-0 -top-3.5 text-gray-400 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gold peer-focus:text-xs pointer-events-none"
                      >
                        How can we help?
                      </motion.label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-6 emerald-gradient text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-tara-emerald/40 transition-all uppercase tracking-widest text-sm"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-10">
                <div>
                  <h2 className="text-gold font-luxury italic text-3xl mb-4">Contact Us</h2>
                  <h3 className="text-5xl md:text-6xl font-serif font-bold text-luxury-black leading-tight">Begin Your <br /> Journey With Us</h3>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Our dedicated lifestyle managers are available around the clock to assist with your reservations and any bespoke requirements you may have.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">WhatsApp Queries</p>
                      <p className="text-2xl font-serif font-bold text-luxury-black">+91 9971333299</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Calls & WhatsApp</p>
                      <p className="text-2xl font-serif font-bold text-luxury-black">+91 87438 92048</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            <div className="space-y-10">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <img
                  src={selectedHotel?.image}
                  alt={selectedHotel?.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {selectedHotel?.amenities.map((amenity, i) => (
                  <div key={i} className="bg-luxury-cream p-6 rounded-3xl border border-black/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                      <Star size={20} />
                    </div>
                    <span className="text-sm font-bold text-luxury-black uppercase tracking-widest">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Gallery Section */}
              <div className="space-y-6">
                <h4 className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Residence Gallery</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedHotel?.gallery?.map((img, i) => (
                    <div key={i} className="aspect-square rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                      <img
                        src={img}
                        alt={`${selectedHotel.name} gallery ${i}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedHotel?.type === 'Taj' ? 'bg-gold text-white' : 'bg-tara-emerald text-white'}`}>
                    {selectedHotel?.type === 'Taj' ? 'Heritage Palace' : 'Modern Estate'}
                  </span>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{selectedHotel?.rating}</span>
                  </div>
                </div>
                <h1 className="text-6xl font-serif font-bold text-luxury-black mb-6">{selectedHotel?.name}</h1>
                <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">
                  <MapPin size={20} className="text-gold" />
                  {selectedHotel?.location}
                </div>
                <p className="text-xl text-gray-500 leading-relaxed italic border-l-4 border-gold pl-8 py-4">
                  "{selectedHotel?.description}"
                </p>
              </div>

              {/* Map View */}
              <div className="w-full h-64 rounded-[32px] overflow-hidden border border-black/5 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.0253456789!2d77.1017974!3d30.9171954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f81c08dece971%3A0x9cdd69cce0cb41e!2sTara%20Luxury%20Homes!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="grid grid-cols-2 gap-10 py-10 border-y border-black/5">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">Starting From</span>
                  <span className="text-4xl font-serif font-bold text-tara-emerald">₹{selectedHotel?.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 block mt-1">Per Night</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">Configuration</span>
                  <span className="text-2xl font-bold text-luxury-black">{selectedHotel?.bhk}</span>
                </div>
              </div>

              <div className="space-y-8">
                <button
                  onClick={() => {
                    setView('home');
                    setTimeout(() => {
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full py-6 emerald-gradient text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-tara-emerald/40 transition-all uppercase tracking-widest text-sm"
                >
                  Book This Residence
                </button>

                <div className="space-y-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] text-center">Book via Partner Platforms</p>
                  <div className="flex justify-center items-center gap-8">
                    {[
                      { name: 'Airbnb', url: 'https://www.airbnb.com', color: '#FF5A5F', icon: 'A' },
                      { name: 'Booking', url: 'https://www.booking.com', color: '#003580', icon: 'B' },
                      { name: 'MakeMyTrip', url: 'https://www.makemytrip.com', color: '#e31c23', icon: 'MMT' },
                      { name: 'Goibibo', url: 'https://www.goibibo.com', color: '#2276e3', icon: 'G' }
                    ].map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 group grayscale hover:grayscale-0 transition-all"
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: platform.color }}>
                          <span className="font-bold text-xs">{platform.icon}</span>
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 group-hover:text-luxury-black tracking-widest uppercase">{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-luxury-cream text-luxury-black pt-32 pb-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-5 space-y-12">
              <div className="space-y-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-16 h-16 emerald-gradient rounded-[1.5rem] flex items-center justify-center text-white font-serif text-4xl font-bold group-hover:scale-110 transition-transform shadow-xl">T</div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-serif font-bold tracking-tighter leading-none">TARA</span>
                    <span className="text-[12px] uppercase tracking-[0.5em] font-bold text-gold">Luxury Homes</span>
                  </div>
                </a>
                <p className="text-gray-500 text-base leading-relaxed font-light max-w-md">
                  Curating the world's most exceptional living experiences since 2004. Our heritage of excellence defines the skyline of luxury.
                </p>
              </div>

              <div className="space-y-8">
                <h6 className="text-gold font-bold uppercase tracking-[0.4em] text-xs">Owner Details</h6>
                <div className="bg-white/60 backdrop-blur-xl p-12 rounded-[3.5rem] border border-gold/20 space-y-10 shadow-2xl relative overflow-hidden group w-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-gold/10 transition-colors"></div>
                  <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold shadow-2xl ring-8 ring-gold/10 transform group-hover:scale-105 transition-transform duration-500 shrink-0">
                      <img
                        src="./src/images/owner.jpg"
                        alt="Kartikay Pandey"
                        className="w-full h-full object-cover object-[center_20%]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-3 text-center lg:text-left">
                      <p className="text-xs uppercase tracking-[0.5em] text-gold font-bold">Proprietor</p>
                      <p className="text-4xl font-serif font-bold text-luxury-black leading-tight tracking-tighter">Kartikay Pandey</p>
                      <div className="h-1 w-20 bg-gold/30 rounded-full mx-auto lg:mx-0"></div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-8 text-gray-600 bg-white/80 p-8 rounded-[2.5rem] border border-gold/10 shadow-inner relative z-10 group-hover:border-gold/30 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-white shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform shrink-0">
                      <Phone size={28} />
                    </div>
                    <div className="flex flex-col text-center sm:text-left">
                      <span className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-1">Direct Priority Line</span>
                      <span className="text-2xl font-bold tracking-tight text-luxury-black">+91 9971333299</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-10">
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Quick Links</h6>
              <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#apartments" className="hover:text-gold transition-colors">Apartments</a></li>
                <li><a href="#rating" className="hover:text-gold transition-colors">Reviews</a></li>
                <li><a href="#booking" className="hover:text-gold transition-colors">Booking</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-10">
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Headquarters</h6>
              <ul className="space-y-6 text-gray-500 text-xs">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-gold shrink-0" />
                  <span className="leading-relaxed">Tara Luxury Homes, Shimla, <br /> Himachal Pradesh 171001</span>
                </li>
                <li className="flex items-center gap-4">
                  <MessageCircle size={18} className="text-gold shrink-0" />
                  <span>+91 9971333299</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-gold shrink-0" />
                  <span>+91 8743892048</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-10">
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Location Map</h6>
              <div className="w-full h-64 rounded-3xl overflow-hidden border border-black/5 shadow-lg grayscale hover:grayscale-0 transition-all">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.0253456789!2d77.1017974!3d30.9171954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f81c08dece971%3A0x9cdd69cce0cb41e!2sTara%20Luxury%20Homes!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">
            <p>© 2026 Tara Luxury Homes. Crafted for the Extraordinary.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Icon */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-10 right-10 z-[70] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 group overflow-hidden"
      >
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <div className="absolute right-full mr-6 bg-white text-luxury-black px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none translate-x-4 group-hover:translate-x-0">
          Chat with Concierge
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>
      </motion.a>
    </div>
  );
}
