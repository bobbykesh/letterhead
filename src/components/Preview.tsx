import React, { forwardRef } from 'react';
import { LetterheadData } from '../types';
import { TemplateType, templates } from './LetterheadTemplates';

interface PreviewProps {
  data: LetterheadData;
  template: TemplateType;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ data, template }, ref) => {
  const TemplateComponent = templates[template];

  return (
    <div className="flex-1 bg-slate-100 flex items-center justify-center p-8 overflow-auto h-full">
      <div className="shadow-2xl bg-white w-[210mm] min-h-[297mm] flex-shrink-0 origin-top transform scale-75 md:scale-90 lg:scale-100 transition-transform">
        <div ref={ref} className="w-full h-full min-h-[297mm] bg-white print:w-[210mm] print:h-[297mm]">
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
