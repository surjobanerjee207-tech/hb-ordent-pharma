import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, MessageCircle, Clock, CheckCircle2, AlertCircle, Pill, Heart, Package, Star, ChevronRight, Facebook, Share2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { MapView } from "@/components/Map";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showMedicines, setShowMedicines] = useState(false);
  const medicinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Trigger medicine animation when scrolling past 30% of page
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowMedicines(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919876543210";
    const message = "Hi HB Ordent Pharma, I need medicine inquiry";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleDirections = () => {
    const mapSection = document.getElementById("contact");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = (platform: string) => {
    const pageUrl = window.location.href;
    const pageTitle = "HB Ordent Pharma - 24×7 Pharmacy in Kadma, Jamshedpur";
    const pageDescription = "Quality medicines, healthcare products, and emergency support available round the clock. Your trusted pharmacy for every health need.";

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(pageTitle + " " + pageUrl)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(135deg, #f0fffe 0%, #f0f9ff 50%, #fef3c7 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(135deg, #f0fffe 0%, #f0f9ff 50%, #fef3c7 100%)',
        backgroundAttachment: 'fixed'
      }}></div>

      {/* Medicine Spilling Animation */}
      {showMedicines && (
        <div className="medicine-container">
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const colors = ['pill-red', 'pill-blue', 'pill-green', 'pill-yellow', 'pill-purple', 'pill-pink', 'pill-orange', 'pill-cyan'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 12 + Math.random() * 8;
            
            return (
              <div
                key={i}
                className={`medicine-pill animate ${color}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: '40px',
                  top: '60px',
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  animationDelay: `${i * 0.1}s`
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      )}

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      } animate-fade-in`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HB Ordent Pharma" className="h-10 w-10" />
            <span className="font-bold text-lg text-emerald-700">HB Ordent</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition animate-fade-up delay-100">Services</a>
            <a href="#why-us" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition animate-fade-up delay-200">Why Us</a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition animate-fade-up delay-300">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={handleCall} size="sm" variant="outline" className="hidden sm:inline-flex">
              <Phone className="w-4 h-4 mr-2" /> Call
            </Button>
            <Button onClick={handleWhatsApp} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold animate-fade-up">
                ✓ Open 24 Hours
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {['24×7', 'Pharmacy', 'Service', 'in', 'Kadma,', 'Jamshedpur'].map((word, idx) => (
                  <span key={idx} className="inline-block mr-2 animate-word-pop" style={{ animationDelay: `${200 + idx * 100}ms` }}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed animate-text-reveal delay-700">
                Quality medicines, healthcare products, and emergency support available round the clock. Your trusted pharmacy for every health need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-up delay-800">
                <Button onClick={handleCall} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white animate-scale-in delay-900">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
                <Button onClick={handleWhatsApp} size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 animate-scale-in delay-1000">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Inquiry
                </Button>
                <Button onClick={handleDirections} size="lg" variant="outline" className="border-gray-300 animate-scale-in delay-1100">
                  <MapPin className="w-5 h-5 mr-2" /> Get Directions
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="/hero.png" alt="Pharmacy" className="rounded-2xl shadow-2xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About HB Ordent Pharma</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Serving the Kadma community with genuine medicines and trusted healthcare support since 2010.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Open 24 Hours", desc: "Round-the-clock availability" },
              { icon: CheckCircle2, title: "Genuine Medicines", desc: "100% authentic products" },
              { icon: AlertCircle, title: "Fast Service", desc: "Quick assistance always" },
              { icon: Star, title: "Trusted Local", desc: "Community favorite" }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow glass-card animate-fade-up" style={{animationDelay: `${idx * 100}ms`}}>
                <item.icon className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Everything you need for your health and wellness</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Pill,
                title: "Prescription Medicines",
                desc: "Upload your prescription via WhatsApp and get your medicines delivered or ready for pickup.",
                image: "/prescription-service.png"
              },
              {
                icon: AlertCircle,
                title: "Emergency Medicine Support",
                desc: "24×7 availability for urgent medicine needs. We're always here when you need us most.",
                image: "/emergency-medicine.png"
              },
              {
                icon: Heart,
                title: "Health Products",
                desc: "Vitamins, supplements, and personal care items for your complete wellness.",
                image: "/health-products.png"
              }
            ].map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <service.icon className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Learn More <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Why Choose HB Ordent Pharma?</h2>
              <div className="space-y-4">
                {[
                  "Open 24 Hours - Medicine when you need it",
                  "Genuine Products - 100% authentic medicines",
                  "Convenient Location - Easy access in Kadma",
                  "Quick Response - Fast assistance always",
                  "Friendly Support - Caring healthcare team",
                  "Local Trusted Store - Community favorite"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl p-8 text-center">
              <Clock className="w-24 h-24 text-emerald-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Always Open</h3>
              <p className="text-xl text-gray-700 mb-6">24 Hours a Day, 7 Days a Week</p>
              <p className="text-gray-600">No matter what time you need us, we're here for you. Emergency or routine, we've got you covered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card className="p-8 h-full glass-card">
                <h3 className="font-bold text-2xl mb-6">Our Location</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">Holding No-2, Maity Bhawan, Uliyan Main Rd, Opposite Brahmalok Dham, Bhatia Colony, Kadma, Jamshedpur, Jharkhand 831005</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Hours</p>
                      <p className="text-gray-600">Open 24 Hours, 7 Days a Week</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button onClick={handleCall} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                  <Button onClick={handleWhatsApp} className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                  <Button onClick={handleDirections} variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" /> Get Directions
                  </Button>
                </div>
              </Card>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-96">
              <MapView
                initialCenter={{ lat: 22.8046, lng: 86.2015 }}
                initialZoom={15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Are you open 24 hours?", a: "Yes, we operate 24×7. Whether it's day or night, we're always available to serve you." },
              { q: "Can I check medicine availability online?", a: "Yes! You can WhatsApp us with the medicine name, and we'll confirm availability immediately." },
              { q: "Do you accept prescriptions?", a: "Absolutely! You can upload your prescription via WhatsApp, and we'll prepare your medicines." },
              { q: "Do you stock branded and generic medicines?", a: "Yes, we stock both branded and generic medicines to suit your needs and budget." }
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 hover:shadow-md transition glass-card">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Customer Reviews Section */}
          <div className="mb-16 pb-12 border-b border-gray-800">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-up">What Our Customers Say</h2>
            <p className="text-center text-gray-400 mb-12 animate-fade-up delay-100">Trusted by thousands of satisfied customers across Kadma and Jamshedpur</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Kumar",
                  rating: 5,
                  review: "Excellent service! They are always available 24/7 and the staff is very helpful. Got my medicines delivered at midnight without any hassle.",
                  avatar: "RK"
                },
                {
                  name: "Priya Sharma",
                  rating: 5,
                  review: "Best pharmacy in Kadma. Quality medicines, fair prices, and quick service. I've been a loyal customer for 3 years now.",
                  avatar: "PS"
                },
                {
                  name: "Amit Patel",
                  rating: 4,
                  review: "Great experience! The pharmacist explained everything clearly. Only minor issue was a slight wait during peak hours, but totally worth it.",
                  avatar: "AP"
                },
                {
                  name: "Sneha Gupta",
                  rating: 5,
                  review: "Amazing! They helped me find the right medicine for my condition. Very knowledgeable staff and genuine products.",
                  avatar: "SG"
                },
                {
                  name: "Vikram Singh",
                  rating: 5,
                  review: "24/7 availability is a lifesaver! Got emergency medicines at 3 AM. Highly recommended for everyone in the area.",
                  avatar: "VS"
                },
                {
                  name: "Ananya Das",
                  rating: 4,
                  review: "Good pharmacy with genuine medicines and competitive prices. WhatsApp service is very convenient for ordering.",
                  avatar: "AD"
                }
              ].map((review, idx) => (
                <Card key={idx} className="p-6 glass-card animate-fade-up" style={{ animationDelay: `${200 + idx * 100}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Sharing Section */}
          <div className="mb-12 pb-8 border-b border-gray-800">
            <h3 className="font-semibold text-lg mb-6 text-center">Share HB Ordent Pharma</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                <Facebook className="w-5 h-5" /> Facebook
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="HB Ordent Pharma" className="h-8 w-8" />
                <span className="font-bold text-lg">HB Ordent Pharma</span>
              </div>
              <p className="text-gray-400">Your trusted 24×7 pharmacy in Kadma, Jamshedpur.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-emerald-400 transition">Services</a></li>
                <li><a href="#why-us" className="hover:text-emerald-400 transition">Why Us</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +91 98765 43210</li>
                <li>Hours: 24/7</li>
                <li><a href="https://wa.me/919876543210" className="hover:text-emerald-400 transition">WhatsApp Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Address</h4>
              <p className="text-gray-400 text-sm">Holding No-2, Maity Bhawan, Uliyan Main Rd, Kadma, Jamshedpur, Jharkhand 831005</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HB Ordent Pharma. All rights reserved. | Your trusted 24×7 pharmacy in Kadma, Jamshedpur.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
