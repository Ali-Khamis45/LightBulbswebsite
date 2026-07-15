import React from 'react';

export const ProductSVG = ({ type, isLit, lightColor = "#F6B100", glowColor = "rgba(246, 177, 0, 0.4)", className = "w-full h-full" }) => {
  const transitionClass = "transition-all duration-700 ease-in-out";
  
  // Custom filters for SVGs (only applied when lit)
  const filterId = `glow-filter-${type}`;
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Underlying CSS Light Beam Cone / Radial Glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl opacity-0 scale-50 transition-all duration-700 pointer-events-none ${
          isLit ? 'opacity-100 scale-100' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(246,177,0,0) 70%)`,
          mixBlendMode: 'screen',
          zIndex: 0
        }}
      />

      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full relative z-10 select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. CLASSIC FILAMENT BULB */}
        {type === "bulb" && (
          <g>
            {/* Light Cone behind */}
            {isLit && (
              <path 
                d="M 100 110 L 20 200 L 180 200 Z" 
                fill={`url(#beam-grad-bulb)`}
                opacity="0.15"
                className={transitionClass}
              />
            )}
            <defs>
              <linearGradient id="beam-grad-bulb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Screw Base */}
            <path d="M 85 140 H 115 V 145 H 85 Z" fill="#8C8C8C" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M 87 145 Q 100 152 113 145" fill="none" stroke="#4D4D4D" strokeWidth="2" />
            <path d="M 85 149 H 115 V 154 H 85 Z" fill="#8C8C8C" stroke="#4D4D4D" strokeWidth="1.5" />
            <path d="M 90 154 L 92 162 H 108 L 110 162 Z" fill="#3A3A3A" />

            {/* Glass Bulb Body */}
            <path 
              d="M 85 140 C 70 120 60 110 60 85 C 60 60 78 40 100 40 C 122 40 140 60 140 85 C 140 110 130 120 115 140 Z" 
              fill={isLit ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.02)"} 
              stroke={isLit ? lightColor : "#8B5E3C"} 
              strokeWidth="2.5" 
              className={transitionClass} 
            />

            {/* Internal Filament Support */}
            <path d="M 95 140 L 97 105 M 105 140 L 103 105" stroke="#7A7A7A" strokeWidth="1.2" />
            
            {/* Glowing Filament */}
            <path 
              d="M 97 105 Q 100 90 97 80 T 100 70 T 103 80 T 103 105" 
              fill="none" 
              stroke={isLit ? lightColor : "#555"} 
              strokeWidth={isLit ? "2.5" : "1.5"} 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />

            {/* Reflection highlights */}
            <path d="M 70 80 A 30 30 0 0 1 100 50" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          </g>
        )}

        {/* 2. CHANDELIER */}
        {type === "chandelier" && (
          <g>
            {/* Ambient light ring */}
            {isLit && (
              <circle cx="100" cy="115" r="45" fill={lightColor} opacity="0.1" filter={`url(#${filterId})`} className={transitionClass} />
            )}

            {/* Support Rod */}
            <line x1="100" y1="20" x2="100" y2="70" stroke="#7A7A7A" strokeWidth="2.5" />
            <path d="M 85 20 H 115 V 25 H 85 Z" fill="#8B5E3C" />

            {/* Main Metal Hub */}
            <path d="M 80 70 H 120 V 78 H 80 Z" fill="#8B5E3C" stroke="#5C4033" strokeWidth="1.5" />

            {/* Hanging Arms */}
            <path d="M 80 74 C 40 74 35 110 50 110" fill="none" stroke="#8B5E3C" strokeWidth="2" />
            <path d="M 120 74 C 160 74 165 110 150 110" fill="none" stroke="#8B5E3C" strokeWidth="2" />
            <path d="M 100 78 V 105" stroke="#8B5E3C" strokeWidth="2" />

            {/* Fluted Lights & Crystals */}
            {/* Center light */}
            <rect x="95" y="105" width="10" height="15" rx="2" fill="#D4AF37" />
            <circle 
              cx="100" 
              cy="125" 
              r="8" 
              fill={isLit ? "#FFF" : "#DDD"} 
              stroke={isLit ? lightColor : "#999"} 
              strokeWidth="1.5"
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />

            {/* Left light */}
            <rect x="45" y="102" width="10" height="15" rx="2" fill="#D4AF37" transform="rotate(-15, 50, 110)" />
            <circle 
              cx="46" 
              cy="121" 
              r="8" 
              fill={isLit ? "#FFF" : "#DDD"} 
              stroke={isLit ? lightColor : "#999"} 
              strokeWidth="1.5"
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />

            {/* Right light */}
            <rect x="145" y="102" width="10" height="15" rx="2" fill="#D4AF37" transform="rotate(15, 150, 110)" />
            <circle 
              cx="154" 
              cy="121" 
              r="8" 
              fill={isLit ? "#FFF" : "#DDD"} 
              stroke={isLit ? lightColor : "#999"} 
              strokeWidth="1.5"
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}

        {/* 3. WALL LIGHT (SCONCE) */}
        {type === "wall-light" && (
          <g>
            {/* Up and Down Beam Cones */}
            {isLit && (
              <g className={transitionClass}>
                {/* Up Beam */}
                <path d="M 100 85 L 60 20 H 140 Z" fill={`url(#beam-grad-wall-up)`} opacity="0.25" />
                {/* Down Beam */}
                <path d="M 100 115 L 50 180 H 150 Z" fill={`url(#beam-grad-wall-down)`} opacity="0.25" />
              </g>
            )}
            <defs>
              <linearGradient id="beam-grad-wall-up" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="beam-grad-wall-down" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Wall Mount Base */}
            <rect x="90" y="90" width="20" height="20" rx="2" fill="#4B5563" />

            {/* Connecting Arm */}
            <rect x="85" y="97" width="10" height="6" fill="#8B5E3C" />

            {/* Minimalist Cylinder Housing */}
            <rect 
              x="78" 
              y="75" 
              width="24" 
              height="50" 
              rx="4" 
              fill={isLit ? "#1F2937" : "#374151"} 
              stroke={isLit ? lightColor : "#8B5E3C"} 
              strokeWidth="2"
              className={transitionClass} 
            />

            {/* Light emission panels */}
            <ellipse cx="90" cy="75" rx="8" ry="3" fill={isLit ? "#FFF" : "#777"} className={transitionClass} />
            <ellipse cx="90" cy="125" rx="8" ry="3" fill={isLit ? "#FFF" : "#777"} className={transitionClass} />
          </g>
        )}

        {/* 4. TABLE LAMP */}
        {type === "table-lamp" && (
          <g>
            {/* Downward light cone */}
            {isLit && (
              <path 
                d="M 100 80 L 30 180 H 170 Z" 
                fill={`url(#beam-grad-table)`}
                opacity="0.25"
                className={transitionClass}
              />
            )}
            <defs>
              <linearGradient id="beam-grad-table" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Heavy Base (Travertine style) */}
            <rect x="80" y="140" width="40" height="35" rx="4" fill="#D2B48C" stroke="#8B5E3C" strokeWidth="1.5" />
            <rect x="85" y="145" width="30" height="5" fill="#EEDC82" opacity="0.3" /> {/* Travertine pattern */}

            {/* Brass Neck */}
            <line x1="100" y1="140" x2="100" y2="80" stroke="#8B5E3C" strokeWidth="3" />

            {/* Lamp Shade (Dome) */}
            <path 
              d="M 65 80 C 65 50 135 50 135 80 Z" 
              fill={isLit ? "#8B5E3C" : "#5C4033"} 
              stroke={isLit ? lightColor : "#3A2A20"} 
              strokeWidth="2"
              className={transitionClass} 
            />

            {/* Bulb glow inside shade */}
            <circle 
              cx="100" 
              cy="80" 
              r="6" 
              fill={isLit ? "#FFF" : "#444"} 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}

        {/* 5. FLOOR LAMP */}
        {type === "floor-lamp" && (
          <g>
            {/* Wide cone light */}
            {isLit && (
              <path 
                d="M 115 50 L 20 190 H 180 Z" 
                fill={`url(#beam-grad-floor)`}
                opacity="0.22"
                className={transitionClass}
              />
            )}
            <defs>
              <linearGradient id="beam-grad-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Iron Base */}
            <ellipse cx="100" cy="180" rx="35" ry="8" fill="#374151" stroke="#1F2937" strokeWidth="2" />

            {/* Tall Stem */}
            <line x1="100" y1="180" x2="100" y2="45" stroke="#8B5E3C" strokeWidth="2.5" />

            {/* Curved Arm */}
            <path d="M 100 45 Q 100 30 115 35" fill="none" stroke="#8B5E3C" strokeWidth="2.5" />

            {/* Hanging Shade */}
            <path 
              d="M 105 52 L 125 52 L 130 38 L 100 38 Z" 
              fill={isLit ? "#F9FAF_B" : "#D1D5DB"} 
              stroke={isLit ? lightColor : "#6B7280"} 
              strokeWidth="1.5"
              className={transitionClass} 
            />

            {/* Light source */}
            <circle 
              cx="115" 
              cy="52" 
              r="5" 
              fill={isLit ? "#FFF" : "#666"} 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}

        {/* 6. CEILING LIGHT */}
        {type === "ceiling-light" && (
          <g>
            {/* Radial glow around flush mount */}
            {isLit && (
              <ellipse 
                cx="100" 
                cy="80" 
                rx="70" 
                ry="25" 
                fill={lightColor} 
                opacity="0.25" 
                filter={`url(#${filterId})`} 
                className={transitionClass} 
              />
            )}

            {/* Ceiling surface mount line */}
            <line x1="40" y1="70" x2="160" y2="70" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />

            {/* Outer Rim */}
            <ellipse 
              cx="100" 
              cy="80" 
              rx="55" 
              ry="16" 
              fill={isLit ? "white" : "#FAF9F6"} 
              stroke={isLit ? lightColor : "#8B5E3C"} 
              strokeWidth="3.5"
              className={transitionClass}
            />

            {/* Inner Opal Diffuser */}
            <ellipse 
              cx="100" 
              cy="80" 
              rx="45" 
              ry="11" 
              fill={isLit ? "#FFF" : "#E5E7EB"} 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}

        {/* 7. PENDANT LIGHT */}
        {type === "pendant-light" && (
          <g>
            {/* Hanging Cord */}
            <line x1="100" y1="20" x2="100" y2="90" stroke="#111" strokeWidth="1.5" />
            <path d="M 90 20 H 110 V 24 H 90 Z" fill="#8B5E3C" />

            {/* Cone beam */}
            {isLit && (
              <path 
                d="M 100 110 L 25 190 H 175 Z" 
                fill={`url(#beam-grad-pendant)`}
                opacity="0.28"
                className={transitionClass}
              />
            )}
            <defs>
              <linearGradient id="beam-grad-pendant" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lightColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Glass Globe Shade */}
            <circle 
              cx="100" 
              cy="110" 
              r="26" 
              fill={isLit ? "rgba(255,255,255,0.18)" : "rgba(139,94,60,0.06)"} 
              stroke={isLit ? lightColor : "#8B5E3C"} 
              strokeWidth="2" 
              className={transitionClass} 
            />

            {/* Brass Fixture Cap */}
            <rect x="92" y="84" width="16" height="8" rx="1" fill="#8B5E3C" />

            {/* Filament Glow inside globe */}
            <circle 
              cx="100" 
              cy="110" 
              r="7" 
              fill={isLit ? "#FFF" : "#777"} 
              stroke={isLit ? lightColor : "none"} 
              strokeWidth="1"
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}

        {/* 8. OUTDOOR LIGHT */}
        {type === "outdoor-light" && (
          <g>
            {/* Hanging chain / Wall mount */}
            <path d="M 100 20 V 45" stroke="#1F2937" strokeWidth="2" />
            <path d="M 85 20 H 115 V 25 H 85 Z" fill="#1F2937" />

            {/* Soft Ambient Light Glow */}
            {isLit && (
              <circle 
                cx="100" 
                cy="100" 
                r="38" 
                fill={lightColor} 
                opacity="0.18" 
                filter={`url(#${filterId})`}
                className={transitionClass} 
              />
            )}

            {/* Metal Frame Housing */}
            <rect 
              x="75" 
              y="45" 
              width="50" 
              height="85" 
              rx="4" 
              fill="none" 
              stroke="#1F2937" 
              strokeWidth="3.5" 
            />
            {/* Top Roof */}
            <path d="M 65 45 L 100 28 L 135 45 Z" fill="#1F2937" stroke="#1F2937" strokeWidth="1.5" />
            {/* Glass panel panes */}
            <line x1="75" y1="87" x2="125" y2="87" stroke="#1F2937" strokeWidth="1.5" />
            <line x1="100" y1="45" x2="100" y2="130" stroke="#1F2937" strokeWidth="1.5" />

            {/* Vintage Bulb */}
            <circle 
              cx="100" 
              cy="85" 
              r="10" 
              fill={isLit ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.02)"} 
              stroke={isLit ? lightColor : "#888"} 
              strokeWidth="1.2" 
              className={transitionClass} 
            />
            <path 
              d="M 100 78 V 92" 
              stroke={isLit ? lightColor : "#444"} 
              strokeWidth="2.2" 
              filter={isLit ? `url(#${filterId})` : "none"} 
              className={transitionClass} 
            />
          </g>
        )}

        {/* 9. SMART BULB (Tunable RGB) */}
        {type === "smart-light" && (
          <g>
            {/* Pulsing smart light cone */}
            {isLit && (
              <path 
                d="M 100 110 L 10 200 H 190 Z" 
                fill={`url(#beam-grad-smart)`}
                opacity="0.22"
                className={transitionClass}
              />
            )}
            <defs>
              <linearGradient id="beam-grad-smart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Standard Smart Base */}
            <path d="M 85 140 H 115 V 145 H 85 Z" fill="#555" stroke="#333" strokeWidth="1" />
            <path d="M 88 145 H 112 V 151 H 88 Z" fill="#666" />
            <path d="M 90 151 L 93 160 H 107 L 110 160 Z" fill="#222" />

            {/* Aluminum Heat Sink Base (Smart Profile) */}
            <path 
              d="M 82 140 L 75 110 H 125 L 118 140 Z" 
              fill={isLit ? "#374151" : "#4B5563"} 
              stroke={isLit ? lightColor : "#374151"} 
              strokeWidth="1.5"
              className={transitionClass} 
            />

            {/* Opal Dome */}
            <path 
              d="M 75 110 C 60 90 60 65 100 65 C 140 65 140 90 125 110 Z" 
              fill={isLit ? "white" : "#E5E7EB"} 
              stroke={isLit ? lightColor : "#9CA3AF"} 
              strokeWidth="2.5" 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />

            {/* Decorative Smart Ring */}
            <path 
              d="M 75 110 H 125" 
              stroke={isLit ? "#EC4899" : "#6B7280"} 
              strokeWidth="2" 
              className={transitionClass} 
            />
          </g>
        )}

        {/* 10. DECORATIVE STARBURST LAMP */}
        {type === "decorative-lamp" && (
          <g>
            {/* Starburst rays when lit */}
            {isLit && (
              <g opacity="0.35" filter={`url(#${filterId})`} className={transitionClass}>
                <line x1="100" y1="85" x2="30" y2="40" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="170" y2="40" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="25" y2="105" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="175" y2="105" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="50" y2="170" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="150" y2="170" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="100" y1="85" x2="100" y2="15" stroke={lightColor} strokeWidth="2.5" strokeDasharray="3 3" />
              </g>
            )}

            {/* Terrazzo Concrete Base */}
            <rect x="70" y="125" width="60" height="35" rx="3" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
            {/* Concrete speckles */}
            <circle cx="80" cy="135" r="1.5" fill="#374151" opacity="0.3" />
            <circle cx="110" cy="140" r="1" fill="#FEF3C7" opacity="0.5" />
            <circle cx="95" cy="150" r="1.5" fill="#1F2937" opacity="0.3" />
            <circle cx="120" cy="133" r="1" fill="#4B5563" opacity="0.4" />

            {/* Crystal Geometric Cage / Shade */}
            <path 
              d="M 100 50 L 65 85 L 75 125 H 125 L 135 85 Z" 
              fill={isLit ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.02)"} 
              stroke={isLit ? lightColor : "#8B5E3C"} 
              strokeWidth="2.5"
              className={transitionClass} 
            />

            {/* Inner facet lines for crystal look */}
            <line x1="100" y1="50" x2="100" y2="125" stroke={isLit ? lightColor : "#8B5E3C"} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="65" y1="85" x2="135" y2="85" stroke={isLit ? lightColor : "#8B5E3C"} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="100" y1="85" x2="75" y2="125" stroke={isLit ? lightColor : "#8B5E3C"} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="100" y1="85" x2="125" y2="125" stroke={isLit ? lightColor : "#8B5E3C"} strokeWidth="1" strokeOpacity="0.4" />

            {/* Pin G4 Light Source center */}
            <circle 
              cx="100" 
              cy="85" 
              r="8" 
              fill={isLit ? "white" : "#777"} 
              filter={isLit ? `url(#${filterId})` : "none"}
              className={transitionClass} 
            />
          </g>
        )}
      </svg>
    </div>
  );
};
