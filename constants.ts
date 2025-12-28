import { ButtonStyle, ButtonCategory } from "./types";

// ==========================================
// 🎨 COLOR PALETTES
// ==========================================

// Maps user requested color names to Tailwind/Arbitrary classes
const PALETTES = {
  Reds: {
    Red: 'red-600',
    Crimson: '[#DC143C]',
    FireBrick: '[#B22222]',
    LightCoral: '[#F08080]',
    Salmon: '[#FA8072]',
    Pink: 'pink-500',
    HotPink: 'pink-600',
    DeepPink: '[#FF1493]'
  },
  Oranges: {
    Orange: 'orange-500',
    DarkOrange: 'orange-600',
    Coral: '[#FF7F50]',
    Tomato: '[#FF6347]',
    Chocolate: '[#D2691E]',
    SaddleBrown: '[#8B4513]'
  },
  Yellows: {
    Gold: 'yellow-500',
    Yellow: 'yellow-400',
    Khaki: '[#F0E68C]'
  },
  Greens: {
    Green: 'green-600',
    Lime: 'lime-500',
    ForestGreen: '[#228B22]',
    SeaGreen: '[#2E8B57]',
    Olive: '[#808000]',
    Teal: 'teal-600'
  },
  Blues: {
    Blue: 'blue-600',
    RoyalBlue: '[#4169E1]',
    SkyBlue: 'sky-400',
    Cyan: 'cyan-500',
    Turquoise: '[#40E0D0]',
    Navy: '[#000080]'
  },
  Purples: {
    Purple: 'purple-600',
    Indigo: 'indigo-600',
    Violet: 'violet-600',
    Fuchsia: 'fuchsia-500',
    Lavender: '[#E6E6FA]'
  },
  Grays: {
    Black: 'black',
    Slate: 'slate-600',
    Zinc: 'zinc-600',
    Neutral: 'neutral-600'
  }
};

// Expanded color variants for functional button generation
// Included semantic mappings (Success=Emerald, Error=Red, etc)
const COLOR_VARIANTS = [
    { name: 'Blue', bg: 'bg-blue-600', bgLight: 'bg-blue-100', hover: 'hover:bg-blue-700', border: 'border-blue-600', text: 'text-blue-600', textDark: 'text-blue-900', ring: 'ring-blue-400', from: 'from-blue-600', to: 'to-blue-400' },
    { name: 'Red', bg: 'bg-red-600', bgLight: 'bg-red-100', hover: 'hover:bg-red-700', border: 'border-red-600', text: 'text-red-600', textDark: 'text-red-900', ring: 'ring-red-400', from: 'from-red-600', to: 'to-red-400' },
    { name: 'Emerald', bg: 'bg-emerald-600', bgLight: 'bg-emerald-100', hover: 'hover:bg-emerald-700', border: 'border-emerald-600', text: 'text-emerald-600', textDark: 'text-emerald-900', ring: 'ring-emerald-400', from: 'from-emerald-600', to: 'to-emerald-400' },
    { name: 'Violet', bg: 'bg-violet-600', bgLight: 'bg-violet-100', hover: 'hover:bg-violet-700', border: 'border-violet-600', text: 'text-violet-600', textDark: 'text-violet-900', ring: 'ring-violet-400', from: 'from-violet-600', to: 'to-violet-400' },
    { name: 'Amber', bg: 'bg-amber-500', bgLight: 'bg-amber-100', hover: 'hover:bg-amber-600', border: 'border-amber-500', text: 'text-amber-500', textDark: 'text-amber-900', ring: 'ring-amber-400', from: 'from-amber-500', to: 'to-amber-400' },
    { name: 'Rose', bg: 'bg-rose-500', bgLight: 'bg-rose-100', hover: 'hover:bg-rose-600', border: 'border-rose-500', text: 'text-rose-500', textDark: 'text-rose-900', ring: 'ring-rose-400', from: 'from-rose-500', to: 'to-rose-400' },
    { name: 'Cyan', bg: 'bg-cyan-500', bgLight: 'bg-cyan-100', hover: 'hover:bg-cyan-600', border: 'border-cyan-500', text: 'text-cyan-500', textDark: 'text-cyan-900', ring: 'ring-cyan-400', from: 'from-cyan-500', to: 'to-cyan-400' },
    { name: 'Fuchsia', bg: 'bg-fuchsia-600', bgLight: 'bg-fuchsia-100', hover: 'hover:bg-fuchsia-700', border: 'border-fuchsia-600', text: 'text-fuchsia-600', textDark: 'text-fuchsia-900', ring: 'ring-fuchsia-400', from: 'from-fuchsia-600', to: 'to-fuchsia-400' },
    { name: 'Indigo', bg: 'bg-indigo-600', bgLight: 'bg-indigo-100', hover: 'hover:bg-indigo-700', border: 'border-indigo-600', text: 'text-indigo-600', textDark: 'text-indigo-900', ring: 'ring-indigo-400', from: 'from-indigo-600', to: 'to-indigo-400' },
    { name: 'Lime', bg: 'bg-lime-500', bgLight: 'bg-lime-100', hover: 'hover:bg-lime-600', border: 'border-lime-500', text: 'text-lime-500', textDark: 'text-lime-900', ring: 'ring-lime-400', from: 'from-lime-500', to: 'to-lime-400' },
    { name: 'Slate', bg: 'bg-slate-800', bgLight: 'bg-slate-200', hover: 'hover:bg-slate-900', border: 'border-slate-800', text: 'text-slate-800', textDark: 'text-slate-900', ring: 'ring-slate-400', from: 'from-slate-700', to: 'to-slate-900' },
    { name: 'Black', bg: 'bg-black', bgLight: 'bg-gray-200', hover: 'hover:bg-neutral-900', border: 'border-black', text: 'text-black', textDark: 'text-black', ring: 'ring-gray-400', from: 'from-black', to: 'to-gray-800' },
];

