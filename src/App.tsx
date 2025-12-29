import { useState } from 'react';
import { BookingDialog } from './components/BookingDialog';
import { SubscribeForm } from './components/SubscribeForm';
import { GraffitiBackground } from './components/GraffitiBackground';
import { Music, Zap, Star } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { motion } from 'motion/react';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" dir="rtl">
      {/* Background graffiti effects */}
      <GraffitiBackground />

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Header with animation */}
          <motion.header 
            className="mb-32"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative inline-block">
              <motion.h1 
                className="text-[10rem] md:text-[15rem] leading-none tracking-tighter uppercase select-none"
                style={{ 
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  WebkitTextStroke: '3px white',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '8px 8px 0px rgba(255,255,255,0.1)'
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                רקדן
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-4 right-0 w-full h-2 bg-white origin-right"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mr-12 mt-4"
            >
              <span 
                className="text-7xl md:text-9xl text-gray-400 uppercase tracking-tight"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
              >
                מורה
              </span>
            </motion.div>
          </motion.header>

          {/* Main Content */}
          <div className="max-w-5xl mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 
                className="text-6xl md:text-8xl mb-8 uppercase relative inline-block"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
              >
                תנועה זה חיים
                <div className="absolute -bottom-2 right-0 w-32 h-1 bg-gradient-to-l from-white to-transparent" />
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-3xl md:text-4xl text-gray-300 mb-16 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              שיעורי ריקוד מקצועיים <span className="text-white">///</span> אירועים <span className="text-white">///</span> מופעים
            </motion.p>

            {/* Features with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                { icon: Music, title: 'שיעורים', desc: 'שיעורים קבוצתיים ופרטיים לכל הרמות', delay: 1.1 },
                { icon: Star, title: 'מופעים', desc: 'הופעות מרהיבות לאירועים שלכם', delay: 1.3 },
                { icon: Zap, title: 'אנרגיה', desc: 'ביטוי עצמי דרך תנועה', delay: 1.5 }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="border-4 border-gray-800 p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm relative overflow-hidden">
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                    
                    <feature.icon className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 
                      className="text-3xl mb-3 uppercase tracking-tight"
                      style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  
                  {/* Brutalist shadow */}
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </motion.div>
              ))}
            </div>

            {/* CTA Button with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              <motion.button
                onClick={() => setBookingOpen(true)}
                className="relative bg-white text-black px-16 py-8 text-4xl md:text-5xl uppercase border-4 border-white overflow-hidden group"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">הזמן עכשיו</span>
                
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white">
                  הזמן עכשיו
                </span>
                
                {/* Brutalist shadow */}
                <div className="absolute inset-0 border-4 border-white translate-x-3 translate-y-3 -z-10" />
              </motion.button>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            className="max-w-4xl mx-auto my-32 relative"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-8">
              <span className="text-4xl text-gray-600">✦</span>
            </div>
          </motion.div>

          {/* Subscribe Section */}
          <motion.div 
            className="max-w-3xl mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <h3 
                className="text-5xl md:text-7xl mb-6 uppercase tracking-tight relative inline-block"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
              >
                הצטרף לרשימת התפוצה
                <div className="absolute -bottom-2 right-0 w-24 h-1 bg-white" />
              </h3>
            </div>
            
            <p className="text-2xl text-gray-400 mb-10 leading-relaxed">
              קבל עדכונים על שיעורים חדשים, אירועים ומבצעים מיוחדים
            </p>
            
            <SubscribeForm />
          </motion.div>
        </div>

        {/* Bottom decorative stripe */}
        <motion.div 
          className="relative h-4 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
        >
          <div className="absolute inset-0 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i % 3 === 0 ? 'bg-white' : i % 3 === 1 ? 'bg-gray-700' : 'bg-gray-900'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking Dialog */}
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      
      {/* Toast notifications */}
      <Toaster position="top-center" dir="rtl" />
    </div>
  );
}
