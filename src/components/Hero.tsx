"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollStory } from "@/hooks/useScrollStory";

const phases = [
    {
        id: "intro",
        title: "BOTAK STUDIO",
        subtitle: "VISUAL ENGINEERING",
        description: "Where imagination meets rendering power.",
        color: "#ffffff",
        bgGradient: "from-black via-zinc-900 to-black",
        align: "center"
    },
    {
        id: "create",
        title: "WE FORGE",
        subtitle: "DIGITAL REALITIES",
        description: "Transcending the boundaries of traditional filmmaking.",
        color: "#E4405F",
        bgGradient: "from-black via-red-950/30 to-black",
        align: "left"
    },
    {
        id: "ignite",
        title: "IGNITE",
        subtitle: "YOUR VISION",
        description: "Turning abstract concepts into visceral experiences.",
        color: "#3a7ec4",
        bgGradient: "from-black via-blue-950/30 to-black",
        align: "right"
    },
    {
        id: "legacy",
        title: "LEGENDARY",
        subtitle: "STATUS AWAITS",
        description: "Join the revolution of visual storytelling.",
        color: "#3ac48a",
        bgGradient: "from-black via-emerald-950/30 to-black",
        align: "center"
    }
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Smooth scroll progress
    const { smoothProgress } = useScrollStory(containerRef, { smoothing: 0.05, mode: 'sticky' });
    const phaseCount = phases.length;

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black text-white font-sans !overflow-visible z-10">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">

                {/* 1. Dynamic Background Layers */}
                <div className="absolute inset-0 z-0">
                    {phases.map((phase, i) => {
                        // Calculate visibility based on scroll
                        const globalIndex = smoothProgress * (phaseCount - 0.5);
                        const dist = Math.abs(globalIndex - i);
                        const opacity = Math.max(0, 1 - dist * 1.5);

                        return (
                            <div
                                key={`bg-${phase.id}`}
                                className={`absolute inset-0 bg-gradient-to-b ${phase.bgGradient} transition-opacity duration-700 ease-out animate-aurora`}
                                style={{ opacity }}
                            />
                        );
                    })}

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise brightness-100 contrast-150 mix-blend-overlay"></div>

                    {/* Moving Grid - Subtle */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '100px 100px',
                            transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) perspective(500px) rotateX(60deg) translateY(${smoothProgress * 200}px)`,
                            transformOrigin: 'center 120%'
                        }}
                    />
                </div>

                {/* 2. Main Content Stack */}
                <div className="relative z-10 w-full max-w-7xl px-6 h-full flex items-center justify-center">
                    {phases.map((phase, index) => {
                        const globalIndex = smoothProgress * (phaseCount - 0.5);
                        const dist = globalIndex - index; // -1 (past), 0 (active), 1 (future)

                        // Core visibility math
                        const isActive = Math.abs(dist) < 0.6;
                        const opacity = Math.max(0, 1 - Math.abs(dist) * 1.5);

                        // 3D Transforms
                        // Items enter from bottom/back and exit top/front
                        const scale = 1 + dist * 0.4; // 0.6 -> 1.0 -> 1.4
                        const translateY = dist * -100; // Moves up as you scroll down
                        const rotateX = dist * -45; // Rotates slightly
                        const blur = Math.max(0, Math.abs(dist) * 8); // Blur everything except active

                        // Alignment logic
                        const alignClass = phase.align === 'left' ? 'items-start text-left' :
                            phase.align === 'right' ? 'items-end text-right' :
                                'items-center text-center';

                        return (
                            <div
                                key={phase.id}
                                className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center ${alignClass} pointer-events-none`}
                                style={{
                                    opacity,
                                    transform: `perspective(1000px) translate3d(0, ${translateY}px, ${dist * 100}px) rotateX(${rotateX}deg) scale(${Math.max(0.5, 1 - Math.abs(dist) * 0.5)})`,
                                    filter: `blur(${blur}px)`,
                                    willChange: 'transform, opacity, filter'
                                }}
                            >
                                {/* Decorative Label */}
                                <div className="overflow-hidden mb-4">
                                    <span className="inline-block text-xs md:text-sm font-mono text-white/60 tracking-[0.5em] uppercase border-b border-white/20 pb-2">
                                        {phase.id} // {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Main Title with Glow */}
                                <h1
                                    className={`text-6xl md:text-9xl font-black tracking-tighter text-white mb-2 mix-blend-screen ${isActive && index === 0 ? 'animate-glitch' : ''}`}
                                    style={{
                                        textShadow: isActive ? `0 0 30px ${phase.color}60` : 'none',
                                        transform: `translateX(${mousePos.x * (index + 1) * 0.5}px)` // Parallax text
                                    }}
                                >
                                    {phase.title}
                                </h1>

                                {/* Subtitle with Stroke Effect */}
                                <h2
                                    className="text-3xl md:text-5xl font-bold tracking-tight text-transparent mb-6"
                                    style={{
                                        WebkitTextStroke: `1px ${isActive ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                                        transform: `translateX(${mousePos.x * (index + 1) * 0.8}px)`
                                    }}
                                >
                                    {phase.subtitle}
                                </h2>

                                {/* Description */}
                                <p
                                    className="max-w-md text-lg md:text-xl text-white/70 font-light leading-relaxed"
                                    style={{
                                        transform: `translateX(${mousePos.x * (index + 1) * 0.2}px)`
                                    }}
                                >
                                    {phase.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Floating HUD Elements (Static Overlay) */}
                <div className="absolute bottom-10 left-10 z-20 hidden md:block">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>SYSTEM ONLINE</span>
                        <span>::</span>
                        <span>SCROLL VELOCITY: {Math.round(smoothProgress * 100)}%</span>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 z-20">
                    <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-full h-1/2 bg-white"
                            style={{ top: `${smoothProgress * 100}%` }}
                        />
                    </div>
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,black_120%)] z-20" />
            </div>
        </section>
    );
}