const generateMap = (fn: (c: typeof COLOR_VARIANTS[0]) => string) => {
    const map: Record<string, string> = {};
    COLOR_VARIANTS.forEach(c => {
        map[c.name] = fn(c);
    });
    return map;
}

// Helper to filter color map for semantic buttons (e.g. only Red for Destructive)
const semanticMap = (allowedColors: string[], fn: (c: typeof COLOR_VARIANTS[0]) => string) => {
    const map: Record<string, string> = {};
    COLOR_VARIANTS.filter(c => allowedColors.includes(c.name)).forEach(c => {
        map[c.name] = fn(c);
    });
    return map;
}

// ==========================================
// 🏗️ FUNCTIONAL TEMPLATES (Primary, Secondary, etc.)
// ==========================================

const PRIMARY_TEMPLATES = [
    {
        name: "Solid Standard",
        baseClasses: "px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900",
        category: ButtonCategory.PRIMARY,
        colorMap: generateMap(c => `${c.bg} ${c.hover} ${c.ring}`)
    },
    {
        name: "Soft Glow",
        baseClasses: "px-6 py-2.5 font-semibold text-white transition-all duration-300",
        category: ButtonCategory.PRIMARY,
        colorMap: generateMap(c => `${c.bg} shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_theme('colors.${c.name.toLowerCase()}.${c.name === 'Black' ? '900' : '500'}')/40] hover:-translate-y-0.5`)
    },
    {
        name: "Vibrant Gradient",
        baseClasses: "px-6 py-2.5 font-bold text-white shadow-lg transition-transform hover:scale-105",
        category: ButtonCategory.PRIMARY,
        colorMap: generateMap(c => `bg-gradient-to-r ${c.from} ${c.to} hover:shadow-${c.name.toLowerCase()}-500/50`)
    },
    {
        name: "Press Depth",
        baseClasses: "px-6 py-2.5 font-bold text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all",
        category: ButtonCategory.PRIMARY,
        colorMap: generateMap(c => `${c.bg} border-${c.name.toLowerCase()}-800`)
    }
];

