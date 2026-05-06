import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function SuccessModal({ isOpen, onClose, message = "We've received your message and will get back to you within 24 hours." }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a110a] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_50px_rgba(29,185,84,0.15)]"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-7 h-7 text-black stroke-[3px]" />
                </div>
              </motion.div>

              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Success!</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {message}
              </p>

              <button
                onClick={onClose}
                className="w-full bg-primary text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-[0_0_30px_rgba(29,185,84,0.3)]"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
