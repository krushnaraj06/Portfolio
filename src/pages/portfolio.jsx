import React, { useState, useEffect, useRef } from 'react';

const PortfolioPage = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  
  // Project data with your actual projects
  const projects = [
    {
      id: 1,
      title: "Wadhwa Events",
      description: "A comprehensive event management platform featuring seamless booking, interactive galleries, and dedicated service showcases.",
      category: "Web Development",
      status: "completed",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Tailwind CSS"],
      url: "https://wadhwaevents.com/",
      features: [
        "Modern responsive design with elegant UI/UX",
        "Event booking and management system",
        "Interactive photo gallery",
        "Service showcases with detailed information"
      ],
      color: "#E83A3A"
    },
    {
      id: 2,
      title: "Mobikoo",
      description: "An innovative e-commerce platform for mobile accessories with advanced product filtering and a seamless checkout experience.",
      category: "E-commerce",
      status: "completed",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Next.js", "MongoDB", "Stripe"],
      url: "https://mobikoo.com/",
      features: [
        "Dynamic product catalog with advanced filtering",
        "Secure payment integration",
        "User accounts and order tracking",
        "Responsive design for all devices",
        "Admin dashboard for inventory management"
      ],
      color: "#4D61FC"
    },
    {
      id: 3,
      title: "SPS Portfolio",
      description: "A sleek, modern portfolio website showcasing professional services and projects with elegant animations and interactive elements.",
      category: "UI/UX Design",
      status: "completed",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      url: "https://sps-self.vercel.app/",
      features: [
        "Smooth scroll animations and transitions",
        "Interactive project showcases",
        "Optimized performance metrics",
        "Contact form integration"
      ],
      color: "#F7B733"
    },
    {
      id: 4,
      title: "JPEL 2.0",
      description: "A sophisticated web application with advanced features for data visualization and interactive user dashboards.",
      category: "Web Application",
      status: "completed",
      image: "/api/placeholder/600/400",
      technologies: ["React", "D3.js", "Firebase", "Material UI"],
      url: "https://jpel2.vercel.app/",
      features: [
        "Complex data visualization components",
        "Real-time data updates",
        "User authentication and profiles",
        "Advanced filtering and search capabilities",
        "Responsive layout for all screen sizes"
      ],
      color: "#11C5C6"
    },
    {
      id: 5,
      title: "Creative Agency Platform",
      description: "A comprehensive platform for creative agencies to manage clients, projects, and team collaboration.",
      category: "SaaS",
      status: "completed",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      url: "#",
      features: [
        "Project management dashboard",
        "Client portal with separate access",
        "Team collaboration tools",
        "Resource allocation",
        "Time tracking and reporting"
      ],
      color: "#9B51E0"
    },
    {
      id: 6,
      title: "Health & Fitness App",
      description: "An innovative mobile-first application for health tracking, workout planning, and nutrition guidance.",
      category: "Mobile App",
      status: "in-progress",
      image: "/api/placeholder/600/400",
      technologies: ["React Native", "Firebase", "Node.js", "Express"],
      url: "#",
      features: [
        "Personalized workout plans",
        "Nutrition tracking and meal suggestions",
        "Progress visualization",
        "Community challenges and support",
        "Integration with health devices"
      ],
      completion: 65,
      color: "#2DCA72"
    },
    {
      id: 7,
      title: "Financial Dashboard",
      description: "A powerful financial analytics platform with real-time data visualization and predictive modeling.",
      category: "FinTech",
      status: "in-progress",
      image: "/api/placeholder/600/400",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
      url: "#",
      features: [
        "Real-time financial data tracking",
        "Predictive analytics modeling",
        "Custom report generation",
        "Multi-user access with role-based permissions",
        "Data export and integration capabilities"
      ],
      completion: 40,
      color: "#F2994A"
    }
  ];
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'completed', label: 'Completed' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'E-commerce', label: 'E-commerce' },
    { id: 'UI/UX Design', label: 'UI/UX Design' },
    { id: 'SaaS', label: 'SaaS' },
    { id: 'Mobile App', label: 'Mobile App' },
    { id: 'FinTech', label: 'FinTech' }
  ];
  
  // Update cursor position for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Intersection observer for animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('portfolio');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsInView(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'completed' || activeFilter === 'in-progress') {
      setFilteredProjects(projects.filter(project => project.status === activeFilter));
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);
  
  // Initialize filtered projects with all projects
  useEffect(() => {
    setFilteredProjects(projects);
  }, []);
  
  // Open project details modal
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  // Close project details modal
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Custom cursor component
  const CustomCursor = () => {
    const cursorRef = useRef();
    
    useEffect(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
      }
    }, [cursorPosition]);
    
    return (
      <div 
        ref={cursorRef} 
        className={`fixed w-20 h-20 rounded-full pointer-events-none mix-blend-difference z-50 transition-all duration-100 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          hoveredProject ? 'bg-white scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
        }`}
      >
        <span className="text-black font-bold text-sm">VIEW</span>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0A1828] overflow-hidden">
      <CustomCursor />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#178582]/5 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#BFA181]/5 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full border border-[#178582]/10 animate-pulse-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 backdrop-blur-sm bg-[#BFA181]/5 rounded-full animate-float"></div>
        </div>
        
        {/* Section header */}
        <div className={`relative z-10 mb-24 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-block mb-3">
                <span className="inline-block py-1 px-3 bg-[#178582]/10 rounded-full text-[#178582] text-sm font-medium">
                  Our Work
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Featured <span className="text-[#BFA181]">Projects</span>
              </h2>
              <p className="max-w-2xl text-gray-300 text-lg">
                Explore our portfolio of successful projects, 
                each reflecting our commitment to quality, innovation, and attention to detail.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-6 md:space-x-10 text-right">
              <div>
                <span className="block text-4xl font-bold text-[#BFA181]">{projects.length}</span>
                <span className="text-gray-400 text-sm">Projects</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-[#BFA181]">
                  {projects.filter(p => p.status === 'completed').length}
                </span>
                <span className="text-gray-400 text-sm">Completed</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-[#BFA181]">
                  {projects.filter(p => p.status === 'in-progress').length}
                </span>
                <span className="text-gray-400 text-sm">In Progress</span>
              </div>
            </div>
          </div>
          
          {/* Horizontal line */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#178582]/30 to-transparent"></div>
        </div>
        
        {/* Filter tabs */}
        <div className={`sticky top-0 z-20 bg-[#0A1828]/80 backdrop-blur-md py-4 mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-[#178582] text-white shadow-lg shadow-[#178582]/20'
                    : 'bg-[#0F2336] text-gray-300 hover:bg-[#0F2336]/80 hover:text-white'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
       {/* Projects showcase with vertical layout and increased height */}
<div ref={projectsRef} className="flex flex-col gap-8">
  {filteredProjects.map((project, index) => {
    return (
      <div 
        key={project.id}
        className={`w-full transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div 
          className="group relative overflow-hidden rounded-2xl border border-[#178582]/10 bg-[#0F2336]/50 backdrop-blur-sm transition-all duration-500 hover:border-[#178582]/30"
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => openProjectDetails(project)}
        >
          {/* Project image with overlay - increased height */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Fixed gradient overlay - always visible with enhanced opacity on hover */}
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{ 
                background: `linear-gradient(210deg, ${project.color}22 0%, ${project.color}88 100%)`,
                opacity: hoveredProject === project.id ? '0.9' : '0.8',
              }}
            ></div>
            
            {/* Status badge */}
            <div className={`absolute top-4 left-4 py-1 px-3 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
              project.status === 'completed' 
                ? 'bg-green-500/60' 
                : 'bg-amber-500/60'
            }`}>
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </div>
            
            {/* Category badge */}
            <div className="absolute top-4 right-4 py-1 px-3 rounded-full bg-black/30 text-xs font-medium text-white backdrop-blur-sm">
              {project.category}
            </div>
            
            {/* Tech tags */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs bg-black/30 text-white py-1 px-2 rounded backdrop-blur-sm">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs bg-black/30 text-white py-1 px-2 rounded backdrop-blur-sm">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
            
            {/* Fixed overlay content - with better visibility transitions */}
            <div 
              className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center transition-all duration-500 bg-black/10 backdrop-blur-sm"
              style={{
                opacity: hoveredProject === project.id ? '1' : '0',
                transform: hoveredProject === project.id ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow">{project.title}</h3>
              <p className="text-white/90 md:max-w-2xl text-lg mb-6 text-shadow-sm">{project.description}</p>
              <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-md">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            
            
            {/* Progress bar for in-progress projects */}
            {project.status === 'in-progress' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>
        
        {/* CTA section */}
        <div className={`mt-32 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1828] via-[#0F2336] to-[#178582]/20"></div>
              <div className="absolute inset-0 backdrop-blur-sm"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <svg className="absolute top-0 right-0 w-1/2 h-full text-[#178582]/5 transform rotate-180" fill="currentColor" viewBox="0 0 200 200">
                  <path d="M36.8,-48.1C47.6,-36.2,56.3,-24.1,61.4,-9.7C66.5,4.8,68,21.5,61.1,34.9C54.3,48.3,38.9,58.3,22.7,64.1C6.4,69.9,-10.8,71.4,-25.8,66.1C-40.8,60.9,-53.7,48.8,-60.1,34.1C-66.6,19.4,-66.7,2,-63,-14.2C-59.3,-30.4,-51.8,-45.5,-40.2,-57.2C-28.5,-68.9,-14.3,-77.3,-0.6,-76.5C13,-75.7,26,-60,36.8,-48.1Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full border border-[#BFA181]/10 animate-pulse-slow"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-8 py-16 md:p-16 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-10 md:mb-0 md:pr-10">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to bring your vision to life?</h3>
                <p className="text-xl text-gray-300 mb-8">
                  Let's collaborate to create something exceptional together. Our team is ready to transform your ideas into reality.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-[#178582] hover:bg-[#178582]/90 text-white font-medium rounded-lg transition-all transform hover:translate-y-[-4px] hover:shadow-xl group"
                >
                  Start a Project
                  <svg
                    className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-40 h-40 md:w-56 md:h-56 relative">
                  <div className="w-full h-full rounded-full border-2 border-[#BFA181]/30 animate-spin-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border-2 border-[#178582]/30 animate-spin-slow-reverse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border-2 border-white/10 flex items-center justify-center text-white text-lg font-bold">
                    Let's Talk
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
   {/* Project details modal - Improved visibility */}
{selectedProject && (
  <div 
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md overflow-y-auto"
    onClick={closeProjectDetails}
  >
    <div 
      className="bg-[#0F2336] rounded-2xl w-full max-w-5xl overflow-hidden relative my-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button - positioned for better visibility */}
      <button 
        onClick={closeProjectDetails}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-20"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal header with image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={selectedProject.image} 
            alt={selectedProject.title} 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(to bottom, ${selectedProject.color}22, ${selectedProject.color}88, #0F2336)` 
            }}
          ></div>
        </div>
        
        {/* Project title overlay - More visible */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-sm py-1 px-2 bg-[#178582]/30 backdrop-blur-sm rounded text-white mb-2 inline-block">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-shadow">{selectedProject.title}</h2>
            </div>
            <div className={`${
              selectedProject.status === 'completed' 
                ? 'bg-green-500/70' 
                : 'bg-amber-500/70'
            } backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium text-white`}>
              {selectedProject.status === 'completed' ? 'Completed' : 'In Progress'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal content - Improved structure and spacing */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#BFA181] mb-4">Project Overview</h3>
              <p className="text-gray-200 text-lg leading-relaxed">{selectedProject.description}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#BFA181] mb-4">Key Features</h3>
              <ul className="space-y-4 text-gray-200">
                {selectedProject.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div 
                      className="flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${selectedProject.color}44` }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" style={{ color: "#ffffff" }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#BFA181] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-[#0A1828] text-gray-200 py-2 px-4 rounded-lg border border-[#178582]/30"
                    style={{ backgroundColor: `${selectedProject.color}22` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Progress indicator for in-progress projects */}
            {selectedProject.status === 'in-progress' && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#BFA181] mb-4">Completion Status</h3>
                <div className="w-full bg-[#0A1828] h-6 rounded-full overflow-hidden">
                  <div 
                    className="h-full relative flex items-center justify-center"
                    style={{ 
                      width: `${selectedProject.completion}%`,
                      backgroundColor: selectedProject.color
                    }}
                  >
                    <span className="absolute text-xs font-medium text-white">{selectedProject.completion}%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>Project Started</span>
                  <span>Target Completion</span>
                </div>
              </div>
            )}
            
            {/* Action buttons - Improved design */}
            <div className="mt-8 flex flex-col">
              <a 
                href={selectedProject.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-8 py-4 rounded-xl text-center text-white font-medium transition-all transform hover:translate-y-[-4px] hover:shadow-lg flex items-center justify-center"
                style={{ backgroundColor: selectedProject.color }}
              >
                <span>Visit Live Project</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-6-4l6-6m0 0h-6m6 0v6" />
                </svg>
              </a>
              
              <button 
                onClick={closeProjectDetails}
                className="mt-4 w-full px-8 py-4 rounded-xl text-center text-white font-medium transition-all transform hover:translate-y-[-4px] hover:shadow-lg border border-[#178582] hover:bg-[#178582]/20"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default PortfolioPage;