const SECONDARY_TEMPLATES = [
    {
        name: "Tinted Background",
        baseClasses: "px-6 py-2.5 font-semibold transition-colors duration-200",
        category: ButtonCategory.SECONDARY,
        colorMap: generateMap(c => `${c.bgLight} ${c.textDark} hover:bg-opacity-80`)
    },
    {
        name: "Gray Scale",
        baseClasses: "px-6 py-2.5 font-semibold bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border border-transparent hover:border-neutral-600",
        category: ButtonCategory.SECONDARY,
        colorMap: generateMap(c => `ring-offset-2 focus:ring-2 ${c.ring}`) // Just adds focus ring color
    },
    {
        name: "Muted Outline",
        baseClasses: "px-6 py-2.5 font-medium border-2 bg-transparent hover:bg-opacity-10 transition-all",
        category: ButtonCategory.SECONDARY,
        colorMap: generateMap(c => `border-neutral-700 text-neutral-300 hover:${c.text} hover:${c.border}`)
    }
];

const OUTLINE_TEMPLATES = [
    {
        name: "Thick Border",
        baseClasses: "px-6 py-2.5 font-bold border-[3px] bg-transparent hover:text-white transition-colors duration-300",
        category: ButtonCategory.OUTLINE,
        colorMap: generateMap(c => `${c.border} ${c.text} hover:${c.bg}`)
    },
    {
        name: "Thin Elegant",
        baseClasses: "px-6 py-2.5 font-medium border bg-transparent transition-all duration-300 hover:shadow-md",
        category: ButtonCategory.OUTLINE,
        colorMap: generateMap(c => `${c.border} ${c.text} hover:${c.bg} hover:text-white`)
    },
    {
        name: "Dashed Offset",
        baseClasses: "px-6 py-2.5 font-bold border-2 border-dashed bg-transparent transition-all hover:border-solid",
        category: ButtonCategory.OUTLINE,
        colorMap: generateMap(c => `${c.border} ${c.text}`)
    }
];

const GHOST_TEMPLATES = [
    {
        name: "Simple Text",
        baseClasses: "px-4 py-2 font-medium bg-transparent transition-colors hover:bg-neutral-800/50",
        category: ButtonCategory.GHOST,
        colorMap: generateMap(c => `${c.text}`)
    },
    {
        name: "Hover Underline",
        baseClasses: "px-4 py-2 font-bold bg-transparent relative after:absolute after:bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
        category: ButtonCategory.GHOST,
        colorMap: generateMap(c => `${c.text} after:${c.bg}`)
    },
    {
        name: "Dim to Bright",
        baseClasses: "px-4 py-2 font-medium bg-transparent text-neutral-500 transition-colors duration-300",
        category: ButtonCategory.GHOST,
        colorMap: generateMap(c => `hover:${c.text}`)
    }
];

const LINK_TEMPLATES = [
    {
        name: "Classic Link",
        baseClasses: "px-0 py-0 font-medium bg-transparent hover:underline underline-offset-4 decoration-2",
        category: ButtonCategory.LINK,
        colorMap: generateMap(c => `${c.text}`)
    },
    {
        name: "Arrow Reveal",
        baseClasses: "px-0 py-0 font-bold bg-transparent flex items-center gap-1 group",
        category: ButtonCategory.LINK,
        colorMap: generateMap(c => `${c.text} after:content-['→'] after:opacity-0 after:-translate-x-2 group-hover:after:opacity-100 group-hover:after:translate-x-0 after:transition-all`)
    }
];

const FAB_TEMPLATES = [
    {
        name: "Floating Standard",
        baseClasses: "p-4 rounded-full shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 active:scale-95 flex items-center justify-center",
        category: ButtonCategory.FAB,
        colorMap: generateMap(c => `${c.bg} text-white`)
    },
    {
        name: "Pulse Ring",
        baseClasses: "p-4 rounded-full shadow-md flex items-center justify-center relative",
        category: ButtonCategory.FAB,
        colorMap: generateMap(c => `${c.bg} text-white hover:animate-pulse`)
    },
    {
        name: "Glass FAB",
        baseClasses: "p-4 rounded-full shadow-lg backdrop-blur-lg border border-white/20 flex items-center justify-center transition-all hover:bg-opacity-50",
        category: ButtonCategory.FAB,
        colorMap: generateMap(c => `${c.bg} bg-opacity-30 text-white`)
    }
];

