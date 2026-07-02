import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  MessageCircle, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  Calendar, 
  Users, 
  Search,
  BedDouble,
  Wifi,
  Coffee,
  Utensils,
  ShoppingBag,
  Waves,
  ShieldCheck,
  Clock,
  Gem,
  ArrowRight,
  Building2,
  Sparkles,
  ArrowUp,
  ArrowLeft
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [view, setView] = useState<'home' | 'details'>('home');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    residence: HOTELS[0].name,
    startDate: '',
    endDate: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<string, number>>({});

  // Helper to safely transition start/end dates when they are selected
  const handleStartDateChange = (val: string) => {
    setFormData(prev => {
      const updated = { ...prev, startDate: val };
      // Enforce checkout/end date to be at least the day after start date
      if (prev.endDate && prev.endDate <= val) {
        const nextDay = new Date(val);
        nextDay.setDate(nextDay.getDate() + 1);
        updated.endDate = nextDay.toISOString().split('T')[0];
      }
      return updated;
    });
  };

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // If view changes to details, scroll to top
  useEffect(() => {
    if (view === 'details') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  // Synchronize state with Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (!hash || hash === '#' || hash === '#/') {
        setView('home');
        setSelectedHotel(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Normalize hash (remove starting '#' and optional '/')
      let normalized = hash.replace(/^#/, '');
      if (normalized.startsWith('/')) {
        normalized = normalized.slice(1);
      }

      // Check if it's a hotel details page, format: hotel/:hotelId
      if (normalized.startsWith('hotel/')) {
        const hotelId = normalized.substring(6);
        const foundHotel = HOTELS.find(h => h.id === hotelId);
        if (foundHotel) {
          setSelectedHotel(foundHotel);
          setActiveImageIndex(0);
          setView('details');
          window.scrollTo(0, 0);
        } else {
          // Fallback to home if hotel is not found
          setView('home');
          setSelectedHotel(null);
          window.location.hash = '#/home';
        }
        return;
      }

      // Handle standard section scrolling
      const validSections = ['home', 'apartments', 'rating', 'booking'];
      const sectionName = normalized.toLowerCase();
      
      if (validSections.includes(sectionName)) {
        setView('home');
        setSelectedHotel(null);
        
        // Let the DOM update in case we were in details view before scrolling
        setTimeout(() => {
          if (sectionName === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(sectionName);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 150);
      }
    };

    // Run on initial load to support direct deep linking
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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
    const nameClean = formData.name.trim();
    if (nameClean.length < 3) {
      setError("Please enter a valid Full Name with at least 3 alphabetic characters.");
      return;
    }
    if (nameClean.length > 15) {
      setError("Please enter a valid Full Name with at most 15 alphabetic characters.");
      return;
    }
    if (formData.phone.length !== 10 || !/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit contact number starting with 6, 7, 8, or 9.");
      return;
    }
    if (!formData.startDate) {
      setError("Please select a booking starting date.");
      return;
    }
    const todayStr = new Date().toISOString().split('T')[0];
    if (formData.startDate < todayStr) {
      setError("Booking date cannot be in the past.");
      return;
    }
    if (!formData.endDate) {
      setError("Please select a check-out date.");
      return;
    }
    if (formData.endDate <= formData.startDate) {
      setError("Check-out date must be after the booking start date.");
      return;
    }

    // Calculate total days to stay
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const messageClean = formData.message.trim();
    if (/[^a-zA-Z0-9\s.]/.test(messageClean)) {
      setError("Message can only contain letters, numbers, spaces, and periods (.).");
      return;
    }

    const hotelObj = HOTELS.find(h => h.name === formData.residence);
    const calculatedTotal = hotelObj ? daysCount * hotelObj.price : 0;
    const text = `*New Booking Inquiry for Tara Luxury Homes*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Residence:* ${formData.residence}%0A*Check-in Date:* ${formData.startDate}%0A*Check-out Date:* ${formData.endDate}%0A*Duration:* ${daysCount} Day${daysCount > 1 ? 's' : ''}%0A*Rate per Night:* ₹${hotelObj ? hotelObj.price : 0}/night%0A*Total Stay Price:* ₹${calculatedTotal.toLocaleString()}%0A*Message:* ${formData.message}`;
    const waUrl = `https://wa.me/91${whatsappPrimary}?text=${text}`;
    
    // Reset form immediately so subsequent entries are clean and don't carry over
    setFormData({
      name: '',
      phone: '',
      residence: HOTELS[0].name,
      startDate: '',
      endDate: '',
      message: ''
    });

    // Use window.location.href for better mobile redirection
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank');
    }
  };

  const filteredHotels = selectedFilter === 'All' 
    ? HOTELS 
    : HOTELS.filter(h => h.type === selectedFilter);

  const whatsappPrimary = "8743892048"; // Primary for queries and calls
  const whatsappSecondary = "8743892048"; // Both calls and whatsapp
  const whatsappLink = `https://wa.me/918743892048?text=Hello%20Tara%20Luxury%20Homes%2C%20I%20would%20like%20to%20inquire%20about%20your%20premium%20stays%20and%20availabilities.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic pricing calculations for the contact form
  const selectedHotelForPricing = HOTELS.find(h => h.name === formData.residence);
  let formDaysCount = 0;
  let formTotalPrice = 0;
  if (formData.startDate && formData.endDate) {
    const sDate = new Date(formData.startDate);
    const eDate = new Date(formData.endDate);
    if (eDate > sDate) {
      const diff = Math.abs(eDate.getTime() - sDate.getTime());
      formDaysCount = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (selectedHotelForPricing) {
        formTotalPrice = formDaysCount * selectedHotelForPricing.price;
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || view === 'details' ? 'bg-luxury-cream/95 backdrop-blur-xl border-b border-gold/15 shadow-md py-3' : 'bg-[#03221a]/85 backdrop-blur-md border-b border-gold/15 py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => { window.location.hash = '#/home'; }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-[#02231c] via-[#0b644d] to-amber-500 rounded-full border-2 border-gold shadow-[0_4px_20px_rgba(11,100,77,0.45)] group-hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-all duration-500 shrink-0 overflow-hidden">
              <span className="text-white font-serif text-2xl font-black tracking-wider relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] animate-pulse">T</span>
              <div className="absolute inset-0.5 rounded-full border border-gold/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 opacity-20 mix-blend-overlay animate-[spin_6s_linear_infinite]"></div>
              <Sparkles size={11} className="absolute -top-1 -right-1 text-amber-400 animate-bounce" />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`text-lg font-serif font-extrabold tracking-[0.05em] leading-tight ${scrolled || view === 'details' ? 'text-luxury-black' : 'text-white'}`}>TARA</span>
              <span className={`text-[9px] uppercase tracking-[0.35em] font-semibold leading-tight mt-0.5 ${scrolled || view === 'details' ? 'text-gold' : 'text-gold-light'}`}>Luxury Homes</span>
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
                onClick={() => { window.location.hash = '#/home'; }}
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
                window.location.hash = '#/booking';
              }}
              className="gold-gradient px-8 py-3 rounded-full text-luxury-black text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-xl transition-all flex items-center gap-2"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Back Button (Details View Only) */}
          {view === 'details' && (
            <button 
              onClick={() => { window.location.hash = '#/home'; }}
              className="md:hidden flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-luxury-black"
            >
              <ArrowRight size={14} className="rotate-180" /> Back
            </button>
          )}

          {/* Mobile Menu Toggle - Hidden per request (3 lines removal) */}
          <button 
            className="hidden p-2 rounded-full bg-white/10 backdrop-blur-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-luxury-black" /> : <Menu size={24} className={scrolled ? 'text-luxury-black' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Horizontal Navigator (Hidden on Desktop) */}
        {view === 'home' && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden border-t border-gold/15 transition-all duration-300 ${
              scrolled 
                ? 'bg-luxury-cream/95 backdrop-blur-xl shadow-md' 
                : 'bg-[#03221a]/95 backdrop-blur-xl'
            }`}
          >
            <div className="w-full max-w-md mx-auto grid grid-cols-4 gap-1.5 px-3 py-2.5 select-none">
              {['Home', 'Apartments', 'Rating', 'Booking'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`text-[9px] sm:text-[10px] font-bold tracking-tight sm:tracking-widest uppercase transition-all duration-300 py-2 rounded-full border text-center flex items-center justify-center truncate ${
                    scrolled 
                      ? 'text-luxury-black border-gold/30 hover:bg-gold/10 hover:border-gold active:bg-gold/20' 
                      : 'text-white border-gold/20 hover:bg-white/10 hover:border-white/30 active:bg-white/20'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[110] bg-luxury-cream flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-4 text-luxury-black active:scale-95 transition-transform"><X size={32} /></button>
            {['Home', 'Apartments', 'Rating', 'Booking'].map((item, i) => (
              <motion.a 
                key={item} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif font-bold text-luxury-black hover:text-gold active:text-gold/80 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-4 py-8 border-t border-black/5 w-64"
            >
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold text-center mb-2">Connect with us</p>
              <div className="flex gap-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-luxury-black font-bold hover:bg-gold hover:text-white transition-all">WA</a>
                <a href="#" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-luxury-black font-bold hover:bg-gold hover:text-white transition-all">IG</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'home' ? (
        <>
          {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#03221a]">
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#021812]/75 via-[#03221a]/35 to-luxury-cream"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-9xl text-white font-serif font-bold mb-6 md:mb-8 leading-[1] md:leading-[0.9] tracking-tighter text-balance">
              Where Every <br /> <span className="text-gold italic">Stay is a Story</span>
            </h1>
            <p className="text-white/80 text-base md:text-xl font-luxury italic max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 px-4 md:px-0">
              Discover a curated collection of the world's most exquisite residences, from heritage palaces to modern architectural masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center">
              <a href="#apartments" className="gold-gradient w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-full text-luxury-black font-bold tracking-[0.2em] uppercase hover:shadow-2xl hover:shadow-gold/40 transition-all hover:-translate-y-1 text-[10px] md:text-sm">
                View Collections
              </a>
              <a href="#booking" className="bg-white/10 backdrop-blur-xl border border-white/30 w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 rounded-full text-white font-bold tracking-[0.2em] uppercase hover:bg-white/20 transition-all text-[10px] md:text-sm">
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
      <section className="relative z-20 -mt-16 md:-mt-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-luxury-cream/95 backdrop-blur-md p-6 sm:p-10 md:p-16 rounded-[24px] md:rounded-[40px] luxury-shadow border border-gold/25 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {[
            { label: 'Destinations', val: '4+', sub: 'Globally curated' },
            { label: 'Guest Rating', val: '4.9/5', sub: 'Verified reviews' },
            { label: 'Experience', val: '5 Years', sub: 'Luxury hospitality' },
            { label: 'Concierge', val: '24/7', sub: 'Personalized care' }
          ].map((s, i) => (
            <div key={i} className="text-center space-y-1 md:space-y-2">
              <p className="text-3xl md:text-4xl font-serif font-bold text-tara-emerald">{s.val}</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">{s.label}</p>
              <p className="text-[11px] md:text-xs text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="scroll-mt-32 md:scroll-mt-24 py-16 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-gold font-luxury italic text-2xl md:text-3xl mb-4">Curated Apartments</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-luxury-black leading-tight">Tara Luxury <br /> Homes</h3>
          </div>
          <div className="flex gap-2 md:gap-4 bg-luxury-cream/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-gold/15 self-start">
            {['All', 'Taj', 'Private'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f as any)}
                className={`px-4 md:px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${selectedFilter === f ? 'emerald-gradient text-white shadow-lg shadow-tara-emerald/20' : 'text-gray-400 hover:text-luxury-black'}`}
              >
                {f === 'Taj' ? 'Heritage' : f === 'Private' ? 'Modern' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col h-full cursor-pointer bg-white/90 backdrop-blur-md rounded-[32px] border border-gold/15 p-5 hover:border-gold/45 hover:shadow-2xl hover:shadow-gold/5 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative"
              onClick={() => {
                window.location.hash = `#/hotel/${hotel.id}`;
              }}
            >
              {/* Image Container inside the card */}
              {(() => {
                const cardImages = [hotel.image, ...(hotel.gallery || [])];
                const currentImgIdx = cardImageIndexes[hotel.id] || 0;
                return (
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-6 luxury-shadow group/img">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImgIdx}
                        src={cardImages[currentImgIdx]} 
                        alt={`${hotel.name} view ${currentImgIdx}`} 
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 ${hotel.type === 'Taj' ? 'bg-gold/90 text-white' : 'bg-tara-emerald/90 text-white'}`}>
                        {hotel.type === 'Taj' ? 'Heritage Palace' : 'Modern Estate'}
                      </span>
                    </div>

                    {/* Navigation Arrows for Card Slider */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (currentImgIdx === 0) ? cardImages.length - 1 : currentImgIdx - 1;
                        setCardImageIndexes(prev => ({ ...prev, [hotel.id]: nextIdx }));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold active:scale-90 transition-all z-20 opacity-100 md:opacity-0 md:group-hover/img:opacity-100 duration-300"
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={12} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (currentImgIdx === cardImages.length - 1) ? 0 : currentImgIdx + 1;
                        setCardImageIndexes(prev => ({ ...prev, [hotel.id]: nextIdx }));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold active:scale-90 transition-all z-20 opacity-100 md:opacity-0 md:group-hover/img:opacity-100 duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={12} />
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {cardImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardImageIndexes(prev => ({ ...prev, [hotel.id]: idx }));
                          }}
                          className="p-1 focus:outline-none"
                          aria-label={`Go to slide ${idx + 1}`}
                        >
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              currentImgIdx === idx 
                                ? 'bg-gold w-4' 
                                : 'bg-white/40 w-1.5 hover:bg-white/70'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center justify-center bg-white/90 hover:bg-gold text-luxury-black hover:text-white transition-all w-8 h-8 rounded-full shadow-lg group-hover:scale-110 duration-300 z-20">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })()}

              {/* Details fully enclosed inside the card */}
              <div className="flex-grow flex flex-col justify-between px-1">
                <div>
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-luxury-black group-hover:text-gold transition-colors leading-tight">{hotel.name}</h4>
                    <div className="flex items-center gap-1 bg-gold/10 px-2.5 py-1 rounded-lg text-gold shrink-0">
                      <Star size={11} fill="currentColor" />
                      <span className="text-[11px] font-bold">{hotel.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-3">
                    <MapPin size={12} className="text-gold shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-light italic">
                    "{hotel.description}"
                  </p>

                  {/* Elegant Amenity Micro-Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <span 
                        key={amenity} 
                        className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gold/5 text-gold border border-gold/15"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-gray-50 text-gray-400 border border-gray-100">
                        +{hotel.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
                  <div className="flex items-center gap-2 text-tara-emerald font-bold text-[10px] uppercase tracking-widest bg-tara-emerald/5 px-2.5 py-1.5 rounded-lg border border-tara-emerald/10">
                    <Building2 size={13} className="text-tara-emerald animate-pulse" />
                    <span>{hotel.bhk}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-2xl font-serif font-bold text-luxury-black">₹{hotel.price.toLocaleString()}</span>
                    <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold block leading-none mt-0.5">per night</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rating Section (Sliding Experience) */}
      <section id="rating" className="scroll-mt-32 md:scroll-mt-24 bg-[#02140f] py-10 md:py-24 text-white overflow-hidden relative border-t border-b border-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,78,59,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-gold font-luxury italic text-lg md:text-2xl mb-1 md:mb-2">Guest Reviews</h2>
            <h3 className="text-2xl md:text-5xl font-serif font-bold leading-tight">What Our Guests Say</h3>
            <div className="flex justify-center items-center gap-2 mt-3 text-[10px] md:text-xs tracking-widest uppercase font-bold text-gold-light/70">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-gold" fill="currentColor" />
                ))}
              </span>
              <span>4.9 / 5 Guest Rating</span>
            </div>
          </div>

          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between gap-2 md:gap-4">
            {/* Left navigation arrow */}
            <button 
              onClick={() => setActiveRatingSlide((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              className="hidden md:flex w-12 h-12 rounded-full border border-gold/20 items-center justify-center text-gold hover:bg-gold hover:text-[#02140f] hover:border-gold transition-all duration-300 backdrop-blur-md bg-white/5 active:scale-95 shrink-0"
              aria-label="Previous Review"
            >
              <ArrowLeft size={20} />
            </button>

            {/* 3D Stacked Background Cards */}
            <div className="absolute inset-x-20 inset-y-4 pointer-events-none hidden lg:block">
              {/* Card Behind Right */}
              <div className="absolute inset-0 bg-[#022119]/50 border border-gold/10 rounded-[32px] transform rotate-2 scale-[0.97] origin-center shadow-lg -z-10"></div>
              {/* Card Behind Left */}
              <div className="absolute inset-0 bg-[#01140f]/30 border border-gold/5 rounded-[32px] transform -rotate-1.5 scale-[0.94] origin-center shadow-md -z-20"></div>
            </div>

            {/* Testimonial Card */}
            <div 
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const box = card.getBoundingClientRect();
                const x = e.clientX - box.left;
                const y = e.clientY - box.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const rx = -(y - box.height / 2) / (box.height / 12);
                const ry = (x - box.width / 2) / (box.width / 12);
                setTilt({ x: rx, y: ry });
              }}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="mx-1 sm:mx-6 md:mx-0 flex-1 bg-gradient-to-b from-[#032d22] via-[#022119] to-[#01140f] backdrop-blur-md border border-gold/35 p-5 sm:p-10 md:p-12 rounded-[20px] md:rounded-[32px] shadow-[0_30px_70px_rgba(212,175,55,0.22)] relative overflow-hidden group transition-all duration-300 z-10"
            >
              {/* Glowing spotlights inside the card */}
              <div 
                className="absolute pointer-events-none rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-amber-400 to-emerald-400 blur-3xl"
                style={{
                  width: '300px',
                  height: '300px',
                  left: 'var(--mouse-x, 50%)',
                  top: 'var(--mouse-y, 50%)',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>

              {/* Stacked depth layers behind inside */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent pointer-events-none"></div>

              {/* Decorative top quote mark */}
              <div className="absolute -top-6 sm:-top-8 -left-4 text-gold/5 font-serif text-[150px] sm:text-[240px] pointer-events-none select-none leading-none group-hover:scale-105 group-hover:text-gold/10 transition-all duration-500">
                “
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeRatingSlide}
                  initial={{ opacity: 0, y: 20, rotate: -0.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -20, rotate: 0.5 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-full flex flex-col items-center text-center space-y-4 md:space-y-8 relative z-10"
                >
                  {/* Guest image with premium gold frame and verification badge */}
                  <div className="relative group/avatar">
                    <div className="w-16 h-16 sm:w-20 md:w-24 rounded-full overflow-hidden border-2 border-gold p-0.5 sm:p-1 shadow-2xl bg-luxury-black/40 relative z-10 transition-transform duration-500 group-hover/avatar:scale-105">
                      <img 
                        src={REVIEWS[activeRatingSlide].image} 
                        alt={REVIEWS[activeRatingSlide].name} 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Glowing colored ring behind avatar */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-emerald-400 to-indigo-500 rounded-full blur-md opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-[spin_8s_linear_infinite] -z-0"></div>
                    {/* Tiny gold verification checkmark shield */}
                    <div className="absolute -bottom-1 right-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-[#03221a] p-1 sm:p-1.5 rounded-full shadow-lg border border-white/30 z-20">
                      <ShieldCheck size={11} className="stroke-[3]" />
                    </div>
                  </div>

                  {/* Stars with sequence pulse animation and neon glow */}
                  <div className="flex justify-center gap-1 bg-gold/5 px-3 py-1 rounded-full border border-gold/15 backdrop-blur-md">
                    {Array.from({ length: REVIEWS[activeRatingSlide].rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-gold fill-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.6)] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                    {REVIEWS[activeRatingSlide].rating < 5 && (
                      <Star size={12} className="text-gold/20" />
                    )}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-sm sm:text-lg md:text-2xl font-serif italic text-white/95 leading-relaxed max-w-2xl px-2 sm:px-4 drop-shadow-md font-light">
                    "{REVIEWS[activeRatingSlide].comment}"
                  </blockquote>

                  {/* Reviewer Details */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white font-luxury text-lg sm:text-2xl font-bold tracking-widest">{REVIEWS[activeRatingSlide].name}</h4>
                    <p className="text-amber-400/80 text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] font-sans font-bold flex items-center justify-center gap-1.5">
                      <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Verified Elite Member Stay</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right navigation arrow */}
            <button 
              onClick={() => setActiveRatingSlide((prev) => (prev + 1) % REVIEWS.length)}
              className="hidden md:flex w-12 h-12 rounded-full border border-gold/20 items-center justify-center text-gold hover:bg-gold hover:text-[#02140f] hover:border-gold transition-all duration-300 backdrop-blur-md bg-white/5 active:scale-95 shrink-0"
              aria-label="Next Review"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          {/* Bottom control bar with compact navigation and dot indicators */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-12">
            <button 
              onClick={() => setActiveRatingSlide((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              className="flex md:hidden w-8 h-8 rounded-full border border-gold/20 items-center justify-center text-gold hover:bg-gold hover:text-[#02140f] hover:border-gold transition-all backdrop-blur-md bg-white/5 active:scale-95 shrink-0"
              aria-label="Previous Review"
            >
              <ArrowLeft size={14} />
            </button>

            <div className="flex justify-center gap-0.5 sm:gap-1 flex-wrap max-w-[180px] sm:max-w-xs mx-auto">
              {REVIEWS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveRatingSlide(i)}
                  className="p-1 sm:p-2 transition-all focus:outline-none"
                  aria-label={`Go to review ${i + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${activeRatingSlide === i ? 'bg-gold w-4 sm:w-6' : 'bg-white/20 w-1 sm:w-1.5 hover:bg-white/45'}`} />
                </button>
              ))}
            </div>

            <button 
              onClick={() => setActiveRatingSlide((prev) => (prev + 1) % REVIEWS.length)}
              className="flex md:hidden w-8 h-8 rounded-full border border-gold/20 items-center justify-center text-gold hover:bg-gold hover:text-[#02140f] hover:border-gold transition-all backdrop-blur-md bg-white/5 active:scale-95 shrink-0"
              aria-label="Next Review"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="scroll-mt-32 md:scroll-mt-24 py-16 md:py-32 px-4 sm:px-6 bg-luxury-cream/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[32px] md:rounded-[40px] luxury-shadow border border-gold/15 relative">
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 emerald-gradient rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl">
                <Gem size={28} className="md:size-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-black mb-6 md:mb-8">Inquire Privately</h3>
              <form className="space-y-8" onSubmit={handleInquirySubmit}>
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 overflow-hidden shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      if (val.length <= 15) {
                        setFormData({...formData, name: val});
                      }
                    }}
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
                  <div className="flex items-center gap-2 border-b-2 border-black/5 focus-within:border-gold transition-all">
                    <span className="text-gray-400 font-bold py-4">+91</span>
                    <input 
                      type="tel" 
                      required
                      id="phone"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 0) {
                          const firstChar = val[0];
                          if (!['6', '7', '8', '9'].includes(firstChar)) {
                            setError("Contact number must start with 6, 7, 8, or 9.");
                            val = '';
                          }
                        }
                        if (val.length <= 10) {
                          setFormData({...formData, phone: val});
                        }
                      }}
                      className="w-full bg-transparent py-4 outline-none peer placeholder-transparent"
                      placeholder="Contact Number"
                    />
                  </div>
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
                  <div className="relative">
                    <select 
                      id="residence"
                      value={formData.residence}
                      onChange={(e) => setFormData({...formData, residence: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-black/5 py-4 pr-10 focus:border-gold outline-none transition-all appearance-none text-luxury-black font-medium"
                    >
                      {HOTELS.map(h => (
                        <option key={h.id} value={h.name} className="text-luxury-black bg-white">
                          {h.name} (₹{h.price}/night)
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                      <ChevronDown size={18} />
                    </div>
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Booking Start Date */}
                  <div className="relative group">
                    <div className="flex items-center gap-2 border-b-2 border-black/5 focus-within:border-gold transition-all">
                      <Calendar size={18} className="text-gold shrink-0" />
                      <input 
                        type="date" 
                        required
                        id="startDate"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className="w-full bg-transparent py-4 outline-none text-luxury-black font-medium focus:text-luxury-black cursor-pointer"
                      />
                    </div>
                    <motion.label 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      htmlFor="startDate"
                      className="absolute left-0 -top-3.5 text-gray-400 text-xs uppercase tracking-widest font-bold pointer-events-none"
                    >
                      Booking Start Date
                    </motion.label>
                  </div>

                  {/* Booking Check-out Date */}
                  <div className="relative group">
                    <div className="flex items-center gap-2 border-b-2 border-black/5 focus-within:border-gold transition-all">
                      <Calendar size={18} className="text-gold shrink-0" />
                      <input 
                        type="date" 
                        required
                        id="endDate"
                        min={formData.startDate ? (() => {
                          const d = new Date(formData.startDate);
                          d.setDate(d.getDate() + 1);
                          return d.toISOString().split('T')[0];
                        })() : new Date().toISOString().split('T')[0]}
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        className="w-full bg-transparent py-4 outline-none text-luxury-black font-medium focus:text-luxury-black cursor-pointer"
                      />
                    </div>
                    <motion.label 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      htmlFor="endDate"
                      className="absolute left-0 -top-3.5 text-gray-400 text-xs uppercase tracking-widest font-bold pointer-events-none"
                    >
                      Booking Check-out Date
                    </motion.label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    required
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9\s.]/g, '');
                      setFormData({...formData, message: val});
                    }}
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

                <AnimatePresence>
                  {formDaysCount > 0 && selectedHotelForPricing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: 15 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gold/5 border border-gold/30 rounded-2xl p-5 space-y-3 overflow-hidden shadow-inner"
                    >
                      <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <span>Selected Residence</span>
                        <span className="text-luxury-black font-semibold normal-case font-sans">{selectedHotelForPricing.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <span>Rate / Night</span>
                        <span className="text-luxury-black font-semibold font-sans">₹{selectedHotelForPricing.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <span>Duration of Stay</span>
                        <span className="text-luxury-black font-semibold font-sans">{formDaysCount} Day{formDaysCount > 1 ? 's' : ''}</span>
                      </div>
                      <div className="border-t border-gold/20 pt-3 flex justify-between items-center">
                        <span className="text-xs text-gold font-bold uppercase tracking-widest">Total Price</span>
                        <span className="text-xl font-serif font-extrabold text-tara-emerald">₹{formTotalPrice.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  className="w-full py-6 emerald-gradient text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-tara-emerald/40 transition-all uppercase tracking-widest text-sm"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles size={12} className="text-gold animate-pulse" />
                Elite Concierge
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-luxury-black leading-tight">
                Begin Your <br />
                <span className="relative">
                  Journey With Us
                  <span className="absolute -bottom-1 left-0 w-2/3 h-[3px] bg-gold rounded-full"></span>
                </span>
              </h3>
            </div>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-serif italic">
              Our dedicated lifestyle managers are available around the clock to assist with your reservations and any bespoke requirements you may have.
            </p>

            {/* Elegant Call to Action / Hotlines */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Bespoke Registry Channels</h4>

              <a 
                href="tel:+918743892048" 
                className="flex items-center justify-between p-5 rounded-2xl border border-gold/15 bg-white hover:bg-gold/5 transition-all duration-300 group shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Bespoke Voice Hotline</p>
                    <p className="text-lg md:text-xl font-serif font-bold text-luxury-black">+91 87438 92048</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gold/15 text-gold group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <div className="pt-24 md:pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => { window.location.hash = '#/apartments'; }}
        className="flex items-center gap-2.5 text-gold hover:text-gold-light text-xs font-bold uppercase tracking-widest mb-8 group/back bg-gold/5 hover:bg-gold/10 border border-gold/15 hover:border-gold/30 px-5 py-3 rounded-full transition-all duration-300 shadow-sm"
      >
        <ArrowLeft size={14} className="group-hover/back:-translate-x-1.5 transition-transform duration-300 text-gold" />
        Back to Collections
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20"
      >
        <div className="space-y-10">
          {/* Interactive Side-by-Side Gallery Slides */}
          {(() => {
            const allHotelImages = selectedHotel ? [selectedHotel.image, ...(selectedHotel.gallery || [])] : [];
            return (
              <div className="flex flex-col md:flex-row gap-5 items-stretch h-[380px] sm:h-[450px] md:h-[550px]">
                {/* Left/Top vertical thumbnails "side slides" strip */}
                <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-28 order-2 md:order-1 select-none scrollbar-none py-1 px-4 md:px-0 flex-nowrap whitespace-nowrap touch-pan-x">
                  {allHotelImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square md:w-24 md:h-24 w-16 h-16 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${
                        activeImageIndex === idx 
                          ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-102' 
                          : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.03]'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${selectedHotel?.name} thumb ${idx}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Slide Display Frame */}
                <div className="relative flex-1 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl group border border-gold/15 bg-black/95 order-1 md:order-2 h-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      src={allHotelImages[activeImageIndex]}
                      alt={`${selectedHotel?.name} view ${activeImageIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Top gradient overlay */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                  {/* Image position indicator badge */}
                  <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] font-bold tracking-wider">
                    {activeImageIndex + 1} / {allHotelImages.length}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? allHotelImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === allHotelImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })()}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {selectedHotel?.amenities.map((amenity, i) => (
              <div key={i} className="bg-luxury-cream p-5 md:p-6 rounded-3xl border border-black/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Star size={20} />
                </div>
                <span className="text-sm font-bold text-luxury-black uppercase tracking-widest">{amenity}</span>
              </div>
            ))}
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-luxury-black mb-6">{selectedHotel?.name}</h1>
            <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">
              <MapPin size={20} className="text-gold" />
              {selectedHotel?.location}
            </div>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed italic border-l-4 border-gold pl-6 md:pl-8 py-4">
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

          <div className="grid grid-cols-2 gap-4 md:gap-10 py-8 md:py-10 border-y border-black/5">
            <div>
              <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">Starting From</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-tara-emerald leading-tight">₹{selectedHotel?.price.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 block mt-1">Per Night</span>
            </div>
            <div>
              <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-2">Configuration</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-luxury-black leading-tight">{selectedHotel?.bhk}</span>
            </div>
          </div>

          <div className="space-y-8">
            <button 
              onClick={() => {
                if (selectedHotel) {
                  setFormData(prev => ({ ...prev, residence: selectedHotel.name }));
                }
                window.location.hash = '#/booking';
              }}
              className="w-full py-6 emerald-gradient text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-tara-emerald/40 transition-all uppercase tracking-widest text-sm"
            >
              Book This Residence
            </button>

            <div className="space-y-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] text-center">Book via Partner Platforms</p>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
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
      <footer id="contact" className="bg-luxury-cream text-luxury-black pt-20 md:pt-32 pb-12 border-t border-gold/20 relative overflow-hidden">
        {/* Soft Ambient Spotlight Effects in Footer */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-tara-emerald/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 mb-16"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="sm:col-span-2 md:col-span-4 space-y-12"
            >
              <div className="space-y-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-[#02231c] via-[#0b644d] to-amber-500 rounded-full border-2 border-gold shadow-[0_4px_25px_rgba(11,100,77,0.45)] group-hover:shadow-[0_4px_30px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-all duration-500 shrink-0 overflow-hidden">
                    <span className="text-white font-serif text-3xl font-black tracking-wider relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">T</span>
                    <div className="absolute inset-0.5 rounded-full border border-gold/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 opacity-20 mix-blend-overlay animate-[spin_6s_linear_infinite]"></div>
                    <Sparkles size={13} className="absolute -top-1 -right-1 text-amber-400 animate-bounce" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-serif font-bold tracking-tighter leading-none">TARA</span>
                    <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-gold">Luxury Homes</span>
                  </div>
                </a>
                <div className="inline-flex items-center gap-2 bg-tara-emerald/10 border border-tara-emerald/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-tara-emerald uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-gold" /> RERA Approved Heritage Collection
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="sm:col-span-1 md:col-span-2 space-y-8 md:space-y-10"
            >
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Quick Links</h6>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                <li><a href="#home" className="hover:text-gold transition-colors block py-1 hover:translate-x-1 duration-200">Home</a></li>
                <li><a href="#apartments" className="hover:text-gold transition-colors block py-1 hover:translate-x-1 duration-200">Apartments</a></li>
                <li><a href="#rating" className="hover:text-gold transition-colors block py-1 hover:translate-x-1 duration-200">Reviews</a></li>
                <li><a href="#booking" className="hover:text-gold transition-colors block py-1 hover:translate-x-1 duration-200">Booking</a></li>
              </ul>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="sm:col-span-1 md:col-span-2 space-y-10"
            >
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Headquarters</h6>
              <ul className="space-y-6 text-gray-500 text-xs font-medium">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Tara Luxury Homes, Shimla, <br /> Himachal Pradesh 171001</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-gold shrink-0" />
                  <span>+91 8743892048</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="sm:col-span-2 md:col-span-4 space-y-10"
            >
              <h6 className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">Location Map</h6>
              <div className="w-full h-64 rounded-3xl overflow-hidden border border-gold/15 shadow-lg grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.0253456789!2d77.1017974!3d30.9171954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f81c08dece971%3A0x9cdd69cce0cb41e!2sTara%20Luxury%20Homes!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          {/* Core Trust Accreditations Badges with beautiful in-view animations */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          >
            <div className="flex items-center gap-4 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 p-5 rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                <Wifi size={24} className="animate-pulse" />
              </div>
              <div>
                <h5 className="font-sans font-bold text-sm text-gray-900">24/7 Free Wi-Fi</h5>
                <p className="text-[10px] text-blue-600 uppercase tracking-wider font-extrabold mt-0.5">Ultra High-Speed Internet</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-br from-amber-50/70 to-orange-50/40 p-5 rounded-2xl border border-amber-100/60 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                <Utensils size={24} />
              </div>
              <div>
                <h5 className="font-sans font-bold text-sm text-gray-900">Kitchen Accessories</h5>
                <p className="text-[10px] text-amber-600 uppercase tracking-wider font-extrabold mt-0.5">Premium Cooking Setup</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-br from-rose-50/70 to-red-50/40 p-5 rounded-2xl border border-rose-100/60 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 shrink-0 shadow-sm">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h5 className="font-sans font-bold text-sm text-gray-900">24/7 Delivery & App</h5>
                <p className="text-[10px] text-rose-600 uppercase tracking-wider font-extrabold mt-0.5">Zomato & Blinkit Enabled</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-br from-purple-50/70 to-fuchsia-50/40 p-5 rounded-2xl border border-purple-100/60 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                <Users size={24} />
              </div>
              <div>
                <h5 className="font-sans font-bold text-sm text-gray-900">24/7 On-Site Staff</h5>
                <p className="text-[10px] text-purple-600 uppercase tracking-wider font-extrabold mt-0.5">Dedicated In-House Team</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            <p>© 2026 Tara Luxury Homes. Crafted for the Extraordinary.</p>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      {/* WhatsApp Floating Icon - Permanent & Static */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping scale-110 pointer-events-none"></span>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group overflow-hidden transition-all duration-300 relative z-10 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 md:w-7 md:h-7 fill-current relative z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <div className="hidden md:block absolute right-full mr-4 bg-white text-luxury-black px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none translate-x-2 group-hover:translate-x-0 border border-gold/15">
            Chat with Concierge
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gold/10 rotate-45"></div>
          </div>
        </a>
      </div>

      {/* Scroll To Top Button - Appears completely independently above WhatsApp */}
      <div className="fixed bottom-[72px] right-4 md:bottom-[104px] md:right-8 z-[100] flex items-center justify-center">
        <AnimatePresence>
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 15 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="w-11 h-11 md:w-14 md:h-14 bg-luxury-black text-gold hover:text-white rounded-full flex items-center justify-center shadow-lg shadow-gold/10 border border-gold/30 hover:border-gold group overflow-hidden transition-all duration-300 relative"
              title="Back to Top"
            >
              <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowUp size={18} className="relative z-10 group-hover:text-luxury-black group-hover:animate-bounce transition-colors duration-300 md:size-[22px]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
