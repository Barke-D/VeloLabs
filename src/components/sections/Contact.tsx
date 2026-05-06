import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ChevronDown, 
  Send, 
  Clock, 
  Instagram, 
  Linkedin, 
  Github,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#050806] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Start Your Project</h2>
              <p className="text-muted-foreground text-lg mb-10">We'll get back to you within 24 hours.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  
                  {/* Company */}
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Project Type Dropdown */}
                <div className="relative group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <select 
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 px-4 pr-10 text-white outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Project Type</option>
                    <option value="website">Website Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="enterprise">Enterprise System</option>
                    <option value="game">Gaming Platform</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="bot">Bot Development</option>
                    <option value="custom">Custom Software</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full bg-[#0a110a] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-[0_0_30px_rgba(29,185,84,0.3)] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-primary bg-primary/10 p-4 rounded-2xl"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully! We'll be in touch soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-red-500 bg-red-500/10 p-4 rounded-2xl"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Right Column: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Contact Details Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Phone Card */}
              <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl flex gap-5 group hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Phone</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">+251 905 760 00</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">+251 973 393 381</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl flex gap-5 group hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 transition-transform group-hover:scale-110">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">velolabsdigital@gmail.com</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl flex gap-5 group hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 transition-transform group-hover:scale-110">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Hours</h4>
                  <p className="text-muted-foreground text-sm">Mon–Fri: 8AM–6PM</p>
                  <p className="text-muted-foreground text-sm">Sat: 9AM–4PM</p>
                </div>
              </div>

              {/* Follow Us Card */}
              <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl transition-colors hover:border-primary/20">
                <h4 className="text-white font-bold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[Github, Linkedin, Instagram].map((Icon, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl text-center">
                  <div className="text-2xl font-black text-white mb-1">24h</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Response Time</div>
                </div>
                <div className="bg-[#0a110a] border border-white/5 p-6 rounded-3xl text-center">
                  <div className="text-2xl font-black text-white mb-1">15+</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projects Done</div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