const SEMANTIC_TEMPLATES = [
    {
        name: "Destructive Alert",
        baseClasses: "px-6 py-2.5 font-bold text-white shadow-md hover:animate-shake",
        category: ButtonCategory.DESTRUCTIVE,
        colorMap: semanticMap(['Red', 'Rose'], c => `${c.bg} ${c.hover}`)
    },
    {
        name: "Destructive Outline",
        baseClasses: "px-6 py-2.5 font-bold border-2 bg-transparent transition-colors",
        category: ButtonCategory.DESTRUCTIVE,
        colorMap: semanticMap(['Red', 'Rose'], c => `${c.border} ${c.text} hover:${c.bg} hover:text-white`)
    },
    {
        name: "Success Pill",
        baseClasses: "px-6 py-2.5 font-bold text-white rounded-full shadow-sm flex items-center gap-2",
        category: ButtonCategory.SUCCESS,
        colorMap: semanticMap(['Emerald', 'Green', 'Lime', 'Teal'], c => `${c.bg} ${c.hover}`)
    },
    {
        name: "Warning Badge",
        baseClasses: "px-6 py-2.5 font-bold text-white rounded-md shadow-sm border-2 border-transparent hover:border-white/50 transition-all",
        category: ButtonCategory.WARNING,
        colorMap: semanticMap(['Amber', 'Orange', 'Yellow'], c => `${c.bg} ${c.hover}`)
    },
    {
        name: "Info Soft",
        baseClasses: "px-6 py-2.5 font-medium border",
        category: ButtonCategory.INFO,
        colorMap: semanticMap(['Blue', 'Sky', 'Cyan', 'Indigo'], c => `${c.bgLight} ${c.textDark} ${c.border}`)
    }
];

// ==========================================
// 🚀 1. HOVER ANIMATIONS
// ==========================================
const HOVER_TEMPLATES = [
    {
        name: "Fade In",
        baseClasses: "px-6 py-3 font-medium bg-transparent border-2 transition-colors duration-300",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.border} ${c.text} hover:text-white ${c.hover}`)
    },
    {
        name: "Slide Up BG",
        baseClasses: "px-6 py-3 font-bold text-white overflow-hidden relative group z-10",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `bg-neutral-800 before:absolute before:inset-0 before:${c.bg} before:translate-y-full before:transition-transform before:duration-300 before:-z-10 group-hover:before:translate-y-0`)
    },
    {
        name: "Liquid Fill",
        baseClasses: "px-6 py-3 font-bold text-white relative overflow-hidden group z-10",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `bg-transparent ${c.text} border-2 ${c.border} before:absolute before:top-full before:left-0 before:w-full before:h-full before:${c.bg} before:transition-transform before:duration-500 group-hover:before:-translate-y-full group-hover:text-white`)
    },
    {
        name: "Gradient Move",
        baseClasses: "px-6 py-3 font-bold text-white bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `bg-gradient-to-r ${c.from} via-white/20 ${c.to}`)
    },
    {
        name: "Ghost Lift",
        baseClasses: "px-6 py-3 font-medium bg-transparent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.text} hover:${c.bg} hover:text-white shadow-${c.name.toLowerCase()}-500/20`)
    },
    {
        name: "Neon Glow",
        baseClasses: "px-6 py-3 font-bold text-white transition-all duration-300",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.bg} hover:shadow-[0_0_20px_theme('colors.${c.name.toLowerCase()}.500')]`)
    },
    {
        name: "Border Draw",
        baseClasses: "px-6 py-3 font-bold bg-transparent relative before:absolute before:top-0 before:left-0 before:w-0 before:h-0.5 before:transition-all before:duration-300 hover:before:w-full after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.text} before:${c.bg} after:${c.bg}`)
    },
     {
        name: "Mask Reveal",
        baseClasses: "px-6 py-3 font-bold text-white overflow-hidden relative group",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.bg} after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] after:hover:translate-x-0 after:transition-transform after:duration-300`)
    },
    {
        name: "Shine Sweep",
        baseClasses: "px-6 py-3 font-bold text-white overflow-hidden relative group",
        category: ButtonCategory.HOVER,
        colorMap: generateMap(c => `${c.bg} after:absolute after:top-0 after:-left-[150%] after:w-[150%] after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:skew-x-12 after:hover:animate-[shimmer_1s_infinite]`)
    }
];

// ==========================================
// 🖱️ 2. CLICK ANIMATIONS
// ==========================================
const CLICK_TEMPLATES = [
    {
        name: "Scale Down",
        baseClasses: "px-6 py-3 font-bold text-white transition-transform active:scale-95 duration-100",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Elastic Rubber",
        baseClasses: "px-6 py-3 font-bold text-white active:animate-rubberBand",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Explosion Ring",
        baseClasses: "px-6 py-3 font-bold text-white transition-all active:ring-8 active:ring-opacity-0 duration-300",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg} active:${c.ring}`)
    },
    {
        name: "3D Press",
        baseClasses: "px-6 py-3 font-bold text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg} border-black/20`)
    },
    {
        name: "Flash",
        baseClasses: "px-6 py-3 font-bold text-white active:brightness-150 transition-all",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Ripple Effect",
        baseClasses: "px-6 py-3 font-bold text-white relative overflow-hidden active:after:content-[''] active:after:absolute active:after:inset-0 active:after:bg-white/30 active:after:animate-ping",
        category: ButtonCategory.CLICK,
        colorMap: generateMap(c => `${c.bg}`)
    }
];

