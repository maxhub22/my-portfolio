import { useState, useEffect } from 'react';
import { Video, Monitor, Layers, Mail, Instagram, Facebook, Twitter, ChevronRight, ExternalLink, Linkedin, Youtube, Sparkles, Wand2, Loader2, Lightbulb, CheckCircle2 } from 'lucide-react';

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

  // ---------------------------------------------------------
  // 🔑 ใส่ GEMINI API KEY ของคุณตรงนี้
  // ---------------------------------------------------------
  const apiKey = ""; // <--- นำรหัส AIza... ของคุณมาใส่ตรงนี้เมื่อนำไปใช้จริง

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
    
    // ตรวจสอบ API Key (สำหรับแจ้งเตือนใน Localhost)
    if (!apiKey) {
       console.warn("Warning: API Key is empty. Please check your code.");
    }

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
      if (data.error) {
         throw new Error(data.error.message);
      }
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "ขออภัย เกิดข้อผิดพลาดในการสร้างไอเดีย";
      setAiIdeas(text);
    } catch (error) {
      console.error("Error generating ideas:", error);
      setAiIdeas("ขออภัย ระบบ AI กำลังปรับปรุงชั่วคราว หรือ API Key ไม่ถูกต้อง");
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
      if (data.error) {
         throw new Error(data.error.message);
      }
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

  // ข้อมูล Skill Tools
  const skills = [
    { name: 'Premiere Pro', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1024px-Adobe_Premiere_Pro_CC_icon.svg.png', color: 'border-purple-500', shadow: 'shadow-purple-500/50' },
    { name: 'After Effects', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/1024px-Adobe_After_Effects_CC_icon.svg.png', color: 'border-indigo-500', shadow: 'shadow-indigo-500/50' },
    { name: 'Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1024px-Adobe_Photoshop_CC_icon.svg.png', color: 'border-blue-500', shadow: 'shadow-blue-500/50' },
    { name: 'CapCut', icon: 'https://play-lh.googleusercontent.com/NafAciugdQk6L7_D0cmNq8cypX0pvA88h9DzlxIJQbPd3caZM3_S5-nZedHdnrcq_wCm=w240-h480-rw', color: 'border-white', shadow: 'shadow-white/30' },
    { name: 'Canva', icon: 'https://raw.githubusercontent.com/maxhub22/my-portfolio/refs/heads/main/image/Canva.png', color: 'border-cyan-400', shadow: 'shadow-cyan-400/50' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Google Font Import (Noto Sans Thai) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700;800;900&display=swap');
          
          /* Force apply font to everything */
          * {
            font-family: 'Noto Sans Thai', sans-serif !important;
          }
          
          .gradient-text {
            background: linear-gradient(to right, #f43f5e, #3b82f6); /* Rose to Blue */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .gradient-bg {
             background: linear-gradient(to right, #f43f5e, #3b82f6); /* Rose to Blue */
          }
          .gradient-border {
            position: relative;
            background: #121212; /* Neutral Dark Grey */
            border-radius: 0.5rem;
          }
          .gradient-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: 0.6rem;
            background: linear-gradient(45deg, #f43f5e, #3b82f6); /* Rose to Blue */
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .gradient-border:hover::before {
            opacity: 1;
          }
          .profile-glow {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3); /* Blue glow */
          }
          .ai-card {
            background: linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 shadow-lg border-b border-[#262626]' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter">
            MY<span className="text-blue-500">PORTFOLIO.</span>
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">เกี่ยวกับเรา</a>
            <a href="#skills" className="hover:text-white transition-colors">ทักษะ</a>
            <a href="#portfolio" className="hover:text-white transition-colors">ผลงาน</a>
            <a href="#ai-lab" className="hover:text-white transition-colors text-blue-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Lab</a>
            <a href="#rate-card" className="hover:text-white transition-colors">ราคา</a>
            <a href="#contact" className="hover:text-white transition-colors">ติดต่อ</a>
          </div>
          {/* Updated Button to Red-Blue Gradient */}
          <button className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-blue-600 hover:opacity-90 text-white text-sm transition-all shadow-lg shadow-blue-600/20 font-medium border-0">
            คุยงานกับเรา
          </button>
        </div>
      </nav>

      {/* Hero Section (About Me Style) */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
        {/* Background Gradient Blobs - Red & Blue */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            
            {/* Profile Image Area */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 gradient-bg profile-glow">
                {/* แก้ไขกลับเป็นรูป Unsplash เนื่องจาก Link Google Photos ไม่สามารถแสดงผลแบบ Public ได้ */}
                <img 
                  src="https://scontent.fnak1-1.fna.fbcdn.net/v/t39.30808-6/529363886_24432378046402816_3692814791908791366_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGZ2XLURgu0ZbLG1bAoxyLckym8_5RTeZyTKbz_lFN5rioeAfWkvQrtUPgylDOv3jN9CX0hhLWdmqMVDlHhkF6&_nc_ohc=axR0t9a2o34Q7kNvwGYIkV-&_nc_oc=AdltgXTLPVxRhhCygKbodp0GUn5MMh1384q9vZDWfnf40zFn95wrL-I96LrWAmMOvJc&_nc_zt=23&_nc_ht=scontent.fnak1-1.fna&_nc_gid=Aw9vDRwwsRwQfYceca7GLw&oh=00_Afj4wF4-bvfdA2RwBD2T_2sGsAFuKBU5NpAzt1H7XU9Saw&oe=69236521" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border-4 border-[#050505]"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#171717] border border-[#262626] px-4 py-2 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-medium text-gray-300">Open for Work</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-blue-400 font-medium tracking-wide uppercase mb-2 text-sm">Hello, I'm</h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-white">
                สุทิน มาลุน <br/>
                <span className="gradient-text text-3xl md:text-4xl">Suin Malun</span>
              </h1>
              <h3 className="text-2xl text-gray-300 mb-6 font-light">
                Video Creator & Graphic Designer
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                สวัสดีครับ ผมเป็นครีเอเตอร์ที่หลงใหลในการเล่าเรื่องผ่านงานวิดีโอและการออกแบบกราฟิก 
                มีประสบการณ์กว่า 5 ปีในการเปลี่ยนไอเดียให้กลายเป็นภาพเคลื่อนไหวที่น่าจดจำ 
                เชี่ยวชาญโปรแกรม Adobe Premiere Pro และ After Effects
              </p>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                 <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] hover:bg-[#1877F2] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 border border-[#262626] hover:border-[#1877F2]">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] hover:bg-[#E4405F] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 border border-[#262626] hover:border-[#E4405F]">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] hover:bg-[#FF0000] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 border border-[#262626] hover:border-[#FF0000]">
                        <Youtube className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] hover:bg-[#0A66C2] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 border border-[#262626] hover:border-[#0A66C2]">
                        <Linkedin className="w-5 h-5" />
                    </a>
                 </div>
                 
                 <div className="h-px w-10 bg-[#262626] hidden sm:block"></div>
                 
                 <a href="#portfolio" className="text-white border-b border-blue-500 hover:text-blue-400 transition-colors pb-0.5 text-sm font-medium flex items-center">
                    ดูผลงานทั้งหมด <ChevronRight className="w-4 h-4 ml-1" />
                 </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#0a0a0a] relative border-t border-[#262626]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">บริการของเรา</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-[#171717]/50 border border-[#262626] hover:border-rose-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#171717] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-rose-400 transition-colors">Video Production</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                รับถ่ายทำวิดีโอโฆษณา, ไวรัลคลิป, งานอีเว้นท์ และ Music Video ด้วยอุปกรณ์คุณภาพสูง ระดับ 4K
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-[#171717]/50 border border-[#262626] hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#171717] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Post-Production</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                บริการตัดต่อวิดีโอ Color Grading และใส่ Sound Effect ให้งานของคุณลื่นไหล น่าติดตาม
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-[#171717]/50 border border-[#262626] hover:border-rose-500/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#171717] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-rose-400 transition-colors">Motion & Graphic</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                ออกแบบกราฟิก, Motion Graphics, Intro/Outro และ Visual Effect เพิ่มลูกเล่นให้วิดีโอ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills Section (Replaced "Stats / Tools We Use") */}
      <section id="skills" className="py-20 border-y border-[#262626] bg-[#121212]/30">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
                <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
               {skills.map((skill, index) => (
                  <div key={index} className={`group relative w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-[#050505] border-2 ${skill.color} flex flex-col items-center justify-center p-4 transition-all duration-300 hover:-translate-y-2 hover:${skill.shadow} shadow-lg`}>
                      {/* Glow Effect on Hover */}
                      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-current ${skill.color.replace('border', 'text')}`}></div>
                      
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className={`w-12 h-12 md:w-14 md:h-14 object-contain mb-3 drop-shadow-lg transition-transform group-hover:scale-110 ${skill.name === 'CapCut' ? 'rounded-md' : ''}`}
                      />
                      <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
               ))}
            </div>
            
            {/* Optional: Keep Stats below or separate if needed. Currently replacing stats banner with this grid for better focus as requested. */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 text-center border-t border-[#262626] pt-8 max-w-4xl mx-auto opacity-80">
                <div>
                    <p className="text-2xl font-bold text-white">300+</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Projects</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">5 Years</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Experience</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Satisfaction</p>
                </div>
            </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">ผลงานล่าสุด <span className="text-blue-500">.</span></h2>
              <p className="text-gray-400">รวมผลงานที่เราภูมิใจนำเสนอ</p>
            </div>
            
            {/* Filters */}
            <div className="mt-6 md:mt-0 flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {filters.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === category
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-[#171717] text-gray-400 hover:bg-[#262626] border border-[#262626]'
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
                <div className="relative overflow-hidden rounded-lg aspect-video bg-[#171717]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.client}</p>
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
      <section id="ai-lab" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">AI Idea Lab <span className="text-blue-400">✨</span></h2>
            <p className="text-gray-400 max-w-xl">
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
                className="flex-1 bg-[#0a0a0a]/50 border border-[#262626] rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-500"
              />
              <button 
                onClick={handleGenerateIdeas}
                disabled={isAiLoading || !aiPrompt}
                className="bg-gradient-to-r from-rose-600 to-blue-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 min-w-[160px] shadow-lg shadow-blue-500/20"
              >
                {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Lightbulb className="w-5 h-5" /> คิดไอเดีย</>}
              </button>
            </div>

            {aiIdeas && (
              <div className="bg-[#0a0a0a]/80 rounded-xl p-6 border border-[#262626] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ผลลัพธ์จาก AI:
                </h3>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {aiIdeas}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section id="rate-card" className="py-24 bg-[#0a0a0a] relative border-t border-[#262626]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rate Card <span className="text-blue-500">.</span></h2>
            <p className="text-gray-400">แพ็กเกจราคาเริ่มต้น สำหรับการจ้างงาน</p>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rateCard.map((pkg, index) => (
              <div key={index} className={`relative p-8 rounded-2xl border ${pkg.recommended ? 'border-blue-500 bg-[#171717]/80 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-[#262626] bg-[#171717]/30'} flex flex-col transition-all hover:-translate-y-2`}>
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 text-white">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-sm text-gray-400">เริ่มต้น</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-blue-400">฿{pkg.price}</span>
                    <span className="text-sm text-gray-500 mb-1">/ {pkg.unit}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className={`w-full py-3 rounded-xl text-center font-semibold transition-all ${pkg.recommended ? 'bg-gradient-to-r from-rose-600 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90' : 'bg-[#171717] hover:bg-[#262626] text-white'}`}>
                  สนใจจ้างงาน
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-[#050505]">
        {/* Bg Decoration */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-[#171717] to-[#050505] rounded-3xl border border-[#262626] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                พร้อมที่จะเริ่มโปรเจกต์<br/>
                <span className="gradient-text">ถัดไปของคุณหรือยัง?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
                หากคุณกำลังมองหาทีมงานคุณภาพเพื่อสร้างสรรค์ผลงานวิดีโอและกราฟิก ติดต่อเราเพื่อขอใบเสนอราคาได้เลย
              </p>
              
              <div className="flex flex-col gap-4 items-center md:items-start">
                <div className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center mr-4 text-blue-500">
                        <Mail className="w-5 h-5" />
                    </div>
                    sutinmalun@gmail.com
                </div>
                <div className="flex space-x-4 mt-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] border border-[#262626] hover:border-[#1877F2] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] border border-[#262626] hover:border-[#E4405F] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#171717] border border-[#262626] hover:border-[#1DA1F2] hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300">
                        <Twitter className="w-5 h-5" />
                    </a>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="ชื่อของคุณ" className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                    <input type="email" placeholder="อีเมล" className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
                </div>
                <select className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-gray-400 text-sm">
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
                    className="w-full bg-[#050505] border border-[#262626] rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-sm pb-10"
                  ></textarea>
                  
                  {/* AI Refine Button */}
                  <button 
                    type="button"
                    onClick={handleRefineMessage}
                    disabled={isRefining || !contactMessage}
                    className="absolute bottom-3 right-3 text-xs flex items-center gap-1 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-md transition-colors border border-blue-500/30 disabled:opacity-50"
                    title="ให้ AI ช่วยเรียบเรียงข้อความ"
                  >
                    {isRefining ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} 
                    {isRefining ? 'กำลังเขียน...' : 'ให้ AI ช่วยเขียน'}
                  </button>
                </div>
                
                <button type="button" className="w-full bg-gradient-to-r from-rose-600 to-blue-600 hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all shadow-lg shadow-blue-500/20">
                  ส่งข้อความหาเรา
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[#262626] py-10 text-center text-gray-500 text-sm">
        <p>© 2024 Your Studio Name. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-600">Design with ❤️ for Creators</p>
      </footer>
    </div>
  );
};

export default PortfolioLanding;
