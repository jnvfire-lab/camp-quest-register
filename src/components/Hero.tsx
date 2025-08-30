import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, MessageCircle, Phone } from "lucide-react";
import { EVENT_CONFIG, WHATSAPP_CONTACTS, BIBLE_VERSES } from "@/lib/constants";

interface HeroProps {
  onStartForm: () => void;
}

export const Hero = ({ onStartForm }: HeroProps) => {
  const formatWhatsApp = (number: string) => `https://wa.me/${number}`;

  return (
    <section className="min-h-screen bg-gradient-subtle">
      {/* Top bar: logo + contatos */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo JNV */}
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="/logo-jnv.png"
              alt="JNV"
              className="h-12 w-auto md:h-14 drop-shadow-sm"
            />
          </div>

          {/* Contatos */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={formatWhatsApp(WHATSAPP_CONTACTS.maicon)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-accent/10 px-4 py-2 text-sm text-foreground hover:bg-accent/20 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Maicon — (19) 99246-7395
            </a>
            <a
              href={formatWhatsApp(WHATSAPP_CONTACTS.gabi)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-accent/10 px-4 py-2 text-sm text-foreground hover:bg-accent/20 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Gabi — (19) 98604-6866
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hero content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-10 md:py-16 lg:py-20 text-center">
          {/* Kicker */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-3 inline-block rounded-full border border-border bg-background/60 px-3 py-1 text-xs md:text-sm text-muted-foreground"
          >
            Jaguariúna • {EVENT_CONFIG.dateEvent}
          </motion.p>

          {/* Title & subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-4xl text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="bg-gradient-primary bg-clip-text text-white">
              {EVENT_CONFIG.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mx-auto mt-4 max-w-2xl text-base md:text-xl text-muted-foreground"
          >
            {EVENT_CONFIG.subtitle}
          </motion.p>

          {/* Age line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="mt-2 text-sm md:text-base text-foreground/80"
          >
            {EVENT_CONFIG.ageLimit}
          </motion.p>

          {/* CTA group */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-7 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              onClick={onStartForm}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow text-base md:text-lg px-7 py-5 h-auto"
            >
              Fazer inscrição agora
              <motion.span
                aria-hidden
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Button>

            <a
              href={formatWhatsApp(WHATSAPP_CONTACTS.maicon)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm hover:bg-background/90 transition"
            >
              <Phone className="h-4 w-4" />
              Falar com organização
            </a>
          </motion.div>
        </div>
      </div>

      {/* Info cards */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-card">
            <MapPin className="h-7 w-7 text-primary mb-3" />
            <h3 className="text-base font-semibold mb-1.5">Local</h3>
            <p className="text-sm text-muted-foreground">
              {EVENT_CONFIG.location}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-card">
            <Calendar className="h-7 w-7 text-primary mb-3" />
            <h3 className="text-base font-semibold mb-1.5">Quando</h3>
            <p className="text-sm text-muted-foreground">
              {EVENT_CONFIG.dateEvent}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-card">
            <Users className="h-7 w-7 text-primary mb-3" />
            <h3 className="text-base font-semibold mb-1.5">Idade</h3>
            <p className="text-sm text-muted-foreground">
              {EVENT_CONFIG.ageLimit}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="my-10 md:my-14 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Versículos */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {BIBLE_VERSES.map((verse, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card/90 p-6 shadow-card text-left"
            >
              <p className="text-foreground/90 mb-2 italic leading-relaxed">
                “{verse.text}”
              </p>
              <p className="text-primary font-semibold text-sm">
                {verse.reference}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