// ==========================================
// ⏳ 3. LOADING ANIMATIONS
// ==========================================
const LOADING_TEMPLATES = [
    {
        name: "Spinner Right",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-3 cursor-wait",
        category: ButtonCategory.LOADING,
        colorMap: generateMap(c => `${c.bg} after:w-4 after:h-4 after:border-2 after:border-white/30 after:border-t-white after:rounded-full after:animate-spin`)
    },
    {
        name: "Pulse BG",
        baseClasses: "px-6 py-3 font-bold text-white animate-pulse cursor-wait",
        category: ButtonCategory.LOADING,
        colorMap: generateMap(c => `${c.bg} opacity-80`)
    },
    {
        name: "Striped Moving",
        baseClasses: "px-6 py-3 font-bold text-white bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]",
        category: ButtonCategory.LOADING,
        colorMap: generateMap(c => `bg-gradient-to-r ${c.from} via-white/20 ${c.to}`)
    },
    {
        name: "Dots Flow",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-1",
        category: ButtonCategory.LOADING,
        colorMap: generateMap(c => `${c.bg} after:content-['...'] after:animate-pulse`)
    },
    {
        name: "Skeleton Shimmer",
        baseClasses: "px-12 py-4 rounded bg-neutral-800 animate-pulse",
        category: ButtonCategory.LOADING,
        colorMap: { "Gray": "" }
    }
];

// ==========================================
// 🔡 4. TEXT ANIMATIONS
// ==========================================
const TEXT_TEMPLATES = [
    {
        name: "Letter Spacing",
        baseClasses: "px-6 py-3 font-bold text-white transition-all duration-300 hover:tracking-[0.25em]",
        category: ButtonCategory.TEXT,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Glitch Text",
        baseClasses: "px-6 py-3 font-mono font-bold text-white hover:animate-glitch relative",
        category: ButtonCategory.TEXT,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Blur Reveal",
        baseClasses: "px-6 py-3 font-bold text-transparent bg-clip-text hover:text-white transition-all duration-300 hover:shadow-lg",
        category: ButtonCategory.TEXT,
        colorMap: generateMap(c => `bg-gradient-to-r ${c.from} ${c.to} shadow-${c.name.toLowerCase()}-500/50`)
    },
    {
        name: "Wobble Text",
        baseClasses: "px-6 py-3 font-bold text-white hover:animate-wobble",
        category: ButtonCategory.TEXT,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Typewriter",
        baseClasses: "px-6 py-3 font-mono font-bold text-white overflow-hidden whitespace-nowrap border-r-2 animate-typewriter",
        category: ButtonCategory.TEXT,
        colorMap: generateMap(c => `${c.bg} border-white`)
    }
];

