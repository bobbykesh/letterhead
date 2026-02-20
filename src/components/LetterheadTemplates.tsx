import React from 'react';
import { LetterheadData, TemplateProps } from '../types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

const ContactItem = ({ icon: Icon, text }: { icon: any, text: string }) => {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2 mb-1">
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
};

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col bg-white text-slate-800" style={{ fontFamily: 'sans-serif' }}>
      <div className="flex w-full" style={{ borderTop: `8px solid ${data.primaryColor}` }}>
        <div className="w-1/3 p-8 text-white" style={{ backgroundColor: data.primaryColor }}>
            {data.logo && <img src={data.logo} alt="Logo" className="w-24 h-24 object-contain mb-6 bg-white rounded-lg p-2" />}
            <h1 className="text-2xl font-bold mb-1 leading-tight">{data.fullName}</h1>
            <p className="text-white/80 text-sm font-medium mb-8 uppercase tracking-wider">{data.jobTitle}</p>
            
            <div className="text-sm space-y-3 opacity-90">
              <ContactItem icon={Mail} text={data.email} />
              <ContactItem icon={Phone} text={data.phone} />
              <ContactItem icon={Globe} text={data.website} />
              <ContactItem icon={MapPin} text={data.address} />
            </div>
        </div>
        <div className="w-2/3 p-12 flex flex-col">
          <div className="mb-8 flex justify-end">
            <h2 className="text-xl font-bold text-slate-400">{data.companyName}</h2>
          </div>
          <div className="flex-grow whitespace-pre-wrap text-base leading-relaxed text-slate-700">
            {data.content}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end">
             <div className="h-1 w-24" style={{ backgroundColor: data.primaryColor }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 p-16 flex flex-col items-center relative" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: data.primaryColor }}></div>
      
      <div className="w-full flex flex-col items-center mb-12 border-b-2 pb-8 border-slate-100">
        {data.logo && <img src={data.logo} alt="Logo" className="h-20 w-auto mb-4" />}
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: data.primaryColor }}>{data.companyName}</h1>
        <h2 className="text-lg font-semibold text-slate-600">{data.fullName}</h2>
        <p className="text-sm italic text-slate-500 mb-4">{data.jobTitle}</p>
        
        <div className="flex gap-6 text-xs text-slate-500 mt-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.website && <span>• {data.website}</span>}
        </div>
        {data.address && <div className="text-xs text-slate-500 mt-1">{data.address}</div>}
      </div>

      <div className="w-full flex-grow text-justify text-slate-800 leading-loose whitespace-pre-wrap">
        {data.content}
      </div>

      <div className="w-full mt-16 pt-8 border-t border-slate-100 flex justify-center">
        <p className="text-xs text-slate-400">Professional Correspondence</p>
      </div>
    </div>
  );
};

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white text-slate-800 p-12 flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header className="flex justify-between items-start mb-16">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2" style={{ color: data.primaryColor }}>
            {data.fullName || 'Your Name'}
          </h1>
          <p className="font-bold text-slate-400 text-sm uppercase tracking-wide">{data.jobTitle || 'Job Title'}</p>
        </div>
        <div className="text-right text-sm text-slate-500 space-y-1">
          <p className="font-semibold text-slate-900">{data.companyName}</p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.website}</p>
          <p className="max-w-[200px] ml-auto">{data.address}</p>
        </div>
      </header>
      
      <div className="flex-grow whitespace-pre-wrap leading-relaxed text-slate-700 text-lg">
        {data.content}
      </div>
      
      <footer className="mt-12 flex items-center gap-4">
        {data.logo && <img src={data.logo} alt="Logo" className="h-8 w-auto opacity-50 grayscale" />}
        <div className="h-px bg-slate-200 flex-grow"></div>
      </footer>
    </div>
  );
};

export const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

export type TemplateType = keyof typeof templates;
