import { Github, Twitter, Instagram, Heart, ExternalLink, ShieldAlert } from 'lucide-react'; // Tambah icon ShieldAlert
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0b1622] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* === 1. BRAND INFO & DISCLAIMER === */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:rotate-12 transition-transform duration-300">
                 <span className="text-[#0b1622] font-black text-xl">A</span>
              </div>
              <div className="flex flex-col leading-none">
                <h1 className="text-xl font-black text-white tracking-tight group-hover:text-yellow-500 transition-colors">
                  ANIME<span className="text-yellow-500 group-hover:text-white">LIST</span>
                </h1>
                <span className="text-[0.65rem] font-bold text-gray-500 tracking-[0.2em] uppercase group-hover:text-white transition-colors mt-0.5">
                  by Erlixx
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A modern anime discovery platform featuring real-time data, cinematic design, and a seamless user experience. Powered by the AniList API.
            </p>

            {/* === DISCLAIMER SECTION === */}
            <div className="pt-6 border-t border-white/5 max-w-sm">
               <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                  <ShieldAlert size={16} className="shrink-0 mt-0.5 text-yellow-500/50" />
                  <p>
                    <span className="font-bold text-gray-400">Disclaimer:</span> This project is strictly for <strong>educational and portfolio purposes only</strong>. 
                    This website does not host any video files or illegal content. All images and metadata are the property of their respective owners and the AniList API.
                  </p>
               </div>
            </div>
          </div>

          {/* === 2. NAVIGATION LINKS === */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-yellow-500 pl-3">
              Menu
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
              <li><Link to="/trending" className="hover:text-yellow-500 transition-colors">Trending Now</Link></li>
              <li><Link to="/season" className="hover:text-yellow-500 transition-colors">This Season</Link></li>
              <li><Link to="/top-100" className="hover:text-yellow-500 transition-colors">Top 100 Anime</Link></li>
            </ul>
          </div>

          {/* === 3. SOCIALS & RESOURCES === */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-yellow-500 pl-3">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-[#0b1622] transition-all">
                 <Github size={18} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-[#0b1622] transition-all">
                 <Twitter size={18} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-[#0b1622] transition-all">
                 <Instagram size={18} />
               </a>
            </div>
            <a 
              href="https://anilist.co" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
            >
              Data provided by AniList <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* === BOTTOM BAR === */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
           <p>&copy; {new Date().getFullYear()} Erlixx Projects. All rights reserved.</p>
           
           <p className="flex items-center gap-1">
             Made with <Heart size={12} className="text-red-500 fill-red-500" /> by Erlixx
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;