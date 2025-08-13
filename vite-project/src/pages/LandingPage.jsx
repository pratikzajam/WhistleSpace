import React, { useState, useEffect } from 'react';
import { Shield, MessageCircle, Users, Lock, CheckCircle, Star, ArrowRight, Menu, X, UserCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

// Simple animation hook for scroll-triggered animations
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState(null);


  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isInView];
};

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

export default function WhistleSpaceLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  var Navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Anonymous",
      description: "Complete privacy protection with zero tracking. Your identity remains secure."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Smart Categorization",
      description: "Organize feedback with intelligent tagging and filtering systems."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Admin Dashboard",
      description: "Powerful moderation tools with real-time insights and analytics."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with end-to-end encryption."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "HR Director, TechCorp",
      content: "WhistleSpace transformed our workplace culture. Employees feel safe sharing concerns.",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Principal, Lincoln High",
      content: "An invaluable tool for creating a safer school environment. Highly recommended.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Startup Founder",
      content: "The anonymous feedback helped us identify and fix critical issues early.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              WhistleSpace
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>

            {/* Auth Buttons in Navigation */}
            <div className="flex items-center space-x-3">
              <button onClick={() => { Navigate("/userlogin") }} className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all group">
                <UserCircle className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm">User Login</span>
              </button>
              <button onClick={() => { Navigate("/login") }} className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all group">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Admin Login</span>
              </button>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-lg p-6 space-y-4">
            <a href="#features" className="block hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="block hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#contact" className="block hover:text-blue-400 transition-colors">Contact</a>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button onClick={() => { Navigate("/loginuser") }} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all">
                <UserCircle className="w-4 h-4" />
                <span>User Login</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                <Settings className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ${heroInView ? 'animate-pulse' : ''}`}></div>
            <div className={`absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1500 ${heroInView ? 'animate-pulse' : ''}`}></div>
          </div>

          <div className={`relative z-10 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">Trusted by 500+ Organizations</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Anonymous Feedback
              </span>
              <br />
              <span className="text-white">Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Empower your organization with a secure, anonymous feedback platform.
              Build trust, improve culture, and create positive change.
            </p>

            {/* Enhanced Hero CTAs */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Quick Access Auth Section */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">For Users</h3>
                <p className="text-gray-300 text-sm mb-4">Submit anonymous feedback securely</p>
                <button onClick={() => { Navigate("/userlogin") }} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 transition-all group-hover:scale-105">
                  <UserCircle className="w-4 h-4" />
                  <span>Access Portal</span>
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">For Admins</h3>
                <p className="text-gray-300 text-sm mb-4">Manage and review feedback</p>
                <button onClick={() => { Navigate("/login") }} className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-all group-hover:scale-105">
                  <Settings className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { label: "Organizations", value: 500 },
                { label: "Anonymous Reports", value: 10000 },
                { label: "Issues Resolved", value: 8500 },
                { label: "Satisfaction Rate", value: 98 }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                    {statsInView ? <AnimatedCounter end={stat.value} /> : 50}
                    {stat.label === "Satisfaction Rate" && "%"}
                    {stat.label !== "Satisfaction Rate" && "+"}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create a safe, transparent feedback environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl border border-white/10 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trusted Globally
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
              Join thousands of organizations creating safer, more transparent environments
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What People Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-blue-400">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Auth Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Start your free trial today and create a safer, more transparent environment for everyone.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Dedicated Auth Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">User Portal</h3>
                  <p className="text-gray-300 text-sm">Submit feedback anonymously</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>100% Anonymous submissions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Secure encrypted communication</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Real-time status updates</span>
                </li>
              </ul>
              <button onChange={() => { Navigate("/userlogin") }} className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <UserCircle className="w-5 h-5" />
                <span>Access User Portal</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600/10 to-purple-800/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">Admin Dashboard</h3>
                  <p className="text-gray-300 text-sm">Manage your organization</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Advanced analytics & insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Case management tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Team collaboration features</span>
                </li>
              </ul>
              <button onChange={()=>{Navigate("/login")}} className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">WhistleSpace</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 WhistleSpace. All rights reserved.</p>
              <p className="text-sm mt-1">Building trust through transparency.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}