// ==========================================
// 💠 5. ICON ANIMATIONS
// ==========================================
const ICON_TEMPLATES = [
    {
        name: "Icon Slide",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-2 group",
        category: ButtonCategory.ICON,
        colorMap: generateMap(c => `${c.bg} hover:pr-4 [&>svg]:transition-transform group-hover:[&>svg]:translate-x-1`)
    },
    {
        name: "Icon Rotate",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-2 group",
        category: ButtonCategory.ICON,
        colorMap: generateMap(c => `${c.bg} [&>svg]:transition-transform group-hover:[&>svg]:rotate-90`)
    },
    {
        name: "Icon Pop",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-2 group",
        category: ButtonCategory.ICON,
        colorMap: generateMap(c => `${c.bg} [&>svg]:transition-transform group-hover:[&>svg]:scale-125`)
    },
    {
        name: "Icon Bounce",
        baseClasses: "px-6 py-3 font-bold text-white flex items-center gap-2 group",
        category: ButtonCategory.ICON,
        colorMap: generateMap(c => `${c.bg} [&>svg]:group-hover:animate-bounce`)
    }
];

// ==========================================
// 📐 6. SHAPE & MORPH
// ==========================================
const SHAPE_TEMPLATES = [
    {
        name: "Round Morph",
        baseClasses: "px-6 py-3 font-bold text-white rounded-md hover:rounded-full transition-all duration-300",
        category: ButtonCategory.SHAPE,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Pill Expand",
        baseClasses: "px-8 py-3 font-bold text-white rounded-full hover:px-12 transition-all duration-300",
        category: ButtonCategory.SHAPE,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Blob Morph",
        baseClasses: "px-8 py-4 font-bold text-white rounded-[30%_70%_70%_30%/30%_30%_70%_70%] hover:rounded-[50%_50%_20%_80%/25%_80%_20%_75%] transition-all duration-500",
        category: ButtonCategory.SHAPE,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Squash",
        baseClasses: "px-6 py-3 font-bold text-white transition-transform active:scale-x-125 active:scale-y-75",
        category: ButtonCategory.SHAPE,
        colorMap: generateMap(c => `${c.bg}`)
    }
];

// ==========================================
// 🧊 7. 3D & DEPTH
// ==========================================
const THREE_D_TEMPLATES = [
    {
        name: "Retro 3D",
        baseClasses: "px-6 py-3 font-bold text-white border-b-4 border-r-4 active:border-0 active:translate-y-1 active:translate-x-1 transition-all",
        category: ButtonCategory.THREE_D,
        colorMap: generateMap(c => `${c.bg} border-black/30`)
    },
    {
        name: "Floating Shadow",
        baseClasses: "px-6 py-3 font-bold text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300",
        category: ButtonCategory.THREE_D,
        colorMap: generateMap(c => `${c.bg} shadow-${c.name.toLowerCase()}-500/30`)
    },
    {
        name: "Inner Depth",
        baseClasses: "px-6 py-3 font-bold text-gray-200 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.4)] active:shadow-[inset_0px_8px_8px_rgba(0,0,0,0.6)] transition-all",
        category: ButtonCategory.THREE_D,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Isometric",
        baseClasses: "px-6 py-3 font-bold text-white transform hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none",
        category: ButtonCategory.THREE_D,
        colorMap: generateMap(c => `${c.bg}`)
    }
];

