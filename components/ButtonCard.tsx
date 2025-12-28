import React, { useState } from 'react';
import { Copy, Code, Check, ArrowRight, Loader2, Star, Zap, Settings, Heart, Bell, Plus, Share, AlertTriangle, Info, Trash } from 'lucide-react';
import { ButtonStyle, ButtonCategory } from '../types';

interface ButtonCardProps {
  button: ButtonStyle;
  onCopy: (msg: string) => void;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({ button, onCopy }) => {
  const [copied, setCopied] = useState(false);

  // We detect if the button classes contain specific requirements for children
  const needsSpanWrap = button.classes.includes('[&>span]');
  const isCircle = button.classes.includes('rounded-full') && button.classes.includes('aspect-square');
  
  // Detect category specific rendering
  const isIconCategory = button.category === ButtonCategory.ICON;
  const isLoadingCategory = button.category === ButtonCategory.LOADING;
  const isStateCategory = button.category === ButtonCategory.STATE;
  const isFAB = button.category === ButtonCategory.FAB;
  const isLink = button.category === ButtonCategory.LINK;
  const isDestructive = button.category === ButtonCategory.DESTRUCTIVE;
  const isSuccess = button.category === ButtonCategory.SUCCESS;

  const renderContent = () => {
    // FABs and Circle Buttons usually look best with just an icon
    if (isFAB || isCircle) {
        if (button.name.includes('Add')) return <Plus size={24} />;
        if (button.name.includes('Share')) return <Share size={20} />;
        if (button.name.includes('Love')) return <Heart size={20} className="fill-current" />;
        return <Plus size={24} />; // Default FAB icon
    }

    if (isLoadingCategory) {
       if (button.name.includes('Spinner')) return <>Processing...</>; 
       if (button.name.includes('Dots')) return <>Saving</>; 
       return <>Loading...</>;
    }
    
    if (isIconCategory) {
        return (
            <>
                <span>Next</span>
                <ArrowRight size={18} />
            </>
        );
    }

    if (isStateCategory) {
        if (button.name.includes('Success')) return <><Check size={18} /> <span>Saved</span></>;
        if (button.name.includes('Error')) return <span>Retry</span>;
        if (button.name.includes('Disabled')) return <span>Unavailable</span>;
        if (button.name.includes('Toggle')) return <span>Toggle Me</span>;
    }

    if (isDestructive) {
        return <><Trash size={16} className="mr-2 inline" />Delete</>;
    }
    
    if (isSuccess) {
         return <><Check size={16} className="mr-2 inline" />Complete</>;
    }

    if (isLink) {
        return <>Read More</>;
    }

    // Default text cleaning
    const cleanName = button.name.split(' (')[0].replace(/(Blue|Red|Emerald|Violet|Amber|Rose|Cyan|Fuchsia|Indigo|Lime|Slate|HotPink|Orange|Purple|Black)/, '').trim();
    const displayText = cleanName || 'Button';

    return needsSpanWrap ? <span>{displayText}</span> : displayText;
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Construct realistic JSX copy
    let content = 'Click Me';
    let iconImport = '';
    
    if (isFAB || isCircle) {
        content = `<Plus size={24} />`;
        iconImport = `// import { Plus } from 'lucide-react';\n`;
    } else if (isIconCategory) {
        content = `<span>Next</span>\n  <ArrowRight size={18} />`;
        iconImport = `// import { ArrowRight } from 'lucide-react';\n`;
    } else if (isDestructive) {
        content = `<Trash size={16} className="mr-2" />\n  Delete`;
        iconImport = `// import { Trash } from 'lucide-react';\n`;
    } else if (isLoadingCategory && button.name.includes('Spinner')) {
        content = `Processing...`; 
    } else if (needsSpanWrap) {
        content = `<span>Button</span>`;
    } else if (isLink) {
        content = `Read More`;
    }

    const code = `${iconImport}<button className="${button.classes}">\n  ${content}\n</button>`;
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy('JSX Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyClass = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(button.classes);
    onCopy('Class Names Copied!');
  };

  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-300 hover:shadow-2xl flex flex-col min-h-[160px]">
      {/* Canvas Area */}
      <div className="flex-grow flex items-center justify-center p-6 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
        <button className={button.classes} onClick={(e) => e.preventDefault()}>
            {renderContent()}
        </button>
      </div>

      {/* Info/Action Area */}
      <div className="px-3 py-2 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
        <div className="overflow-hidden pr-2">
            <h3 className="text-xs font-semibold text-white truncate w-full" title={button.name}>{button.name}</h3>
            <div className="flex gap-1 mt-0.5">
                <span className="text-[9px] text-neutral-500 uppercase tracking-wider bg-neutral-900 px-1 rounded border border-neutral-800">{button.category.split(' ')[0] || 'Style'}</span>
            </div>
        </div>
        
        <div className="flex space-x-1 shrink-0">
            <button 
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                title="Copy JSX"
            >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Code size={14} />}
            </button>
            <button 
                onClick={handleCopyClass}
                className="p-1.5 rounded-md bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                title="Copy Classes Only"
            >
                <Copy size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};