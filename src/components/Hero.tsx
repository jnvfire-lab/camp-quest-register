import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Phone, MessageCircle } from "lucide-react";
import { EVENT_CONFIG, WHATSAPP_CONTACTS, BIBLE_VERSES } from "@/lib/constants";

interface HeroProps {
  onStartForm: () => void;
}

export const Hero = ({ onStartForm }: HeroProps) => {
  const formatWhatsApp = (number: string) => {
    return `https://wa.me/${number}`;
  };

  return (
    <section className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Contatos no topo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href={formatWhatsApp(WHATSAPP_CONTACTS.maicon)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium transition-smooth"
          >
            <MessageCircle className="w-4 h-4" />
            Maicon — (19) 99246-7395
          </a>
          <a
            href={formatWhatsApp(WHATSAPP_CONTACTS.gabi)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium transition-smooth"
          >
            <MessageCircle className="w-4 h-4" />
            Gabi — (19) 98604-6866
          </a>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-white">
              {EVENT_CONFIG.title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {EVENT_CONFIG.subtitle}
          </p>

          <p className="text-lg text-muted-foreground">
            {EVENT_CONFIG.ageLimit}
          </p>
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Local</h3>
            <p className="text-muted-foreground text-sm">
              {EVENT_CONFIG.location}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Idade</h3>
            <p className="text-muted-foreground">{EVENT_CONFIG.ageLimit}</p>
          </div>
        </motion.div>

        {/* Versículos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {BIBLE_VERSES.map((verse, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 shadow-card"
              >
                <p className="text-foreground font-medium mb-2 italic">
                  "{verse.text}"
                </p>
                <p className="text-primary font-semibold text-sm">
                  {verse.reference}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
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
      </div>
    </section>
  );
};
