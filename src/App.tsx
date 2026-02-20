import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { LetterheadData } from './types';
import { TemplateType } from './components/LetterheadTemplates';
import { Printer } from 'lucide-react';

const initialData: LetterheadData = {
  fullName: 'Alex Johnson',
  jobTitle: 'Senior Consultant',
  companyName: 'Acme Corp',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  website: 'www.acmecorp.com',
  address: '123 Business Rd, Suite 100\nTech City, TC 90210',
  logo: null,
  content: `Dear [Recipient Name],

I hope this letter finds you well.

I am writing to formally propose our strategic partnership for the upcoming fiscal year. Based on our previous discussions, I believe our combined expertise will yield significant results for both parties.

Our team has been working diligently to outline the scope of the project, and we are confident that the milestones we have set are both ambitious and achievable. We have attached a detailed breakdown of the phases and expected deliverables for your review.

Please let me know if you have any questions or require further clarification. I look forward to the possibility of working together.

Sincerely,

Alex Johnson
Senior Consultant
Acme Corp`,
  primaryColor: '#4f46e5',
};

export const App = () => {
  const [data, setData] = useState<LetterheadData>(initialData);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.fullName.replace(/\s+/g, '_')}_Letterhead`,
  });

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
      {/* Sidebar Editor */}
      <div className="w-1/3 min-w-[320px] max-w-[480px] flex flex-col h-full bg-white shadow-xl z-10">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="text-indigo-600">Letterhead</span>Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1">Create professional letterheads in seconds.</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Editor
            data={data}
            onChange={setData}
            selectedTemplate={template}
            onTemplateChange={setTemplate}
          />
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="text-sm font-medium text-slate-500">
            Previewing: <span className="text-slate-900 capitalize font-semibold">{template}</span> Template
          </div>
          <button
            onClick={() => handlePrint()}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            <Printer size={16} />
            <span>Print / Download PDF</span>
          </button>
        </div>

        {/* Preview Container */}
        <div className="flex-1 bg-slate-100/50 relative overflow-hidden flex flex-col">
           <Preview
             ref={componentRef}
             data={data}
             template={template}
           />
           <div className="absolute bottom-6 right-6 text-xs text-slate-400 bg-white/80 backdrop-blur px-2 py-1 rounded border border-slate-200 shadow-sm pointer-events-none">
             A4 Preview Scale
           </div>
        </div>
      </div>
    </div>
  );
};
