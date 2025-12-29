import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('נא להזין כתובת אימייל תקינה');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('תודה! נוספת לרשימת התפוצה שלנו');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1 relative group">
          {/* Input field */}
          <div className="relative">
            <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 z-10 w-6 h-6 group-focus-within:text-white transition-colors" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הכנס כתובת אימייל"
              className="text-2xl p-8 pr-16 bg-gray-900 border-4 border-gray-800 text-white placeholder:text-gray-600 focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isSubmitting}
            />
          </div>
          
          {/* Brutalist shadow */}
          <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 group-focus-within:translate-x-3 group-focus-within:translate-y-3 transition-transform duration-300" />
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 text-2xl px-10 py-8 uppercase border-4 border-white h-auto relative overflow-hidden group"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isSubmitting ? 'שולח...' : 'הירשם'}
              {!isSubmitting && <ArrowLeft className="w-6 h-6" />}
            </span>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-white">
              {isSubmitting ? 'שולח...' : (
                <span className="flex items-center gap-3">
                  הירשם
                  <ArrowLeft className="w-6 h-6" />
                </span>
              )}
            </span>
          </Button>
          
          {/* Brutalist shadow */}
          <div className="absolute inset-0 border-4 border-white translate-x-2 translate-y-2 -z-10" />
        </motion.div>
      </div>
    </motion.form>
  );
}
