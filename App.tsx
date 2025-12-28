import React, { useState, useMemo } from 'react';
import { ButtonCategory, ButtonStyle } from './types';
import { BASE_TEMPLATES, SPECIAL_BUTTONS } from './constants';
import { ButtonCard } from './components/ButtonCard';
import { Toast } from './components/Toast';
import { 
    Layers, Palette, Grid, Zap, Box, Ghost, Terminal, 
    MousePointer2, Type, Move3d, Sparkles, SquareDashedBottom,
    PlayCircle, Star, ToggleRight, Fingerprint, Search, Circle,
    ArrowDownCircle, PaintBucket, Shapes,
    Layout, PlusCircle, AlertTriangle, CheckCircle, Info, Link as LinkIcon
} from 'lucide-react';

// Shapes to multiply the library
const SHAPES = [
    { name: 'Sharp', class: 'rounded-none' },
    { name: 'Smooth', class: 'rounded-md' },
    { name: 'Rounded', class: 'rounded-xl' },
    { name: 'Pill', class: 'rounded-full' },
    // Special Circle Shape for Icon buttons primarily
    { name: 'Circle', class: 'rounded-full aspect-square p-0 w-12 h-12 flex items-center justify-center' },
];

// Procedurally generate the massive library
const generateLibrary = (): ButtonStyle[] => {
  const library: ButtonStyle[] = [];
  
  BASE_TEMPLATES.forEach((template, index) => {
    Object.entries(template.colorMap).forEach(([color, colorClasses]) => {
      // Multiply by shapes
      SHAPES.forEach((shape) => {
         const isTextCategory = template.category === ButtonCategory.TEXT;
         const isLongText = template.name.includes('Spacing') || template.name.includes('Reveal');
         const isFAB = template.category === ButtonCategory.FAB;
         const isLink = template.category === ButtonCategory.LINK;
         
         // FABs MUST be Circle.
         if (isFAB && shape.name !== 'Circle') return;
         
         // Links are usually text only, so shape doesn't matter much but we avoid 'Circle'/Boxy shapes for pure links if possible
         if (isLink && shape.name !== 'Smooth') return; // Only one shape for Links

         // Skip Circle shape for Text-heavy buttons (unless specifically allowed)
         if (shape.name === 'Circle' && (isTextCategory || isLongText) && !isFAB) {
             return;
         }

         // Construct the full class string
         // Note: If template has padding (px-6), and shape is Circle (p-0 w-12), shape class must win.
         let base = template.baseClasses;
         if (shape.name === 'Circle') {
             // Remove conflicting padding from base if shape forces it
             base = base.replace(/px-\d+/g, '').replace(/py-\d+/g, '').replace(/p-\d+/g, '');
             // FAB templates might already have 'p-4', so we need to be careful.
             // Our shape Circle class has p-0 w-12 h-12.
         }

         const combinedClasses = `${base} ${shape.class} ${colorClasses}`;
         
         // Generate a unique ID
         const id = `gen-${index}-${color}-${shape.name}`;
         
         // Create a descriptive name
         let displayName = `${color} ${template.name}`;
         if (shape.name !== 'Sharp' && !isLink) displayName += ` ${shape.name}`;

         library.push({
             id,
             name: displayName,
             category: template.category,
             classes: combinedClasses.trim().replace(/\s+/g, ' '),
             tags: [template.category.toLowerCase(), color.toLowerCase(), shape.name.toLowerCase()]
         });
      });
    });
  });

  return [...SPECIAL_BUTTONS, ...library];
};

const INITIAL_LIBRARY = generateLibrary();

const App: React.FC = () => {
  const [buttons] = useState<ButtonStyle[]>(INITIAL_LIBRARY);
  const [selectedCategory, setSelectedCategory] = useState<ButtonCategory>(ButtonCategory.ALL);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Categories list for navbar matching the enum
  const categories = [
    { id: ButtonCategory.ALL, icon: Grid },
    { id: ButtonCategory.PRIMARY, icon: Layout },
    { id: ButtonCategory.SECONDARY, icon: Layers },
    { id: ButtonCategory.OUTLINE, icon: SquareDashedBottom },
    { id: ButtonCategory.GHOST, icon: Ghost },
    { id: ButtonCategory.FAB, icon: PlusCircle },
    { id: ButtonCategory.LINK, icon: LinkIcon },
    { id: ButtonCategory.DESTRUCTIVE, icon: AlertTriangle },
    { id: ButtonCategory.SUCCESS, icon: CheckCircle },
    { id: ButtonCategory.WARNING, icon: AlertTriangle },
    { id: ButtonCategory.INFO, icon: Info },
    { id: ButtonCategory.HOVER, icon: MousePointer2 },
    { id: ButtonCategory.CLICK, icon: Fingerprint }, 
    { id: ButtonCategory.LOADING, icon: Sparkles }, 
    { id: ButtonCategory.TEXT, icon: Type }, 
    { id: ButtonCategory.ICON, icon: PlayCircle }, 
    { id: ButtonCategory.SHAPE, icon: Shapes }, 
    { id: ButtonCategory.THREE_D, icon: Move3d }, 
    { id: ButtonCategory.SPECIAL, icon: Star },
    { id: ButtonCategory.STATE, icon: ToggleRight },
    { id: ButtonCategory.GRADIENT, icon: PaintBucket },
  ];

  const filteredButtons = useMemo(() => {
    let result = buttons;
    
    if (selectedCategory !== ButtonCategory.ALL) {
        result = result.filter(b => b.category === selectedCategory);
    }
    
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(b => 
            b.name.toLowerCase().includes(q) || 
            b.classes.toLowerCase().includes(q) ||
            b.tags.some(t => t.includes(q))
        );
    }
    
    return result;
  }, [buttons, selectedCategory, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* Fixed Header & Navigation */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-[1920px] mx-auto">
            {/* Top Bar: Logo & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:px-8 md:py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        ButtonVerse
                    </h1>
                    <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {buttons.length.toLocaleString()} styles
                    </span>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search colors, shapes, animations..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all hover:bg-neutral-900"
                    />
                </div>
            </div>

            {/* Category Navigation - Horizontal Scroll */}
            <div className="flex overflow-x-auto py-2 px-4 md:px-8 space-x-2 border-t border-neutral-800/50 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            selectedCategory === cat.id
                            ? 'bg-white text-neutral-950 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }`}
                    >
                        <cat.icon size={14} />
                        <span>{cat.id === ButtonCategory.ALL ? 'All' : cat.id.replace(/[0-9.]+\s/, '')}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-[1920px] mx-auto px-4 md:px-8 py-8">
          <div className="mb-6 flex items-center justify-between">
             <h2 className="text-xl font-semibold text-white">
                {selectedCategory}
             </h2>
             <span className="text-sm text-neutral-500">
                {filteredButtons.length} Results
             </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {filteredButtons.map((btn) => (
              <ButtonCard key={btn.id} button={btn} onCopy={showToast} />
            ))}
          </div>
          
          {filteredButtons.length === 0 && (
             <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-neutral-800 border-dashed mt-8">
                 <div className="bg-neutral-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-neutral-600" size={24} />
                 </div>
                 <p className="text-neutral-400 text-lg font-medium">No matches found</p>
                 <p className="text-neutral-500 text-sm mt-1">Try adjusting your search terms</p>
                 <button onClick={() => { setSelectedCategory(ButtonCategory.ALL); setSearchQuery(''); }} className="mt-6 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-white transition-colors">
                    Clear Filters
                 </button>
             </div>
          )}
      </main>

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default App;