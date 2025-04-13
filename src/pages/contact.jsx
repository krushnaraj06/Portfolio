import React, { useState, useEffect, useRef } from 'react';

const ContactPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const formRef = useRef(null);
  
  // Detect when section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const position = contactRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
  // Check if form is valid
  const isFormValid = () => {
    return formState.fullName && formState.email && formState.message;
  };

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-gradient-to-b from-[#0A1828] to-[#0F2336] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#178582]/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.5s ease-out'
          }}  
        ></div>
        <div 
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#BFA181]/10 blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.5s ease-out'
          }}  
        ></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                backgroundColor: i % 3 === 0 ? '#178582' : i % 3 === 1 ? '#BFA181' : '#ffffff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{ 
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
            transition: 'transform 1s ease-out'
          }}  
        ></div>
      </div>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block mb-3">
          </div>
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get in Touch <span className="text-[#BFA181]">with Us</span>
            </h2>
            <div className="absolute bottom-2 left-0 w-full h-1 bg-[#178582] animate-expand-underline"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Have a project in mind? We're here to help transform your digital presence.
          </p>
        </div>
        
        {/* Contact content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact info card - Updated to match theme */}
          <div 
            className={`lg:w-1/3 bg-gradient-to-br from-[#0F2336] to-[#0A1828] text-white rounded-2xl p-8 shadow-xl overflow-hidden relative transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'} border border-[#178582]/20`}
          >
            {/* Card background patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-4 border-[#178582]/10 animate-spin-slow"></div>
              <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full border-4 border-[#BFA181]/10 animate-spin-slow-reverse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#178582]/5 animate-pulse-slow"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-[#BFA181]">
                <svg className="w-6 h-6 mr-3 text-[#178582]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                Contact Info
              </h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Phone</p>
                    <p className="font-medium text-white">+91 7249466063</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Email</p>
                    <p className="font-medium text-white">aspvisionsolutions@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#178582]/10 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#BFA181] text-sm mb-1">Location</p>
                    <p className="font-medium text-white">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="text-xl font-medium mb-4 text-white">Follow Us</p>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'linkedin'].map((social, index) => (
                    <a 
                      key={index} 
                      href="#"
                      className={`w-10 h-10 rounded-full bg-[#178582]/10 flex items-center justify-center hover:bg-[#178582]/30 transition-all duration-300 transform ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                      style={{ transitionDelay: `${index * 100 + 500}ms` }}
                    >
                      {social === 'twitter' && (
                        <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      )}
                      {social === 'facebook' && (
                        <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      )}
                      {social === 'linkedin' && (
                        <svg className="w-5 h-5 text-[#178582]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></rect>
                          <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            className={`lg:w-2/3 transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-[#0F2336]/70 backdrop-blur-md rounded-2xl p-8 border border-[#178582]/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {formSubmitted ? (
                <div className="rounded-xl bg-[#178582]/20 p-6 text-center animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#178582]/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#178582]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                  <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Full Name <span className="text-[#BFA181]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                        required
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Email Address <span className="text-[#BFA181]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                        required
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                    <div className="form-group relative">
                      <label className="text-gray-300 text-sm mb-1 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                      />
                      <div className="form-group-focus-line"></div>
                    </div>
                  </div>
                  
                  <div className="form-group relative">
                    <label className="text-gray-300 text-sm mb-1 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input"
                    />
                    <div className="form-group-focus-line"></div>
                  </div>
                  
                  <div className="form-group relative">
                    <label className="text-gray-300 text-sm mb-1 block">
                      Message <span className="text-[#BFA181]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, requirements, or questions..."
                      rows={6}
                      className="w-full bg-[#0A1828] border border-[#178582]/20 focus:border-[#178582] text-gray-300 px-4 py-3 rounded-lg focus:outline-none transition-colors form-input resize-none"
                      required
                    ></textarea>
                    <div className="form-group-focus-line"></div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!isFormValid() || isSubmitting}
                      className={`px-8 py-3 rounded-lg transition-all duration-300 font-medium relative overflow-hidden group ${
                        isFormValid() && !isSubmitting
                          ? 'bg-[#178582] text-white hover:shadow-xl hover:shadow-[#178582]/20 transform hover:translate-y-[-4px]'
                          : 'bg-[#178582]/50 text-white/70 cursor-not-allowed'
                      }`}
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#178582] to-[#178582]/70 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map or additional info section */}
        <div className={`mt-16 transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '400ms' }}>
          <div className="bg-[#0F2336]/70 backdrop-blur-md rounded-2xl p-8 border border-[#178582]/20 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1828] to-transparent z-10"></div>
            
            <div className="relative z-20 max-w-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-gray-300 mb-6">
                Whether you need a new website, want to refresh your brand, or are looking for a complete digital transformation, 
                our team is ready to bring your vision to life. Reach out today to start the conversation.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:aspvisionsolutions@gmail.com" 
                  className="px-6 py-3 bg-[#BFA181] text-white rounded-lg transition-all hover:bg-[#BFA181]/90 transform hover:translate-y-[-4px] hover:shadow-lg inline-flex items-center"
                >
                  Email Us Directly
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="tel:+917249466063" 
                  className="px-6 py-3 border border-[#178582] text-[#178582] rounded-lg transition-all hover:bg-[#178582]/10 transform hover:translate-y-[-4px] inline-flex items-center"
                >
                  Call Us Now
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Decorative map-like background */}
            <div className="absolute top-0 right-0 bottom-0 w-1/3 md:w-1/2 bg-[#0A1828] bg-opacity-50 z-0">
              <div className="relative w-full h-full opacity-20">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#178582] animate-ping"></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#BFA181] animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-white animate-ping" style={{ animationDelay: '2s' }}></div>
                
                {/* Map grid lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={`v-${i}`} className="border-l border-white/5"></div>
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={`h-${i}`} className="border-t border-white/5"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes expand-underline {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1
          @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        .animate-expand-underline {
          animation: expand-underline 1.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .form-group-focus-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #178582;
          transition: width 0.3s ease-out;
        }

        .form-input:focus + .form-group-focus-line {
          width: 100%;
        }

        .bg-grid-pattern {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, #178582 1px, transparent 1px),
                          linear-gradient(to bottom, #178582 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default ContactPage;