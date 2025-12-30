
import React, { useState } from 'react';
import { CUSTOM_BUILDER_OPTIONS } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, ArrowRight, Loader2, CheckCircle, Info, Calculator, MessageSquareText, RotateCcw, AlertTriangle } from 'lucide-react';
import { AICustomPlan } from '../types';

const CustomPathPage: React.FC = () => {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('beginner');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AICustomPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSoftware = (id: string) => {
    setSelectedSoftwares(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setPlan(null);
    setSelectedSoftwares([]);
    setSelectedProducts([]);
    setLevel('beginner');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePlan = async () => {
    if (selectedSoftwares.length === 0 || selectedProducts.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines.
      // Do not perform manual checks or UI prompts for the API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Bạn là chuyên gia đào tạo thiết kế đồ họa tại Hudesign Academy. 
      Hãy xây dựng lộ trình học (Syllabus) cá nhân hóa cho học viên dựa trên các thông tin sau:
      - Phần mềm muốn học: ${selectedSoftwares.join(', ')}
      - Sản phẩm muốn làm: ${selectedProducts.join(', ')}
      - Trình độ hiện tại: ${level}
      
      Quy tắc tính phí: 
      - Mỗi buổi học 1 kèm 1 thường kéo dài 2h.
      - Giá khoảng 500.000đ - 700.000đ/buổi tùy độ phức tạp. 
      - Nếu học nhiều phần mềm/sản phẩm, hãy gom nhóm buổi học để tối ưu chi phí.
      - Trình độ Beginner cần thêm 1 buổi tư duy nền tảng.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedSessions: { type: Type.INTEGER },
              estimatedPrice: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              syllabus: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    session: { type: Type.STRING },
                    title: { type: Type.STRING },
                    topics: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["session", "title", "topics"]
                }
              }
            },
            required: ["estimatedSessions", "estimatedPrice", "reasoning", "syllabus"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("AI không trả về kết quả.");
      
      const result = JSON.parse(text);
      setPlan(result);
    } catch (err: any) {
      console.error("AI Error:", err);
      setError(err.message || "Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
            <Sparkles size={12} />
            <span>AI-Powered Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Build Your <span className="text-indigo-600">Own Path</span></h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">Chọn những gì bạn thực sự cần, chúng tôi sẽ thiết kế lộ trình hoàn hảo nhất dành riêng cho bạn.</p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 animate-in fade-in slide-in-from-top-4">
            <AlertTriangle className="shrink-0" size={20} />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Builder Sidebar - Left */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Software */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">1</div>
                <h2 className="text-xl font-black text-slate-900">Chọn "vũ khí" của bạn</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CUSTOM_BUILDER_OPTIONS.softwares.map(sw => (
                  <button
                    key={sw.id}
                    onClick={() => toggleSoftware(sw.id)}
                    className={`relative p-6 rounded-3xl border-2 transition-all group flex flex-col items-center space-y-4 ${
                      selectedSoftwares.includes(sw.id) 
                      ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/10' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center p-1">
                      <img src={sw.icon} alt={sw.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-black text-xs uppercase text-slate-600 group-hover:text-indigo-600">{sw.name}</span>
                    {selectedSoftwares.includes(sw.id) && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-0.5">
                        <CheckCircle size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Products */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">2</div>
                <h2 className="text-xl font-black text-slate-900">Sản phẩm bạn muốn làm?</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Online Media</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CUSTOM_BUILDER_OPTIONS.onlineProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all text-left ${
                          selectedProducts.includes(p.id)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="text-xl">{p.icon}</span>
                        <span className="text-xs font-bold leading-tight">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Print Media</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CUSTOM_BUILDER_OPTIONS.printProducts.map(p => (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all text-left ${
                          selectedProducts.includes(p.id)
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="text-xl">{p.icon}</span>
                        <span className="text-xs font-bold leading-tight">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Level */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">3</div>
                <h2 className="text-xl font-black text-slate-900">Trình độ & Thời gian</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {CUSTOM_BUILDER_OPTIONS.levels.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`p-6 rounded-3xl border-2 transition-all text-left group ${
                      level === l.id 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <p className={`font-black text-sm uppercase mb-1 ${level === l.id ? 'text-indigo-600' : 'text-slate-900'}`}>{l.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold">{l.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Sidebar - Right */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black uppercase tracking-widest text-indigo-400">Tóm tắt lộ trình</h3>
                  <Calculator size={20} className="text-slate-500" />
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="animate-spin text-indigo-400 w-10 h-10" />
                    <p className="text-slate-400 font-bold text-sm">Gemini AI đang phân tích...</p>
                  </div>
                ) : plan ? (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Thời lượng</p>
                        <p className="text-2xl font-black text-white">{plan.estimatedSessions} buổi</p>
                      </div>
                      <div className="bg-indigo-600/20 border border-indigo-500/30 p-5 rounded-3xl">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Học phí dự kiến</p>
                        <p className="text-2xl font-black text-white">{plan.estimatedPrice}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center space-x-2 text-indigo-400">
                         <Info size={16} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Ghi chú AI</span>
                       </div>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium italic">"{plan.reasoning}"</p>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                      {plan.syllabus.map((s, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
                          <p className="text-indigo-400 text-[10px] font-black uppercase mb-1">{s.session}</p>
                          <h4 className="text-sm font-bold text-white mb-2">{s.title}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {s.topics.map((t, idx) => (
                              <span key={idx} className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300 font-bold">{t}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 space-y-3">
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2">
                        <MessageSquareText size={18} />
                        <span>Chốt lộ trình & Tư vấn ngay</span>
                      </button>
                      
                      <button 
                        onClick={handleReset}
                        className="w-full bg-white/5 hover:bg-white/10 text-slate-400 py-4 rounded-2xl font-black text-sm border border-white/10 transition-all active:scale-95 flex items-center justify-center space-x-2 group"
                      >
                        <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" />
                        <span>Xây lộ trình khác</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                    <div className="bg-white/5 p-6 rounded-full">
                      <Calculator size={40} className="text-slate-700" />
                    </div>
                    <p className="text-slate-500 font-medium text-sm">Hãy hoàn thành các lựa chọn bên trái <br/>để AI tính toán lộ trình cho bạn.</p>
                    <button 
                      onClick={generatePlan}
                      disabled={selectedSoftwares.length === 0 || selectedProducts.length === 0}
                      className="bg-indigo-600/10 border border-indigo-600 text-indigo-400 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Phân tích lộ trình
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPathPage;
