import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [formData, setFormData] = useState({
    name: '',
    interestedIn: '', // 'classes' or 'show'
    gender: '',
    age: '',
    city: '',
    level: '',
    preferredDay: '',
    preferredTime: '',
    eventDate: '',
    eventTime: '',
    budget: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `שלום, אני ${formData.name}.\n\n`;
    
    if (formData.interestedIn === 'classes') {
      message += `אני מעוניין/ת בשיעורי ריקוד:\n`;
      message += `מגדר: ${formData.gender}\n`;
      message += `גיל: ${formData.age}\n`;
      message += `עיר: ${formData.city}\n`;
      message += `רמת ריקוד: ${formData.level}\n`;
      message += `יום מועדף: ${formData.preferredDay}\n`;
      message += `שעה מועדפת: ${formData.preferredTime}`;
    } else if (formData.interestedIn === 'show') {
      message += `אני מעוניין/ת בהופעה:\n`;
      message += `תאריך האירוע: ${formData.eventDate}\n`;
      message += `שעת האירוע: ${formData.eventTime}\n`;
      message += `תקציב משוער: ${formData.budget}`;
    }
    
    return encodeURIComponent(message);
  };

  const handleFinish = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/972526967850?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
    // Reset form
    setTimeout(() => {
      setStep(1);
      setFormData({
        name: '',
        interestedIn: '',
        gender: '',
        age: '',
        city: '',
        level: '',
        preferredDay: '',
        preferredTime: '',
        eventDate: '',
        eventTime: '',
        budget: '',
      });
    }, 300);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.interestedIn !== '';
      case 3:
        if (formData.interestedIn === 'classes') {
          return formData.gender !== '';
        } else {
          return formData.eventDate !== '';
        }
      case 4:
        if (formData.interestedIn === 'classes') {
          return formData.age !== '';
        } else {
          return formData.eventTime !== '';
        }
      case 5:
        if (formData.interestedIn === 'classes') {
          return formData.city !== '';
        } else {
          return formData.budget !== '';
        }
      case 6:
        return formData.level !== '';
      case 7:
        return formData.preferredDay !== '';
      case 8:
        return formData.preferredTime !== '';
      default:
        return false;
    }
  };

  const getMaxStep = () => {
    return formData.interestedIn === 'classes' ? 8 : 5;
  };

  const handleNext = () => {
    if (step === getMaxStep()) {
      handleFinish();
    } else {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(Math.max(1, step - 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  const renderStep = () => {
    const content = (() => {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <Label htmlFor="name" className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                מה השם שלך?
              </Label>
              <div className="relative group">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="הכנס שם מלא"
                  className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white placeholder:text-gray-600 focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 group-focus-within:translate-x-3 group-focus-within:translate-y-3 transition-transform duration-300" />
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                במה אתה מעוניין?
              </Label>
              <RadioGroup value={formData.interestedIn} onValueChange={(value) => updateField('interestedIn', value)}>
                <motion.div 
                  className="relative group cursor-pointer"
                  whileHover={{ x: -4 }}
                >
                  <div className="flex items-center space-x-4 space-x-reverse p-6 border-4 border-gray-800 bg-gray-950 hover:border-white transition-all duration-300">
                    <RadioGroupItem value="classes" id="classes" className="border-white w-6 h-6" />
                    <Label htmlFor="classes" className="text-2xl cursor-pointer flex-1">שיעורי ריקוד</Label>
                  </div>
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </motion.div>
                
                <motion.div 
                  className="relative group cursor-pointer"
                  whileHover={{ x: -4 }}
                >
                  <div className="flex items-center space-x-4 space-x-reverse p-6 border-4 border-gray-800 bg-gray-950 hover:border-white transition-all duration-300">
                    <RadioGroupItem value="show" id="show" className="border-white w-6 h-6" />
                    <Label htmlFor="show" className="text-2xl cursor-pointer flex-1">הופעה לאירוע</Label>
                  </div>
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </motion.div>
              </RadioGroup>
            </div>
          );

        case 3:
          if (formData.interestedIn === 'classes') {
            return (
              <div className="space-y-6">
                <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  מגדר
                </Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                  {['זכר', 'נקבה', 'אחר'].map((gender, index) => (
                    <motion.div 
                      key={gender}
                      className="relative group cursor-pointer"
                      whileHover={{ x: -4 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4 space-x-reverse p-6 border-4 border-gray-800 bg-gray-950 hover:border-white transition-all duration-300">
                        <RadioGroupItem value={gender} id={gender} className="border-white w-6 h-6" />
                        <Label htmlFor={gender} className="text-2xl cursor-pointer flex-1">{gender}</Label>
                      </div>
                      <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>
            );
          } else {
            return (
              <div className="space-y-6">
                <Label htmlFor="eventDate" className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  תאריך האירוע
                </Label>
                <div className="relative group">
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => updateField('eventDate', e.target.value)}
                    className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </div>
              </div>
            );
          }

        case 4:
          if (formData.interestedIn === 'classes') {
            return (
              <div className="space-y-6">
                <Label htmlFor="age" className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  גיל
                </Label>
                <div className="relative group">
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', e.target.value)}
                    placeholder="הכנס גיל"
                    className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white placeholder:text-gray-600 focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </div>
              </div>
            );
          } else {
            return (
              <div className="space-y-6">
                <Label htmlFor="eventTime" className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  שעת האירוע
                </Label>
                <div className="relative group">
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => updateField('eventTime', e.target.value)}
                    className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </div>
              </div>
            );
          }

        case 5:
          if (formData.interestedIn === 'classes') {
            return (
              <div className="space-y-6">
                <Label htmlFor="city" className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  עיר
                </Label>
                <div className="relative group">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="הכנס עיר מגורים"
                    className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white placeholder:text-gray-600 focus:border-white transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10" />
                </div>
              </div>
            );
          } else {
            return (
              <div className="space-y-6">
                <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  תקציב משוער
                </Label>
                <div className="relative group">
                  <Select value={formData.budget} onValueChange={(value) => updateField('budget', value)}>
                    <SelectTrigger className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white h-auto focus:border-white focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="בחר טווח תקציב" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-950 border-4 border-gray-800 text-white">
                      <SelectItem value="עד 2,000 ₪" className="text-xl">עד 2,000 ₪</SelectItem>
                      <SelectItem value="2,000 - 5,000 ₪" className="text-xl">2,000 - 5,000 ₪</SelectItem>
                      <SelectItem value="5,000 - 10,000 ₪" className="text-xl">5,000 - 10,000 ₪</SelectItem>
                      <SelectItem value="מעל 10,000 ₪" className="text-xl">מעל 10,000 ₪</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 pointer-events-none" />
                </div>
              </div>
            );
          }

        case 6:
          return (
            <div className="space-y-6">
              <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                רמת ריקוד
              </Label>
              <div className="relative group">
                <Select value={formData.level} onValueChange={(value) => updateField('level', value)}>
                  <SelectTrigger className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white h-auto focus:border-white focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="בחר רמה" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-950 border-4 border-gray-800 text-white">
                    <SelectItem value="מתחיל" className="text-xl">מתחיל</SelectItem>
                    <SelectItem value="בינוני" className="text-xl">בינוני</SelectItem>
                    <SelectItem value="מתקדם" className="text-xl">מתקדם</SelectItem>
                    <SelectItem value="מקצועי" className="text-xl">מקצועי</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 pointer-events-none" />
              </div>
            </div>
          );

        case 7:
          return (
            <div className="space-y-6">
              <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                יום מועדף בשבוע
              </Label>
              <div className="relative group">
                <Select value={formData.preferredDay} onValueChange={(value) => updateField('preferredDay', value)}>
                  <SelectTrigger className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white h-auto focus:border-white focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="בחר יום" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-950 border-4 border-gray-800 text-white">
                    <SelectItem value="ראשון" className="text-xl">ראשון</SelectItem>
                    <SelectItem value="שני" className="text-xl">שני</SelectItem>
                    <SelectItem value="שלישי" className="text-xl">שלישי</SelectItem>
                    <SelectItem value="רביעי" className="text-xl">רביעי</SelectItem>
                    <SelectItem value="חמישי" className="text-xl">חמישי</SelectItem>
                    <SelectItem value="שישי" className="text-xl">שישי</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 pointer-events-none" />
              </div>
            </div>
          );

        case 8:
          return (
            <div className="space-y-6">
              <Label className="text-3xl uppercase block mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                שעה מועדפת
              </Label>
              <div className="relative group">
                <Select value={formData.preferredTime} onValueChange={(value) => updateField('preferredTime', value)}>
                  <SelectTrigger className="text-2xl p-8 bg-gray-950 border-4 border-gray-800 text-white h-auto focus:border-white focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="בחר שעה" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-950 border-4 border-gray-800 text-white">
                    <SelectItem value="בוקר (6:00-12:00)" className="text-xl">בוקר (6:00-12:00)</SelectItem>
                    <SelectItem value="צהריים (12:00-17:00)" className="text-xl">צהריים (12:00-17:00)</SelectItem>
                    <SelectItem value="ערב (17:00-21:00)" className="text-xl">ערב (17:00-21:00)</SelectItem>
                    <SelectItem value="לילה (21:00-23:00)" className="text-xl">לילה (21:00-23:00)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute inset-0 border-4 border-gray-800 translate-x-2 translate-y-2 -z-10 pointer-events-none" />
              </div>
            </div>
          );

        default:
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-4 border-white text-white max-w-3xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-5xl uppercase mb-6" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
            הזמן עכשיו
          </DialogTitle>
          <DialogDescription className="sr-only">
            טופס הזמנה לשיעורי ריקוד או הופעה
          </DialogDescription>
          
          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: getMaxStep() }).map((_, i) => (
              <motion.div
                key={i}
                className="h-2 flex-1 relative overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-800"
                />
                <motion.div
                  className="absolute inset-0 bg-white origin-right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </DialogHeader>

        <div className="py-8 min-h-[280px]">
          {renderStep()}
        </div>

        <div className="flex gap-4 justify-between pt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBack}
              disabled={step === 1}
              variant="outline"
              className="border-4 border-gray-800 bg-transparent text-white hover:bg-white hover:text-black disabled:opacity-30 text-xl px-8 py-6 h-auto"
            >
              <ArrowRight className="ml-2 w-5 h-5" />
              חזור
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-white text-black hover:bg-gray-200 disabled:opacity-30 text-xl px-8 py-6 uppercase h-auto border-4 border-white"
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              {step === getMaxStep() ? 'שלח' : 'הבא'}
              <ArrowLeft className="mr-2 w-5 h-5" />
            </Button>
            <div className="absolute inset-0 border-4 border-white translate-x-2 translate-y-2 -z-10" />
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
