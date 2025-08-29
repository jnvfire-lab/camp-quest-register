import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/constants';

interface HeroProps {
  onStartForm: () => void;
}

export const Hero = ({ onStartForm }: HeroProps) => {
  return (
    <section className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Inscrições Abertas
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {EVENT_CONFIG.title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Uma experiência transformadora que você não pode perder! 
            Diversão, crescimento e novas amizades te aguardam.
          </p>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Quando</h3>
            <p className="text-muted-foreground">{EVENT_CONFIG.dates}</p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Onde</h3>
            <p className="text-muted-foreground">{EVENT_CONFIG.city}</p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Para Quem</h3>
            <p className="text-muted-foreground">Jovens de 10 a 30 anos</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={onStartForm}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 h-auto transition-bounce"
          >
            Fazer Inscrição Agora
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 grid md:grid-cols-4 gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Inscrição rápida
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Pagamento facilitado
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Suporte via WhatsApp
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            100% seguro
          </div>
        </motion.div>
      </div>
    </section>
  );
};