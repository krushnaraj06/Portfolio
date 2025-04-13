import React, { useState, useEffect, useRef } from 'react';
// Import the image properly - adjust path as needed based on your project structure
import animatedImage from '../assets/animated.webp';
import anshimage from '../assets/ansh.png';

const AboutUsPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('story');
  const aboutRef = useRef(null);
  
  // Sections for the about page
  const sections = {
    story: {
      title: "Our Story",
      content: "Founded in 2023, DesignStudio began as a collaboration between two passionate individuals with complementary skills in design and development. What started as freelance projects quickly evolved into a dedicated studio focused on delivering exceptional digital experiences."
    },
    mission: {
      title: "Our Mission",
      content: "We believe in creating digital experiences that not only look beautiful but also drive results. Our mission is to help businesses establish a strong online presence through thoughtful design and robust development solutions."
    },
    approach: {
      title: "Our Approach",
      content: "We take a collaborative approach to every project, working closely with our clients to understand their unique needs and objectives. Our process combines creativity with technical expertise to deliver solutions that exceed expectations."
    }
  };
  
  // Team members data
  const teamMembers = [
    {
      name: "Ansh Agarwal",
      role: "Lead Developer",
      bio: "Ansh has a passion for clean code and innovative solutions, with expertise in frontend and backend technologies that power modern web applications.",
      image: anshimage
    },
    {
      name: "Krushnaraj Bhosale",
      role: "UI/UX Developer",
      bio: "With over 1+ years of experience in digital design, Krushnaraj brings a unique perspective to every project, focusing on creating intuitive and engaging user experiences.",
      image: "/api/placeholder/400/400"
    }
  ];
  
  // Detect when section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const position = aboutRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-gradient-to-b from-[#0A1828] to-[#0F2336] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#178582]/5 blur-3xl"
            style={{ 
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.5s ease-out'
            }}  
          ></div>
          <div 
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#BFA181]/5 blur-3xl"
            style={{ 
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              transition: 'transform 0.5s ease-out'
            }}  
          ></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full border border-[#178582]/5 animate-pulse-slow"></div>
        </div>
        
        {/* Hero section */}
        <div className={`relative mb-20 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block mb-4">
                <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium">
                  About Us
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Our <span className="text-[#BFA181]">Mission</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're a small, dedicated team passionate about creating exceptional digital experiences that help businesses thrive in the digital world.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0A1828]/50 backdrop-blur-sm rounded-xl p-6 border border-[#178582]/10 transition-transform hover:transform hover:scale-105">
                  <div className="text-3xl font-bold text-[#BFA181] mb-1">2+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-[#0A1828]/50 backdrop-blur-sm rounded-xl p-6 border border-[#178582]/10 transition-transform hover:transform hover:scale-105">
                  <div className="text-3xl font-bold text-[#BFA181] mb-1">50+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-[#178582] text-white rounded-lg transition-all hover:bg-[#178582]/90 transform hover:translate-y-[-4px] hover:shadow-lg inline-flex items-center"
                >
                  Get in Touch
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/portfolio" 
                  className="px-6 py-3 border border-[#BFA181] text-[#BFA181] rounded-lg transition-all hover:bg-[#BFA181]/10 transform hover:translate-y-[-4px]"
                >
                  View Our Work
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative">
                {/* Main image with animated border */}
                <div 
                  className="rounded-2xl overflow-hidden border-2 border-[#178582]/30 shadow-2xl transform rotate-2 transition-all duration-500 hover:rotate-0 hover:scale-105"
                  style={{ 
                    transform: `rotate(2deg) translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <img 
                    src={animatedImage}
                    alt="Our team at work" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828] to-transparent opacity-60"></div>
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#BFA181] rounded-lg transform rotate-12 opacity-80"></div>
                <div className="absolute -top-5 -right-5 w-24 h-24 border-4 border-[#178582] rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* About sections with tabs */}
        <div className={`relative mb-24 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Tabs navigation */}
          <div className="flex flex-wrap justify-center space-x-2 mb-12">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-[#178582] text-white shadow-lg shadow-[#178582]/20'
                    : 'bg-[#0F2336] text-gray-300 hover:bg-[#0F2336]/80 hover:text-white'
                }`}
                onClick={() => setActiveTab(key)}
              >
                {sections[key].title}
              </button>
            ))}
          </div>
          
          {/* Active section content */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">{sections[activeTab].title}</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {sections[activeTab].content}
            </p>
          </div>
        </div>
        
        {/* Core values section */}
        <div className={`relative mb-24 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide our work and define how we collaborate with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We're committed to excellence in every aspect of our work, from design to development to client communication.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "We stay at the forefront of design trends and technologies to deliver cutting-edge solutions.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Collaboration",
                description: "We work closely with our clients, viewing each engagement as a partnership focused on achieving shared goals.",
                icon: (
                  <svg className="w-8 h-8 text-[#BFA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`bg-[#0F2336]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#178582]/10 hover:border-[#178582]/30 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200 + 700}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0A1828] flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team section - MODIFIED FOR SMALLER CARDS */}
        <div className={`relative transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12 ">
            <h2 className="text-4xl font-bold text-white mb-4">Meet The Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Small but mighty, our two-person team brings complementary skills and a shared passion for excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 300 + 1000}ms` }}
              >
                <div className="bg-[#0F2336]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-[#178582]/10 hover:border-[#BFA181]/20 transition-all duration-500 hover:shadow-lg group">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-[180px] h-[200px] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#BFA181] text-sm mb-2">{member.role}</p>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        
        /* Add line clamp for text truncation */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AboutUsPage;