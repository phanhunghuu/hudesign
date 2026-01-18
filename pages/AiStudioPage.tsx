
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Upload, Image as ImageIcon, Download, Settings2, 
  Wand2, Crown, Zap, AlertTriangle, Maximize2, Palette, ArrowLeft, LogIn, XCircle, RefreshCw,
  Type, Target, Plus, Trash2, Layers
} from 'lucide-react';
import { AI_TASKS, ASPECT_RATIOS, RESOLUTIONS, MODELS } from '../features/AiStudio/constants';
import { generateCreativeContent } from '../features/AiStudio/geminiService';
import UpgradeModal from '../features/AiStudio/components/UpgradeModal';
import { supabase } from '../supabaseClient';
import AuthModal from '../components/AuthModal';

const AiStudioPage: React.FC = () => {
  // --- STATE ---
  const [selectedTask, setSelectedTask] = useState(AI_TASKS[0]);
  const [prompt, setPrompt] = useState('');
  
  // Input State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImage2, setUploadedImage2] = useState<string | null>(null); // New: Product 2
  const [uploadedImage3, setUploadedImage3] = useState<string | null>(null); // New: Product 3
  
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [headline, setHeadline] = useState(''); 
  const [subHeadline, setSubHeadline] = useState(''); // New: Sub Headline
  const [styleImage, setStyleImage] = useState<string | null>(null);
  
  // Output State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Settings State
  const [modelId, setModelId] = useState('flash');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [resolution, setResolution] = useState('1K');
  
  // System State
  const [user, setUser] = useState<any>(null);
  const [isVip, setIsVip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const styleInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // --- EFFECT: CHECK AUTH & CREDITS ---
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('credits, is_vip')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setCredits(data.credits);
          setIsVip(data.is_vip);
        } else {
          setCredits(0);
        }
      } else {
        setUser(null);
        setCredits(null);
      }
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       if (session) fetchProfile();
       else {
         setUser(null);
         setCredits(null);
       }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- HANDLERS ---

  const handleTaskChange = (task: typeof AI_TASKS[0]) => {
    setSelectedTask(task);
    setAspectRatio(task.defaultRatio);
    setErrorMessage(null);
    // Reset inputs specific to sales design
    if (task.id !== 'sales-design') {
        setLogoImage(null);
        setHeadline('');
        setSubHeadline('');
        setUploadedImage2(null);
        setUploadedImage3(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'base' | 'base2' | 'base3' | 'style' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'base') setUploadedImage(reader.result as string);
        else if (type === 'base2') setUploadedImage2(reader.result as string);
        else if (type === 'base3') setUploadedImage3(reader.result as string);
        else if (type === 'logo') setLogoImage(reader.result as string);
        else setStyleImage(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: 'base' | 'base2' | 'base3') => {
    if (type === 'base') setUploadedImage(null);
    if (type === 'base2') setUploadedImage2(null);
    if (type === 'base3') setUploadedImage3(null);
  }

  const checkVipFeature = (featureIsVip: boolean) => {
    if (featureIsVip && !isVip) {
      setShowUpgrade(true);
      return false; // Block action
    }
    return true; // Allow action
  };

  const handleGenerate = async () => {
    setErrorMessage(null);
    if (!user) {
      setShowAuth(true);
      return;
    }

    if (!isVip && (credits === null || credits <= 0)) {
      setErrorMessage("Bạn đã hết lượt tạo miễn phí. Vui lòng nâng cấp hoặc mua thêm lượt!");
      setShowUpgrade(true);
      return;
    }

    if (!prompt.trim()) {
      setErrorMessage("Vui lòng nhập mô tả ý tưởng của bạn!");
      return;
    }
    if (selectedTask.requiresImage && !uploadedImage) {
      setErrorMessage("Tác vụ này yêu cầu ít nhất 1 ảnh gốc. Vui lòng tải ảnh lên!");
      return;
    }

    const apiKey = process.env.API_KEY || "";
    if (!apiKey) {
      setErrorMessage("Hệ thống chưa cấu hình API Key. Vui lòng liên hệ Admin.");
      return;
    }

    setLoading(true);
    
    if (window.innerWidth < 768) {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const result = await generateCreativeContent({
        prompt,
        hiddenPrompt: selectedTask.hiddenPrompt,
        imageBase64: uploadedImage || undefined,
        imageBase64_2: uploadedImage2 || undefined,
        imageBase64_3: uploadedImage3 || undefined,
        logoBase64: logoImage || undefined,
        headline: headline || undefined,
        subHeadline: subHeadline || undefined,
        styleImageBase64: styleImage || undefined,
        modelType: modelId as 'flash' | 'pro',
        aspectRatio,
        resolution,
        apiKey
      });

      setGeneratedImage(result);
      
      if (!isVip && credits !== null) {
        const newCredits = credits - 1;
        setCredits(newCredits);
        
        const { error } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', user.id);
      }

    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `huai-studio-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-violet-500/30 selection:text-violet-200 flex flex-col md:flex-row relative md:fixed md:inset-0 md:overflow-hidden">
      
      {/* === A. SIDEBAR === */}
      <aside className="w-full md:w-64 lg:w-72 bg-zinc-900/50 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/5 flex flex-col z-20 shrink-0">
        <div className="p-4 md:p-6 border-b border-white/5 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             <span>Về trang chủ</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white">HuAI Studio</h1>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto p-4 flex md:block gap-3 no-scrollbar">
          <p className="hidden md:block px-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 mt-2">Chọn tác vụ</p>
          {AI_TASKS.map(task => (
            <button
              key={task.id}
              onClick={() => handleTaskChange(task)}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden whitespace-nowrap md:whitespace-normal border ${
                selectedTask.id === task.id 
                  ? 'bg-violet-500/10 text-violet-300 border-violet-500/20 shadow-inner' 
                  : 'bg-zinc-900 md:bg-transparent border-zinc-800 md:border-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {selectedTask.id === task.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 hidden md:block"></div>}
              <task.icon size={18} className={selectedTask.id === task.id ? 'text-violet-400' : 'text-zinc-600 group-hover:text-zinc-400'} />
              <div className="text-left">
                <span className="block text-sm font-bold">{task.label}</span>
                {selectedTask.id === task.id && (
                    <span className="hidden md:block text-[10px] opacity-70 font-normal line-clamp-1">{task.description}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="hidden md:block p-4 border-t border-white/5 bg-zinc-900/80">
           <p className="text-[10px] text-zinc-600 text-center font-medium">Powered by Google Gemini 2.5 & 3.0</p>
        </div>
      </aside>

      {/* === MAIN WORKSPACE === */}
      <main className="flex-1 flex flex-col md:flex-row relative z-10 md:overflow-hidden">
        
        {/* === B.1 CONTROL PANEL (LEFT/TOP) === */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-zinc-900/30 backdrop-blur-sm border-b md:border-b-0 md:border-r border-white/5 flex flex-col md:overflow-y-auto no-scrollbar h-auto md:h-full">
           
           <div className="p-6 md:p-8 space-y-8 pb-32">
              {/* Credits Info */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2">
                    <Zap className={isVip ? "text-amber-500" : "text-zinc-400"} size={16} fill={isVip ? "currentColor" : "none"} />
                    <span className="text-xs font-bold text-zinc-300">{user ? (isVip ? "Tài khoản Pro" : "Tài khoản thường") : "Khách"}</span>
                 </div>
                 <div className="text-xs font-black">
                    {!user ? (
                      <span className="text-zinc-500">Đăng nhập để xem</span>
                    ) : isVip ? (
                      <span className="text-amber-500">∞ Credits</span>
                    ) : (
                      <span className={credits !== null && credits <= 0 ? "text-red-500" : "text-zinc-400"}>
                        {credits !== null ? `${credits} lượt còn lại` : '...'}
                      </span>
                    )}
                 </div>
              </div>

              {/* Model Selection */}
              <div className="space-y-3">
                 <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Settings2 size={12} /> Model xử lý
                 </label>
                 <div className="grid grid-cols-1 gap-2">
                    {MODELS.map(model => (
                        <button
                          key={model.id}
                          onClick={() => {
                             if(checkVipFeature(model.isVip)) setModelId(model.id);
                          }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${
                             modelId === model.id 
                               ? 'bg-violet-600/20 border-violet-500/50 text-violet-200' 
                               : 'bg-black/20 border-white/5 text-zinc-500 hover:border-white/10'
                          }`}
                        >
                          <div>
                             <p className="font-bold text-sm flex items-center gap-2">
                                {model.name} 
                                {model.isVip && <Crown size={12} className="text-amber-500" />}
                             </p>
                             <p className="text-[10px] opacity-70">{model.desc}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${modelId === model.id ? 'border-violet-500' : 'border-zinc-700'}`}>
                             {modelId === model.id && <div className="w-2 h-2 rounded-full bg-violet-500"></div>}
                          </div>
                        </button>
                    ))}
                 </div>
              </div>

              {/* === KHU VỰC UPLOAD ẢNH === */}
              <div className="space-y-3">
                 <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <ImageIcon size={12} /> Tài nguyên đầu vào
                 </label>
                 
                 <div className="space-y-4">
                    {/* Phần ảnh sản phẩm (Hỗ trợ 3 ảnh) */}
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 mb-2 flex items-center justify-between">
                            <span>Ảnh sản phẩm (Tối đa 3)</span>
                            <span className="opacity-50 text-[9px]">Gốc / Tách nền</span>
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {/* Slot 1: Main Product */}
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${
                                 selectedTask.requiresImage && !uploadedImage ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-violet-500/50 hover:bg-white/5'
                              }`}
                            >
                               {uploadedImage ? (
                                  <>
                                     <img src={uploadedImage} className="w-full h-full object-cover" alt="Product 1" />
                                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <RefreshCw size={16} className="text-white" />
                                     </div>
                                  </>
                               ) : (
                                  <>
                                     <Upload size={18} className="text-zinc-500 mb-1 group-hover:text-violet-400" />
                                     <span className="text-[9px] font-bold text-zinc-500">Ảnh 1</span>
                                  </>
                               )}
                               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'base')} />
                            </div>

                            {/* Slot 2: Product 2 */}
                            {uploadedImage && (
                                <div 
                                  onClick={() => !uploadedImage2 && fileInputRef2.current?.click()}
                                  className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group"
                                >
                                   {uploadedImage2 ? (
                                      <>
                                         <img src={uploadedImage2} className="w-full h-full object-cover" alt="Product 2" />
                                         <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-red-500 transition-colors z-10" onClick={(e) => { e.stopPropagation(); removeImage('base2'); }}>
                                            <Trash2 size={10} className="text-white" />
                                         </div>
                                      </>
                                   ) : (
                                      <>
                                         <Plus size={18} className="text-zinc-500 mb-1" />
                                         <span className="text-[9px] font-bold text-zinc-500">Thêm ảnh</span>
                                      </>
                                   )}
                                   <input type="file" ref={fileInputRef2} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'base2')} />
                                </div>
                            )}

                            {/* Slot 3: Product 3 */}
                            {uploadedImage2 && (
                                <div 
                                  onClick={() => !uploadedImage3 && fileInputRef3.current?.click()}
                                  className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group"
                                >
                                   {uploadedImage3 ? (
                                      <>
                                         <img src={uploadedImage3} className="w-full h-full object-cover" alt="Product 3" />
                                         <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-red-500 transition-colors z-10" onClick={(e) => { e.stopPropagation(); removeImage('base3'); }}>
                                            <Trash2 size={10} className="text-white" />
                                         </div>
                                      </>
                                   ) : (
                                      <>
                                         <Plus size={18} className="text-zinc-500 mb-1" />
                                         <span className="text-[9px] font-bold text-zinc-500">Thêm ảnh</span>
                                      </>
                                   )}
                                   <input type="file" ref={fileInputRef3} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'base3')} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hàng ngang: Ảnh Style và Logo */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                       {/* Phần ảnh Style */}
                       <div>
                          <p className="text-[10px] font-bold text-zinc-500 mb-2">Ảnh tham khảo Style</p>
                          <div 
                            onClick={() => styleInputRef.current?.click()}
                            className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-white/10 hover:border-pink-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group bg-black/40"
                          >
                             {styleImage ? (
                                <>
                                   {/* SỬ DỤNG OBJECT-CONTAIN ĐỂ HIỆN FULL HÌNH */}
                                   <img src={styleImage} className="w-full h-full object-contain opacity-80 group-hover:opacity-60 transition-opacity" alt="Style" />
                                   <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <div className="bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                                          <Palette size={14} className="text-white" />
                                          <span className="text-[10px] text-white font-bold uppercase">Thay ảnh</span>
                                       </div>
                                   </div>
                                </>
                             ) : (
                                <div className="flex flex-col items-center gap-2 text-center p-2">
                                   <Palette size={20} className="text-zinc-500 group-hover:text-pink-400 transition-colors" />
                                   <span className="text-[9px] font-bold text-zinc-500">Tải ảnh Style (AI học màu & ánh sáng)</span>
                                </div>
                             )}
                             <input type="file" ref={styleInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'style')} />
                          </div>
                       </div>

                       {/* LOGO UPLOAD (Chỉ hiện khi task là Sales Design) */}
                       {selectedTask.id === 'sales-design' && (
                          <div>
                             <p className="text-[10px] font-bold text-zinc-500 mb-2">Logo (Tùy chọn)</p>
                             <div 
                               onClick={() => logoInputRef.current?.click()}
                               className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group bg-black/20"
                             >
                                {logoImage ? (
                                   <>
                                      <img src={logoImage} className="w-full h-full object-contain p-4" alt="Logo" />
                                      <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-red-500 transition-colors z-10" onClick={(e) => { e.stopPropagation(); setLogoImage(null); }}>
                                         <XCircle size={14} className="text-white" />
                                      </div>
                                   </>
                                ) : (
                                   <div className="flex flex-col items-center gap-2 text-center p-2">
                                      <Target size={20} className="text-zinc-500 group-hover:text-emerald-400" />
                                      <span className="text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300">Tải Logo lên</span>
                                   </div>
                                )}
                                <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Headline & Subheadline Input */}
              {selectedTask.id === 'sales-design' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-center gap-2">
                       <Type size={12} className="text-zinc-500" />
                       <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Nội dung chữ (Text)</label>
                   </div>
                   
                   <input 
                      type="text" 
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Tiêu đề chính (Headline)..." 
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all font-bold placeholder:font-normal placeholder:text-zinc-600"
                   />
                   
                   <input 
                      type="text" 
                      value={subHeadline}
                      onChange={(e) => setSubHeadline(e.target.value)}
                      placeholder="Tiêu đề phụ (Sub-headline)..." 
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-300 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-medium placeholder:font-normal placeholder:text-zinc-600"
                   />
                </div>
              )}

              {/* Prompt Input */}
              <div className="space-y-3">
                 <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Mô tả ý tưởng (Tiếng Việt)</label>
                 <textarea 
                    value={prompt}
                    onChange={(e) => { setPrompt(e.target.value); setErrorMessage(null); }}
                    placeholder="VD: Ba ly trà trái cây đặt trên bàn gỗ, nắng chiếu xuyên qua lá cây tạo bóng đổ lung linh..."
                    className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-sm text-zinc-200 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all resize-none min-h-[100px]"
                 ></textarea>
              </div>

              {/* Configs */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Tỉ lệ khung hình</label>
                    <select 
                      value={aspectRatio} 
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-3 text-xs font-bold text-zinc-300 outline-none focus:border-violet-500"
                    >
                       {ASPECT_RATIOS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                       Độ phân giải {modelId !== 'pro' && <AlertTriangle size={10} className="text-amber-500" />}
                    </label>
                    <select 
                      value={resolution} 
                      onChange={(e) => {
                         const res = RESOLUTIONS.find(r => r.value === e.target.value);
                         if (checkVipFeature(res?.isVip || false)) setResolution(e.target.value);
                      }}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-3 text-xs font-bold text-zinc-300 outline-none focus:border-violet-500"
                    >
                       {RESOLUTIONS.map(r => (
                          <option key={r.value} value={r.value}>{r.label} {r.isVip ? '(Pro)' : ''}</option>
                       ))}
                    </select>
                 </div>
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-start gap-3 text-red-200">
                      <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <div className="text-xs font-medium leading-relaxed">{errorMessage}</div>
                   </div>
                   <button 
                     onClick={handleGenerate} 
                     className="self-end bg-red-500/20 hover:bg-red-500/30 text-red-200 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase flex items-center gap-2 transition-colors"
                   >
                     <RefreshCw size={12} /> Thử lại
                   </button>
                </div>
              )}

              {/* GENERATE BUTTON */}
              {!user ? (
                <button 
                   onClick={() => setShowAuth(true)}
                   className="w-full bg-zinc-800 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
                >
                   <LogIn size={18} />
                   <span>Đăng nhập để tạo ảnh</span>
                </button>
              ) : (
                <button 
                   onClick={handleGenerate}
                   disabled={loading || (!isVip && (credits !== null && credits <= 0))}
                   className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-violet-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                   {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />}
                   <span>{loading ? 'HuAI đang vẽ...' : (credits !== null && credits <= 0 && !isVip) ? 'Hết lượt (Nâng cấp ngay)' : 'Tạo Tác Phẩm'}</span>
                </button>
              )}
           </div>
        </div>

        {/* === B.2 DISPLAY PANEL (RIGHT/BOTTOM) === */}
        <div ref={resultRef} className="flex-1 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] bg-zinc-950 flex items-center justify-center p-8 md:p-12 relative min-h-[50vh] md:min-h-0">
           <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 opacity-80"></div>

           {/* LOADING OVERLAY */}
           {loading && (
             <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4"></div>
                <p className="text-violet-200 font-bold animate-pulse">Đang kết nối siêu máy tính...</p>
                <p className="text-xs text-zinc-500 mt-2">Quá trình này mất khoảng 5-10 giây</p>
             </div>
           )}

           {generatedImage ? (
              <div className="relative group animate-in zoom-in duration-500 shadow-2xl shadow-violet-500/10 rounded-xl overflow-hidden max-h-full max-w-full">
                 <img src={generatedImage} alt="AI Result" className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10" />
                 
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button onClick={handleDownload} className="bg-white text-zinc-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
                       <Download size={16} /> Tải xuống
                    </button>
                    <button onClick={() => window.open(generatedImage, '_blank')} className="bg-white/20 text-white px-4 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors">
                       <Maximize2 size={16} />
                    </button>
                 </div>
              </div>
           ) : (
              <div className="text-center space-y-6 opacity-40">
                 <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5 animate-pulse">
                    <Sparkles size={48} className="text-white/20" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-zinc-600 uppercase">Sẵn sàng sáng tạo</h3>
                    <p className="text-sm text-zinc-600 font-medium max-w-xs mx-auto">Chọn tác vụ, nhập ý tưởng và để HuAI Studio thực hiện phần còn lại.</p>
                 </div>
              </div>
           )}
        </div>
      </main>

      {!isVip && (
        <button 
          onClick={() => setShowUpgrade(true)}
          className="fixed bottom-5 right-5 z-[100] group"
        >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full flex items-center justify-center text-zinc-900 shadow-lg shadow-amber-500/30 hover:scale-110 hover:shadow-amber-500/50 transition-all border-2 border-white/20 animate-[bounce_2s_infinite]">
              <Crown size={18} fill="currentColor" />
            </div>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-zinc-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-xl">
              Nâng cấp Pro
            </div>
        </button>
      )}

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLoginSuccess={() => setShowAuth(false)} />
    </div>
  );
};

export default AiStudioPage;