// ==========================================
// ✨ 8. SPECIAL EFFECTS
// ==========================================
const SPECIAL_TEMPLATES = [
    {
        name: "Glassmorphism",
        baseClasses: "px-6 py-3 font-bold text-white backdrop-blur-md bg-opacity-20 border border-white/20 hover:bg-opacity-30 transition-all",
        category: ButtonCategory.SPECIAL,
        colorMap: generateMap(c => `${c.bg}`)
    },
    {
        name: "Cyber Punk",
        baseClasses: "px-8 py-3 font-mono font-bold text-black bg-yellow-400 border-2 border-transparent hover:bg-yellow-300 hover:text-red-600 hover:border-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] transition-all",
        category: ButtonCategory.SPECIAL,
        colorMap: { "Yellow": "" } // Fixed style
    },
    {
        name: "Neon Flicker",
        baseClasses: "px-6 py-3 font-bold text-transparent bg-clip-text border-2 hover:animate-pulse",
        category: ButtonCategory.SPECIAL,
        colorMap: generateMap(c => `bg-gradient-to-r ${c.from} ${c.to} ${c.border} shadow-[0_0_10px_theme('colors.${c.name.toLowerCase()}.500')]`)
    },
    {
        name: "Aurora Borealis",
        baseClasses: "px-6 py-3 font-bold text-white bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-size-200 animate-[shimmer_3s_linear_infinite]",
        category: ButtonCategory.SPECIAL,
        colorMap: { "Mix": "" }
    }
];

// ==========================================
// 🌈 GRADIENTS SPECIFIC
// ==========================================
const GRADIENT_BUTTONS: ButtonStyle[] = [
    {
        id: "grad-sunset",
        name: "Sunset Gradient",
        category: ButtonCategory.GRADIENT,
        classes: "px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg shadow-orange-500/30",
        tags: ["sunset", "orange", "pink"]
    },
    {
        id: "grad-ocean",
        name: "Ocean Breeze",
        category: ButtonCategory.GRADIENT,
        classes: "px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 hover:bg-size-200 transition-all duration-500",
        tags: ["blue", "ocean", "teal"]
    },
    {
        id: "grad-berry",
        name: "Berry Smoothie",
        category: ButtonCategory.GRADIENT,
        classes: "px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-br from-fuchsia-600 to-purple-800 border border-white/10 shadow-xl",
        tags: ["purple", "berry"]
    },
    {
        id: "grad-lush",
        name: "Lush Forest",
        category: ButtonCategory.GRADIENT,
        classes: "px-6 py-3 rounded-md font-bold text-white bg-gradient-to-r from-emerald-500 to-lime-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-shadow",
        tags: ["green", "nature"]
    },
    {
        id: "grad-fire",
        name: "Firestarter",
        category: ButtonCategory.GRADIENT,
        classes: "px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-tr from-red-600 to-orange-500 hover:animate-pulse",
        tags: ["fire", "red", "orange"]
    }
];

// ==========================================
// 📜 SCROLL & STATE
// ==========================================
const STATE_TEMPLATES = [
    {
        name: "Success Check",
        baseClasses: "px-6 py-3 font-bold text-white bg-emerald-500 flex items-center gap-2",
        category: ButtonCategory.STATE,
        colorMap: { "Emerald": "" }
    },
    {
        name: "Error Shake",
        baseClasses: "px-6 py-3 font-bold text-white bg-red-600 hover:animate-shake",
        category: ButtonCategory.STATE,
        colorMap: { "Red": "" }
    },
    {
        name: "Disabled Fade",
        baseClasses: "px-6 py-3 font-bold text-white bg-gray-400 opacity-50 cursor-not-allowed",
        category: ButtonCategory.STATE,
        colorMap: { "Gray": "" }
    },
    {
        name: "Toggle Switch",
        baseClasses: "px-6 py-3 font-bold text-white bg-neutral-700 active:bg-green-600 transition-colors",
        category: ButtonCategory.STATE,
        colorMap: { "Gray": "" }
    }
];

export const BASE_TEMPLATES = [
    ...PRIMARY_TEMPLATES,
    ...SECONDARY_TEMPLATES,
    ...OUTLINE_TEMPLATES,
    ...GHOST_TEMPLATES,
    ...LINK_TEMPLATES,
    ...FAB_TEMPLATES,
    ...SEMANTIC_TEMPLATES,
    ...HOVER_TEMPLATES,
    ...CLICK_TEMPLATES,
    ...LOADING_TEMPLATES,
    ...TEXT_TEMPLATES,
    ...ICON_TEMPLATES,
    ...SHAPE_TEMPLATES,
    ...THREE_D_TEMPLATES,
    ...SPECIAL_TEMPLATES,
    ...STATE_TEMPLATES
];

export const SPECIAL_BUTTONS = GRADIENT_BUTTONS;