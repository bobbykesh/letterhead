import React from 'react';
import { LetterheadData } from '../types';
import { TemplateType } from './LetterheadTemplates';
import { Upload, X } from 'lucide-react';

interface EditorProps {
  data: LetterheadData;
  onChange: (data: LetterheadData) => void;
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange, selectedTemplate, onTemplateChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...data, logo: null });
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6 border-r border-slate-200">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Design</h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['modern', 'classic', 'minimal'] as TemplateType[]).map((t) => (
              <button
                key={t}
                onClick={() => onTemplateChange(t)}
                className={`px-3 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                  selectedTemplate === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              name="primaryColor"
              value={data.primaryColor}
              onChange={handleChange}
              className="h-10 w-16 p-1 bg-white border border-slate-200 rounded cursor-pointer"
            />
            <span className="text-xs text-slate-500 font-mono">{data.primaryColor}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={data.jobTitle}
                onChange={handleChange}
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Company Details</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Logo</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                <Upload size={16} />
                <span>Upload Logo</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </label>
              {data.logo && (
                <div className="relative group">
                  <img src={data.logo} alt="Logo Preview" className="h-10 w-10 object-contain rounded border border-slate-200 bg-white" />
                  <button 
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Contact</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={data.website}
              onChange={handleChange}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            <textarea
              name="address"
              placeholder="Address"
              rows={2}
              value={data.address}
              onChange={handleChange}
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>

        <div className="space-y-4 pb-8">
            <h2 className="text-xl font-bold text-slate-800">Content</h2>
            <textarea
                name="content"
                rows={12}
                value={data.content}
                onChange={handleChange}
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border font-mono"
            />
        </div>
      </div>
    </div>
  );
};
