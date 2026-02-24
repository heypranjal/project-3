import React, { useEffect, useState, useRef } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import logo from './assets/LOGO (1).png';

type AnimatedNumberProps = {
  to: number;
  suffix?: string;
  duration?: number;
};

function AnimatedNumber({ to, suffix = '', duration = 1.5 }: AnimatedNumberProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: '-100px' });
  useEffect(() => {
    if (!isInView) {
      setValue(0);
      return;
    }
    let frame: number;
    let startTime: number | null = null;
    function animateCount(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      let current = Math.floor(progress * to);
      setValue(current);
      if (progress < 1) {
        frame = requestAnimationFrame(animateCount);
      } else {
        setValue(to);
      }
    }
    frame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frame);
  }, [to, duration, isInView]);
  // For 10K+ case, display as 10K+ when value reaches 10000
  if (to === 10000 && value === to) {
    return <span ref={ref}>10K{suffix}</span>;
  }
  return <span ref={ref}>{value}{suffix}</span>;
}

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { margin: '-100px' });
  const [heroAnimKey, setHeroAnimKey] = useState(0);
  useEffect(() => {
    if (heroInView) setHeroAnimKey((k) => k + 1);
  }, [heroInView]);

  const [formData, setFormData] = useState({ name: '', number: '', whoAreYou: '', email: '', budget: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, number, whoAreYou, email, budget } = formData;
    const body = `Name: ${name}%0ANumber: ${number}%0AWho Are You: ${whoAreYou}%0AEmail: ${email}%0ABudget: ${budget}`;
    window.location.href = `mailto:sarthak@taggify.in?subject=New Enquiry from ${encodeURIComponent(name)}&body=${body}`;
    setFormData({ name: '', number: '', whoAreYou: '', email: '', budget: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-600">Taggify</div>
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Home</a>
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={heroRef} className="relative mx-4 mt-8">
        <div className="bg-white rounded-3xl p-6 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 w-full max-w-2xl">
              {/* Logo in hero */}
              <div className="mb-6 md:mb-8">
                <div className="text-2xl md:text-4xl font-bold text-gray-600">Taggify</div>
              </div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6 md:mb-8 flex flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                key={heroAnimKey}
              >
                {/* 'Let our' */}
                {['Let', 'our'].map((word, i) => (
                  <motion.span
                    key={`${word}-${i}-${heroAnimKey}`}
                    className="inline-block mr-2"
                    variants={{
                      hidden: { y: -40, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                {/* MEMES */}
                <motion.span className="text-yellow-400 font-bold mr-2"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
                  }}
                >
                  MEMES
                </motion.span>
                <br />
                {/* 'do the Talking' as one line */}
                <motion.span
                  className="text-blue-500 font-bold"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
                  }}
                >
                  do the TALKING
                </motion.span>
              </motion.h1>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8 max-w-lg leading-relaxed">
                At Taggify, we're your one-stop-shop for social media management, meme marketing, public relations, and influencer marketing. Let us help you unlock your brand's full potential.
              </p>

              {/* CTA Button */}
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg border-4 border-black">
                OUR CLIENTS
              </button>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="relative">
                {/* Main illustration container */}
                <div className="w-96 h-80 relative">
                  {/* Group of people illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Person 1 - Left back */}
                    <div className="absolute left-0 top-8 w-16 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-700 rounded-full relative">
                        <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Person 2 - Center back with glasses */}
                    <div className="absolute left-16 top-4 w-16 h-20 bg-orange-400 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full relative">
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 border-2 border-black rounded-full bg-transparent"></div>
                        <div className="absolute top-2 left-3 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-2 right-3 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
                      </div>
                    </div>

                    {/* Person 3 - Right back */}
                    <div className="absolute right-16 top-6 w-16 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-purple-700 rounded-full relative">
                        <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Person 4 - Front left */}
                    <div className="absolute left-8 top-16 w-18 h-22 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-14 h-14 bg-green-600 rounded-full relative">
                        <div className="absolute top-3 left-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-3 right-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Person 5 - Center front with laptop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-20 w-20 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full relative">
                        <div className="absolute top-3 left-5 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-3 right-5 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
                        {/* Laptop */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gray-300 rounded-sm">
                          <div className="w-full h-6 bg-gray-800 rounded-t-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Person 6 - Front right */}
                    <div className="absolute right-8 top-18 w-18 h-22 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full relative">
                        <div className="absolute top-3 left-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-3 right-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Person 7 - Far right with raised hand */}
                    <div className="absolute right-0 top-12 w-16 h-20 bg-teal-400 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-teal-500 rounded-full relative">
                        <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-2 right-3 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                        {/* Raised hand */}
                        <div className="absolute -top-6 -right-4 w-4 h-6 bg-teal-300 rounded-full transform rotate-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="mx-4 mt-16">
        <div className="bg-white rounded-3xl px-4 md:px-12 py-8 md:py-16 text-center">
          <div className="text-sm font-semibold text-black mb-6 tracking-wider">WHO WE ARE</div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-black leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            We help brands <span className="text-yellow-400">connect better</span> to<br />
            their audience with <span className="text-red-500">meme culture.</span>
          </motion.h2>
        </div>
      </div>

      {/* Top Meme Portals Section */}
      <div className="mx-4 mt-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-black"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Top <span className="text-orange-500">Meme</span> Portals
          </motion.h2>
        </div>

        {/* Meme Portal Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10 md:mb-16">
          {/* Adult Society */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-black flex items-center justify-center">
            <div className="text-blue-400 font-bold text-xs text-center">
              ADULT<br />SOCIETY
            </div>
          </div>

          {/* FC Logo */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-white flex items-center justify-center">
            <div className="text-black font-bold text-2xl">FC</div>
          </div>

          {/* Unheard */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-white flex items-center justify-center">
            <div className="text-black font-bold text-sm">Unheard.</div>
          </div>

          {/* Naughty World */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
            <div className="text-white font-bold text-xs text-center">
              NAUGHTY<br />WORLD
            </div>
          </div>

          {/* The Viral Cinema */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-blue-500 flex items-center justify-center">
            <div className="text-white font-bold text-xs text-center">
              THE VIRAL<br />CINEMA
            </div>
          </div>

          {/* Silhouette Logo */}
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-teal-400 flex items-center justify-center">
            <div className="w-8 h-8 bg-black rounded-full relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-2 border-black rounded-2xl p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-300">
            <div className="text-center px-4 md:px-8 py-6 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-black mb-4"><AnimatedNumber to={75} suffix="+" duration={1.5} /></div>
              <div className="text-xl font-semibold text-black">Brands</div>
            </div>
            <div className="text-center px-4 md:px-8 py-6 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-black mb-4"><AnimatedNumber to={950} suffix="+" duration={1.5} /></div>
              <div className="text-xl font-semibold text-black">Campaigns</div>
            </div>
            <div className="text-center px-4 md:px-8 py-6 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-black mb-4"><AnimatedNumber to={10000} suffix="+" duration={1.5} /></div>
              <div className="text-xl font-semibold text-black">Creators Community</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-4 mt-12 md:mt-20 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Header */}
          <div className="w-full md:w-1/3 md:pr-12 mb-8 md:mb-0">
            <div className="text-sm font-semibold text-gray-600 mb-4 tracking-wider">SERVICES</div>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-black leading-tight mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Our Creative<br />Services
            </motion.h2>
            
            {/* Illustration */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-400 rounded-full relative">
                <div className="absolute top-2 right-2 w-3 h-3 bg-orange-400 rounded-full"></div>
                <div className="absolute bottom-1 left-3 w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="absolute top-4 left-1 w-1 h-1 bg-red-400 rounded-full"></div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              At Taggify , we're passionate about helping businesses grow and succeed. We believe in the power of social media and creative marketing strategies to make a real impact in today's digital world. Let us be your partner in achieving your goals.
            </p>
          </div>

          {/* Right Side - Service Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Meme Marketing */}
            <div className="border-2 border-black rounded-2xl p-8 bg-gray-100">
              <div className="mb-6">
                <div className="w-16 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-white font-bold text-xs">MEME</div>
                </div>
                <div className="w-12 h-8 bg-green-600 rounded-lg"></div>
              </div>
              
              <motion.h3
                className="text-2xl font-bold text-black mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Meme Marketing
              </motion.h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Our quality content creators and copywriters design the best memes based on the latest trends, which allow your brand and product to penetrate deeper into the market through social media.
              </p>
              
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                ENQUIRE NOW
              </button>
            </div>

            {/* Influencer Marketing */}
            <div className="border-2 border-black rounded-2xl p-8 bg-gray-100">
              <div className="mb-6">
                <div className="w-16 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-2 relative">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
              
              <motion.h3
                className="text-2xl font-bold text-black mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Influencer Marketing
              </motion.h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Taggify has a network of India's most popular social media influencers who have taken the digital space by storm and we help you to collaborate with them to grow your paid promotions.
              </p>
              
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                ENQUIRE NOW
              </button>
            </div>

            {/* Public Relations */}
            <div className="border-2 border-black rounded-2xl p-8 bg-gray-100">
              <div className="mb-6">
                <div className="w-16 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-white font-bold text-xs">PR</div>
                </div>
              </div>
              
              <motion.h3
                className="text-2xl font-bold text-black mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Public Relations
              </motion.h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                We at Taggify have one of the top PR professionals in the country that have helped highly brands in the past to manage their PR and Reputation.
              </p>
              
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                ENQUIRE NOW
              </button>
            </div>

            {/* Social Media Management */}
            <div className="border-2 border-black rounded-2xl p-8 bg-gray-100">
              <div className="mb-6">
                <div className="w-16 h-12 bg-orange-400 rounded-lg flex items-center justify-center mb-2 relative">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <motion.h3
                className="text-2xl font-bold text-black mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Social Media Management
              </motion.h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Our social media management service helps your brand stay active, engage with your audience, and grow your online presence effectively.
              </p>
              
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Showcase Section */}
      <div className="mx-4 mt-20 mb-20">
        <div className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 rounded-3xl p-6 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Campaign Showcase
            </motion.h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our Campaign Showcase section is where we highlight some of our most successful projects and campaigns. Take a look at the results we've achieved for our clients and get inspired for your own brand's success. Let Taggify be your guide to social media and marketing excellence.
            </p>
          </div>

          {/* Ladder-Type Campaign List */}
          <div className="flex flex-col gap-24 relative">
            {/* Stage OTT */}
            <div className="flex flex-col md:flex-row items-center justify-start relative gap-8 md:gap-0">
              {/* Text left */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-end pr-0 md:pr-8">
                <div className="max-w-md text-center md:text-right">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    Stage OTT
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We gave Stage OTT a leading position with our epic meme marketing, making them the star of the show. #MemeMagicMagic
                  </p>
                </div>
              </div>
              {/* Card right */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Stage OTT Campaign"
                      className="w-64 h-80 object-cover mx-auto"
                    />
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Stand till the end, and you will end up with success 🤝🔥
                    </div>
                  </div>
                </div>
              </div>
              {/* Ladder line */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full mt-2"></div>
              </div>
            </div>

            {/* Sunfeast */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-end relative gap-8 md:gap-0">
              {/* Card left */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto md:ml-auto">
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Sunfeast Campaign" 
                      className="w-64 h-80 object-cover mx-auto"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      When Everyone get to know about the Sunfeast Farmlite Outrageous Contest!
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                      Le Farmlite Oats Biscuit to other biscuits - Kya hila dala na..
                    </div>
                  </div>
                </div>
              </div>
              {/* Text right */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pl-0 md:pl-8">
                <div className="max-w-md text-center md:text-left">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    Sunfeast
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We made Sunfeast Farmlite spread their goodness through irresistible memes, capturing hearts and stomachs. #MemeLiciousMarketing
                  </p>
                </div>
              </div>
              {/* Ladder line */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full mt-2"></div>
              </div>
            </div>

            {/* Astrotalk */}
            <div className="flex flex-col md:flex-row items-center justify-start relative gap-8 md:gap-0">
              {/* Text left */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-end pr-0 md:pr-8">
                <div className="max-w-md text-center md:text-right">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    Astrotalk
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We assisted Astrotalk with meme marketing, boosting their astrologic and impact in a fun and creative way. #PredictingSuccess
                  </p>
                </div>
              </div>
              {/* Card right */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/8471016/pexels-photo-8471016.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Astrotalk Campaign" 
                      className="w-64 h-80 object-cover mx-auto"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Another accurate prediction by Astrotalk 😍
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                      Astrotalk predicted last year that Kiara & Sidharth will get married in Feb 2023. The prediction has come true 😍
                    </div>
                  </div>
                </div>
              </div>
              {/* Ladder line */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full mt-2"></div>
              </div>
            </div>

            {/* KFC */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-end relative gap-8 md:gap-0">
              {/* Card left */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto md:ml-auto">
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="KFC Campaign" 
                      className="w-64 h-80 object-cover mx-auto"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      After Seeing The Brand New KFC Restaurant Chefs
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                      Le Every Chicken Lover :-
                    </div>
                  </div>
                </div>
              </div>
              {/* Text right */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pl-0 md:pl-8">
                <div className="max-w-md text-center md:text-left">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    KFC
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    We gave KFC a spicy boost with our meme marketing expertise, leaving their competitors in the dust. #FingerLickinMarketing
                  </p>
                </div>
              </div>
              {/* Ladder line */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full mt-2"></div>
              </div>
            </div>

            {/* Redmi Note 12 Pro */}
            <div className="flex flex-col md:flex-row items-center justify-start relative gap-8 md:gap-0">
              {/* Text left */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-end pr-0 md:pr-8">
                <div className="max-w-md text-center md:text-right">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    Redmi Note 12 Pro
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Our Redmi Note 12 Pro meme campaign went viral! Don't miss out on this amazing phone with unbeatable features. #MemeMarketing
                  </p>
                </div>
              </div>
              {/* Card right */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Redmi Note 12 Pro Campaign" 
                      className="w-64 h-80 object-cover mx-auto"
                    />
                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      200MP camera with OIS..
                    </div>
                  </div>
                </div>
              </div>
              {/* Ladder line */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full mt-2"></div>
              </div>
            </div>

            {/* Fast and Furious X */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-end relative gap-8 md:gap-0">
              {/* Card left */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl border-4 border-black overflow-hidden shadow-xl w-72 mx-auto md:ml-auto">
                  <div className="relative">
                    <img 
                      src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Fast and Furious X Campaign" 
                      className="w-64 h-80 object-cover mx-auto"
                    />
                  </div>
                  <div className="p-6"></div>
                </div>
              </div>
              {/* Text right */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pl-0 md:pl-8">
                <div className="max-w-md text-center md:text-left">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">MEME MARKETING BY TAGGIFY</div>
                  <motion.h3
                    className="text-3xl font-bold text-black mb-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    Fast and Furious X
                  </motion.h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Our Fast and Furious X meme campaign was a HIT! Got ready to rev your engines for the ultimate thrill ride. #FastAndFuriousX
                  </p>
                </div>
              </div>
              {/* Ladder line (last one, no dot) */}
              <div className="hidden md:flex absolute left-1/2 top-0 h-full w-2 flex-col items-center">
                <div className="h-full w-1 bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Clients Section */}
      <div className="mx-4 mt-20 mb-20">
        <div className="border-4 border-black rounded-3xl p-6 md:p-12 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Header */}
            <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-black mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Our Clients
              </motion.h2>
              <p className="text-gray-700 leading-relaxed">
                Our approach is always tailored to fit the unique needs of each client. Join our list of satisfied clients and let us help you reach new heights with the power of memes and influencers.
              </p>
            </div>

            {/* Right Side - Client Logos Grid */}
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {/* Row 1 */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-bold text-lg">f</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="text-white font-bold text-xs">KFC</div>
                  </div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-red-500 font-bold text-sm">Sunfeast</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-yellow-600 font-bold text-sm">Astrotalk</div>
                </div>

                {/* Row 2 */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-blue-600 font-bold text-sm">FAST</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-blue-600 font-bold text-xs">amazon<br/>miniTV</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-red-500 font-bold text-sm">toothsi</div>
                </div>

                {/* Row 3 */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-orange-500 font-bold text-xs">opshappy</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-blue-600 font-bold text-xs">DAAWAT<br/>BASMATI</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-green-600 font-bold text-xs">BKT<br/>GROWING TOGETHER</div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-yellow-600 font-bold text-xs">clubhouse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mx-4 mt-12 md:mt-20 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
          {/* Left Side - Illustration */}
          <div className="hidden md:block w-full md:w-1/2 md:pr-12">
            <div className="relative">
              {/* Laptop Illustration */}
              <div className="w-80 h-60 relative">
                {/* Laptop Base */}
                <div className="absolute bottom-0 w-full h-4 bg-gray-300 rounded-b-lg"></div>
                
                {/* Laptop Screen */}
                <div className="absolute bottom-4 w-full h-48 bg-gray-800 rounded-t-lg border-4 border-gray-600">
                  {/* Screen Content */}
                  <div className="p-4 h-full bg-white m-2 rounded">
                    {/* Browser Elements */}
                    <div className="flex space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    
                    {/* Content Blocks */}
                    <div className="space-y-3">
                      <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      
                      {/* Pink Circle Element */}
                      <div className="absolute bottom-8 right-8 w-12 h-12 bg-pink-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-500 rounded"></div>
                <div className="absolute top-8 -left-8 w-6 h-6 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-2 -right-8 w-4 h-4 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 md:pl-12">
            <div className="text-sm font-semibold text-gray-600 mb-4 tracking-wider">ENQUIRE NOW</div>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Let's Grow Your<br />Brand Together
            </motion.h2>

            {/* Contact Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 pb-3 text-lg bg-transparent focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="number"
                  placeholder="NUMBER"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 pb-3 text-lg bg-transparent focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <select
                  name="whoAreYou"
                  value={formData.whoAreYou}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 pb-3 text-lg bg-transparent focus:border-black focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">WHO ARE YOU?</option>
                  <option value="business">Business Owner</option>
                  <option value="marketing">Marketing Manager</option>
                  <option value="agency">Agency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 pb-3 text-lg bg-transparent focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 pb-3 text-lg bg-transparent focus:border-black focus:outline-none transition-colors text-gray-600"
                >
                  <option value="">BUDGET</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="1l-5l">₹1,00,000 - ₹5,00,000</option>
                  <option value="above-5l">Above ₹5,00,000</option>
                </select>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors border-4 border-black"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Lets stay in touch  */}
 <div className="mx-4 mt-8 mb-8">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Let's stay in touch!
          </motion.h2>
        </div>
      </div>

      {/* Social Media Icons Section */}
      <div className="mx-4 mt-12 md:mt-20 mb-8 md:mb-12">
        <div className="flex justify-center items-center space-x-8 md:space-x-16">
          {/* Email */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <div className="text-lg font-semibold text-gray-800">Email</div>
          </div>

          {/* LinkedIn */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-white font-bold text-2xl">in</div>
            </div>
            <div className="text-lg font-semibold text-gray-800">LinkedIn</div>
          </div>

          {/* Instagram */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="w-12 h-12 border-3 border-white rounded-lg relative">
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-800">Instagram</div>
          </div>
        </div>
      </div>

      {/* Talk to Us Section */}
      <div className="mx-4 mt-16 mb-16">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Talk to Us!
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          {/* Email Card */}
          <div className="border-4 border-black rounded-2xl p-8 bg-white text-center w-full max-w-xs md:w-80">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <motion.h3
              className="text-xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Email
            </motion.h3>
            <a href="mailto:hello@taggify.in" className="text-blue-500 hover:text-blue-600 transition-colors">
              hello@taggify.in
            </a>
          </div>

          {/* Phone Number Card */}
          <div className="border-4 border-black rounded-2xl p-8 bg-white text-center w-full max-w-xs md:w-80">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <motion.h3
              className="text-xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Phone Number
            </motion.h3>
            <a href="tel:+916392264944" className="text-blue-500 hover:text-blue-600 transition-colors">
              Call us at 6392264944
            </a>
          </div>

          {/* Office Address Card */}
          <div className="border-4 border-black rounded-2xl p-8 bg-white text-center w-full max-w-xs md:w-80">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <motion.h3
              className="text-xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              Office Address
            </motion.h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              MG Equity Mall, GT Road<br />
              Panipat Haryana
            </p>
          </div>
        </div>
      </div>

      {/* Lets stay in touch  */}
 <div className="mx-4 mt-8 mb-8">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Let's stay in touch!
          </motion.h2>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-black text-white">
        <div className="mx-4 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Taggify */}
            <div>
              <motion.h3
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Taggify
              </motion.h3>
              <p className="text-gray-300 leading-relaxed">
                We're your one-stop-shop for social media management, meme marketing, public relations, and influencer marketing. Let us help you unlock your brand's full potential.
              </p>
            </div>

            {/* Services */}
            <div>
              <motion.h3
                className="text-xl font-bold mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Services
              </motion.h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Meme Marketing</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Influencer Marketing</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Social Media Marketing</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Public Relations</a></li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <motion.h3
                className="text-xl font-bold mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                Info
              </motion.h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Get In Touch</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Campaign Showcase</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">Our Clients</a></li>
                <li><a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">About Us</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="text-center text-gray-400">
              Copyright © 2025
            </div>
          </div>
        </div>
      </div>

      {/* Final Footer Message */}
      {/* <div className="mx-4 mt-8 mb-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Let's stay in touch!</h2>
        </div>
      </div> */}
    </div>
  );
}

export default App;