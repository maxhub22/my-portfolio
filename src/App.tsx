import React, { useState, useEffect } from 'react';
import { Play, Video, Monitor, Layers, Mail, Instagram, Facebook, Twitter, ChevronRight, ExternalLink, Camera, Linkedin, Youtube, Sparkles, Wand2, Loader2, Lightbulb, CheckCircle2 } from 'lucide-react';

const PortfolioLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiIdeas, setAiIdeas] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Contact Form State
  const [contactMessage, setContactMessage] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const apiKey = ""; // เว้นว่างไว้ Environment จะจัดการให้เอง

  // จัดการ Effect ตอนเลื่อนหน้าจอเพื่อเปลี่ยนสี Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gemini API: Generate Video Ideas
  const handleGenerateIdeas = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    setAiIdeas('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Act as a professional Video Creative Director. The user wants video ideas for: "${aiPrompt}". 
                Generate 3 creative, trendy, and distinct video production concepts in Thai language (ภาษาไทย). 
                Format nicely with emojis. Keep it short and punchy.`
              }]
            }]
          })
        }
      );
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "ขออภัย เกิดข้อผิดพลาดในการสร้างไอเดีย";
      setAiIdeas(text);
    } catch (error) {
      console.error("Error generating ideas:", error);
      setAiIdeas("ขออภัย ระบบ AI กำลังปรับปรุงชั่วคราว");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Gemini API: Refine Contact Message
  const handleRefineMessage = async () => {
    if (!contactMessage) return;
    setIsRefining(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Rewrite the following project inquiry message to be more professional, polite, and enthusiastic in Thai language. Make it sound like a client wanting to hire a video production team: "${contactMessage}"`
              }]
            }]
          })
        }
      );
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || contactMessage;
      setContactMessage(text);
    } catch (error) {
      console.error("Error refining message:", error);
    } finally {
      setIsRefining(false);
    }
  };

  // ข้อมูล Mock Data สำหรับ Rate Card
  const rateCard = [
    {
      title: 'Video Editing',
      price: '3,500',
      unit: 'เริ่มต้น / คลิป',
      features: ['ความยาวไม่เกิน 3 นาที', 'Color Grading พื้นฐาน', 'ใส่ Subtitle/Caption', 'เพลงประกอบถูกลิขสิทธิ์', 'แก้ไขได้ 2 ครั้ง'],
      recommended: false
    },
    {
      title: 'Full Production',
      price: '15,000',
      unit: 'เริ่มต้น / โปรเจกต์',
      features: ['ถ่ายทำนอกสถานที่ (1 คิว)', 'อุปกรณ์กล้อง 4K + ไฟ', 'ทีมงานมืออาชีพ', 'รวมค่าตัดต่อ + ทำสี', 'Motion Graphic Intro'],
      recommended: true
    },
    {
      title: 'Graphic Design',
      price: '2,000',
      unit: 'เริ่มต้น / ชิ้นงาน',
      features: ['ออกแบบ Banner/Ads', 'ไฟล์คุณภาพสูง (JPG/PNG)', 'ไดคัทภาพสินค้า', 'จัดวางองค์ประกอบศิลป์', 'แก้ไขได้ 3 ครั้ง'],
      recommended: false
    }
  ];

  // ข้อมูล Mock Data สำหรับ Portfolio
  const portfolioItems = [
    { id: 1, category: 'Video', title: 'Cinematic Travel Vlog', client: 'Travel Agency', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' },
    { id: 2, category: 'Graphic', title: 'Brand Identity Design', client: 'Tech Startup', image: 'https://images.unsplash.com/photo-1626785774573-4b7993125617?auto=format&fit=crop&q=80&w=800' },
    { id: 3, category: 'Video', title: 'Music Video Production', client: 'Indie Band', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' },
    { id: 4, category: 'Motion', title: 'Product Explainer', client: 'Cosmetic Brand', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
    { id: 5, category: 'Graphic', title: 'Social Media Kit', client: 'Coffee Shop', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
    { id: 6, category: 'Video', title: 'Documentary Short', client: 'NGO Organization', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?auto=format&fit=crop&q=80&w=800' },
  ];

  const filters = ['All', 'Video', 'Graphic', 'Motion'];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Google Font Import (Noto Sans Thai) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700;800;900&display=swap');
          
          /* Force apply font to everything */
          * {
            font-family: 'Noto Sans Thai', sans-serif !important;
          }
          
          .gradient-text {
            background: linear-gradient(to right, #a855f7, #06b6d4); /* Purple to Cyan */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .gradient-bg {
             background: linear-gradient(to right, #a855f7, #06b6d4); /* Purple to Cyan */
          }
          .gradient-border {
            position: relative;
            background: #0f172a;
            border-radius: 0.5rem;
          }
          .gradient-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: 0.6rem;
            background: linear-gradient(45deg, #a855f7, #06b6d4); /* Purple to Cyan */
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .gradient-border:hover::before {
            opacity: 1;
          }
          .profile-glow {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.3); /* Cyan glow */
          }
          .ai-card {
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-slate-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter">
            MY<span className="text-cyan-400">PORTFOLIO.</span>
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">เกี่ยวกับเรา</a>
            <a href="#services" className="hover:text-white transition-colors">บริการ</a>
            <a href="#portfolio" className="hover:text-white transition-colors">ผลงาน</a>
            <a href="#ai-lab" className="hover:text-white transition-colors text-cyan-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Lab</a>
            <a href="#rate-card" className="hover:text-white transition-colors">ราคา</a>
            <a href="#contact" className="hover:text-white transition-colors">ติดต่อ</a>
          </div>
          {/* Updated Button to Purple-Cyan Gradient */}
          <button className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white text-sm transition-all shadow-lg shadow-cyan-500/20 font-medium border-0">
            คุยงานกับเรา
          </button>
        </div>
      </nav>

      {/* Hero Section (About Me Style) */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            
            {/* Profile Image Area */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 gradient-bg profile-glow">
                {/* แก้ไขกลับเป็นรูป Unsplash เนื่องจาก Link Google Photos ไม่สามารถแสดงผลแบบ Public ได้ */}
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border-4 border-slate-950"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm">
                 <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-medium text-slate-300">Open for Work</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-cyan-400 font-medium tracking-wide uppercase mb-2 text-sm">Hello, I'm</h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-white">
                สุทิน มาลุน <br/>
                <span className="gradient-text text-3xl md:text-4xl">Suin Malun</span>
              </h1>
              <h3 className="text-2xl text-slate-300 mb-6 font-light">
                Video Creator & Graphic Designer
              </h3>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                สวัสดีครับ ผมเป็นครีเอเตอร์ที่หลงใหลในการเล่าเรื่องผ่านงานวิดีโอและการออกแบบกราฟิก 
                มีประสบการณ์กว่า 5 ปีในการเปลี่ยนไอเดียให้กลายเป็นภาพเคลื่อนไหวที่น่าจดจำ 
                เชี่ยวชาญโปรแกรม Adobe Premiere Pro และ After Effects
              </p>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300">
                        <Youtube className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300">
                        <Linkedin className="w-5 h-5" />
                    </a>
                 </div>
                 
                 <div className="h-px w-10 bg-slate-700 hidden sm:block"></div>
                 
                 <a href="#portfolio" className="text-white border-b border-cyan-500 hover:text-cyan-400 transition-colors pb-0.5 text-sm font-medium flex items-center">
                    ดูผลงานทั้งหมด <ChevronRight className="w-4 h-4 ml-1" />
                 </a>
              </div>
            </div>

          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-cyan-500 rounded-full"></div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-950 relative border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">บริการของเรา</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Video Production</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                รับถ่ายทำวิดีโอโฆษณา, ไวรัลคลิป, งานอีเว้นท์ และ Music Video ด้วยอุปกรณ์คุณภาพสูง ระดับ 4K
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Post-Production</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                บริการตัดต่อวิดีโอ Color Grading และใส่ Sound Effect ให้งานของคุณลื่นไหล น่าติดตาม
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Motion & Graphic</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                ออกแบบกราฟิก, Motion Graphics, Intro/Outro และ Visual Effect เพิ่มลูกเล่นให้วิดีโอ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Banner */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 items-center text-center md:text-left">
            <div>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Projects Done</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-white">3 Years</p>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Experience</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Satisfaction</p>
            </div>
            <div className="hidden md:block h-10 w-px bg-slate-800"></div>
            <div className="flex items-center gap-4">
               <span className="text-slate-400 text-sm">Tools We Use:</span>
               <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all items-center">
                  {/* Software Icons */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1024px-Adobe_Premiere_Pro_CC_icon.svg.png" 
                    alt="Premiere Pro" 
                    className="w-9 h-9 object-contain" 
                    title="Adobe Premiere Pro"
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/1024px-Adobe_After_Effects_CC_icon.svg.png" 
                    alt="After Effects" 
                    className="w-9 h-9 object-contain" 
                    title="Adobe After Effects"
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1024px-Adobe_Photoshop_CC_icon.svg.png" 
                    alt="Photoshop" 
                    className="w-9 h-9 object-contain" 
                    title="Adobe Photoshop"
                  />
                  {/* CapCut icon removed */}
               </div>
            </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">ผลงานล่าสุด <span className="text-cyan-500">.</span></h2>
              <p className="text-slate-400">รวมผลงานที่เราภูมิใจนำเสนอ</p>
            </div>
            
            {/* Filters */}
            <div className="mt-6 md:mt-0 flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {filters.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === category
                      ? 'bg-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group gradient-border p-1 overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-video bg-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.client}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: AI Creative Lab */}
      <section id="ai-lab" className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">AI Idea Lab <span className="text-cyan-400">✨</span></h2>
            <p className="text-slate-400 max-w-xl">
              คิดไม่ออก? บอก Gemini! ลองพิมพ์ประเภทธุรกิจหรือสินค้าของคุณ แล้วให้ AI ช่วยเสนอคอนเซปต์วิดีโอให้คุณฟรีๆ
            </p>
          </div>

          <div className="max-w-4xl mx-auto ai-card rounded-2xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="เช่น ร้านกาแฟสไตล์มินิมอล, แบรนด์เสื้อผ้าแนวสตรีท, แอพสอนภาษาอังกฤษ" 
                className="flex-1 bg-slate-950/50 border border-slate-700 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder-slate-500"
              />
              <button 
                onClick={handleGenerateIdeas}
                disabled={isAiLoading || !aiPrompt}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 min-w-[160px] shadow-lg shadow-cyan-500/20"
              >
                {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Lightbulb className="w-5 h-5" /> คิดไอเดีย</>}
              </button>
            </div>

            {aiIdeas && (
              <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ผลลัพธ์จาก AI:
                </h3>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {aiIdeas}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section id="rate-card" className="py-24 bg-slate-950 relative border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rate Card <span className="text-cyan-500">.</span></h2>
            <p className="text-slate-400">แพ็กเกจราคาเริ่มต้น สำหรับการจ้างงาน</p>
            <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rateCard.map((pkg, index) => (
              <div key={index} className={`relative p-8 rounded-2xl border ${pkg.recommended ? 'border-cyan-500 bg-slate-900/80 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'border-slate-800 bg-slate-900/30'} flex flex-col transition-all hover:-translate-y-2`}>
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 text-white">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-sm text-slate-400">เริ่มต้น</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-cyan-400">฿{pkg.price}</span>
                    <span className="text-sm text-slate-500 mb-1">/ {pkg.unit}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className={`w-full py-3 rounded-xl text-center font-semibold transition-all ${pkg.recommended ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                  สนใจจ้างงาน
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
        {/* Bg Decoration */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                พร้อมที่จะเริ่มโปรเจกต์<br/>
                <span className="gradient-text">ถัดไปของคุณหรือยัง?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
                หากคุณกำลังมองหาทีมงานคุณภาพเพื่อสร้างสรรค์ผลงานวิดีโอและกราฟิก ติดต่อเราเพื่อขอใบเสนอราคาได้เลย
              </p>
              
              <div className="flex flex-col gap-4 items-center md:items-start">
                <div className="flex items-center text-slate-300 hover:text-white transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4 text-cyan-500">
                        <Mail className="w-5 h-5" />
                    </div>
                    contact@yourstudio.com
                </div>
                <div className="flex space-x-4 mt-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-purple-500 hover:text-purple-500 flex items-center justify-center transition-all">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-500 hover:text-cyan-500 flex items-center justify-center transition-all">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="ชื่อของคุณ" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-sm" />
                    <input type="email" placeholder="อีเมล" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-sm" />
                </div>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-slate-400 text-sm">
                    <option>สนใจบริการด้านใด?</option>
                    <option>Video Production</option>
                    <option>Video Editing</option>
                    <option>Graphic Design</option>
                </select>
                <div className="relative">
                  <textarea 
                    rows={4} 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="รายละเอียดโปรเจกต์เบื้องต้น (พิมพ์สั้นๆ แล้วกดปุ่มไม้กายสิทธิ์เพื่อขยายความได้เลย!)" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-sm pb-10"
                  ></textarea>
                  
                  {/* AI Refine Button */}
                  <button 
                    type="button"
                    onClick={handleRefineMessage}
                    disabled={isRefining || !contactMessage}
                    className="absolute bottom-3 right-3 text-xs flex items-center gap-1 px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 rounded-md transition-colors border border-cyan-500/30 disabled:opacity-50"
                    title="ให้ AI ช่วยเรียบเรียงข้อความ"
                  >
                    {isRefining ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} 
                    {isRefining ? 'กำลังเขียน...' : 'ให้ AI ช่วยเขียน'}
                  </button>
                </div>
                
                <button type="button" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all shadow-lg shadow-cyan-500/20">
                  ส่งข้อความหาเรา
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-center text-slate-500 text-sm">
        <p>© 2024 Your Studio Name. All rights reserved.</p>
        <p className="mt-2 text-xs text-slate-600">Design with ❤️ for Creators</p>
      </footer>
    </div>
  );
};

export default PortfolioLanding;