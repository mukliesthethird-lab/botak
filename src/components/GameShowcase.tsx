"use client";

import { useRef, useState } from "react";
import { useScrollStory } from "@/hooks/useScrollStory";

interface Phase {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    outlineText: string;
    color: string;
    video: string;
    videoScale?: number;
}

const phases: Phase[] = [
    {
        id: 1,
        title: "VFX",
        subtitle: "VISUAL EFFECTS",
        description: "Explosive visual effects, particle systems, and cinematic compositing that bring imagination to reality.",
        outlineText: "EFFECTS",
        color: "#c45e3a",
        video: "/Take_U_YT.mp4",
        videoScale: 1.5
    },
    {
        id: 2,
        title: "MUSIC",
        subtitle: "MUSIC VIDEO",
        description: "Creative editing, color grading, and visual storytelling that captures the rhythm and emotion of sound.",
        outlineText: "RHYTHM",
        color: "#3a7ec4",
        video: "/cry_for_me_rui_part.mp4",
        videoScale: 1.5
    },
    {
        id: 3,
        title: "MOTION",
        subtitle: "ANIMATION",
        description: "Character animation, motion graphics, and 3D artistry that breathes life into every frame.",
        outlineText: "ANIMATE",
        color: "#8a3ac4",
        video: "/Till_Further_Notice_Insta.mp4"
    },
    {
        id: 4,
        title: "CREATE",
        subtitle: "CONTENT CREATION",
        description: "Gaming montages, vlogs, tutorials, and social media content that captivates and engages audiences.",
        outlineText: "CREATE",
        color: "#3ac48a",
        video: "/Insta.mp4",
        videoScale: 1.5
    }
];

export default function GameShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const { smoothProgress, progress } = useScrollStory(containerRef, { smoothing: 0.12 });

    // Use smoothProgress for animations
    const phaseCount = phases.length;
    const activePhase = Math.min(Math.floor(smoothProgress * phaseCount), phaseCount - 1);
    const phaseSize = 1 / phaseCount;
    const phaseStart = Math.max(0, activePhase) * phaseSize;
    const phaseProgress = Math.max(0, Math.min(1, (smoothProgress - phaseStart) / phaseSize));

    const currentPhase = phases[Math.max(0, activePhase)] || phases[0];

    // Calculate smooth color transition
    const nextPhaseIndex = Math.min(activePhase + 1, phaseCount - 1);
    const nextPhase = phases[nextPhaseIndex];

    return (
        <section
            ref={containerRef}
            className="scroll-showcase-container"
        >
            {/* Sticky Content */}
            <div className="scroll-showcase-sticky">
                {/* Animated Background Gradient */}
                <div
                    className="scroll-showcase-bg"
                    style={{
                        background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${currentPhase.color}15 0%, transparent 70%)`,
                    }}
                />

                {/* Animated Outline Background Text */}
                <div
                    className="scroll-outline-text"
                    style={{
                        transform: `translate(-50%, -50%) translateX(${(1 - phaseProgress) * 80}px) scale(${0.95 + phaseProgress * 0.05})`,
                        opacity: 0.03 + phaseProgress * 0.04,
                        color: currentPhase.color,
                    }}
                >
                    {currentPhase.outlineText}
                </div>

                {/* Corner Frame */}
                <div className="scroll-showcase-frame">
                    <div className="frame-corner frame-corner-tl" style={{ borderColor: `${currentPhase.color}30` }} />
                    <div className="frame-corner frame-corner-tr" style={{ borderColor: `${currentPhase.color}30` }} />
                    <div className="frame-corner frame-corner-bl" style={{ borderColor: `${currentPhase.color}30` }} />
                    <div className="frame-corner frame-corner-br" style={{ borderColor: `${currentPhase.color}30` }} />
                </div>

                {/* Main Content Grid */}
                <div className="scroll-showcase-content">
                    {/* Left Side - Text Content */}
                    <div className="scroll-showcase-text">
                        {/* Phase Number */}
                        <div
                            className="phase-number"
                            style={{
                                color: currentPhase.color,
                                transform: `translateY(${(1 - phaseProgress) * 15}px)`,
                                opacity: 0.3 + phaseProgress * 0.7,
                            }}
                        >
                            0{currentPhase.id}
                        </div>

                        {/* Subtitle */}
                        <div
                            className="phase-subtitle"
                            style={{
                                transform: `translateY(${(1 - phaseProgress) * 20}px)`,
                                opacity: 0.2 + phaseProgress * 0.8,
                            }}
                        >
                            {currentPhase.subtitle}
                        </div>

                        {/* Main Title */}
                        <h2
                            className="phase-title"
                            style={{
                                transform: `translateY(${(1 - phaseProgress) * 30}px)`,
                                opacity: 0.1 + phaseProgress * 0.9,
                                color: currentPhase.color,
                                textShadow: `0 0 60px ${currentPhase.color}40`,
                            }}
                        >
                            {currentPhase.title}
                        </h2>

                        {/* Description */}
                        <p
                            className="phase-description"
                            style={{
                                transform: `translateY(${(1 - phaseProgress) * 40}px)`,
                                opacity: Math.max(0, (phaseProgress - 0.2) * 1.25),
                            }}
                        >
                            {currentPhase.description}
                        </p>

                        {/* CTA Button */}
                        <div
                            className="phase-cta"
                            style={{
                                transform: `translateY(${(1 - phaseProgress) * 50}px)`,
                                opacity: Math.max(0, (phaseProgress - 0.4) * 1.7),
                            }}
                        >
                            <button
                                className="btn-pill"
                                onClick={() => setActiveVideo(currentPhase.video)}
                                style={{
                                    borderColor: `${currentPhase.color}50`,
                                    boxShadow: `0 0 30px ${currentPhase.color}20`,
                                }}
                            >
                                <span>Explore</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Visual Content */}
                    <div className="scroll-showcase-visual">
                        <div className="visual-container">
                            {phases.map((phase, index) => {
                                const isActive = activePhase === index;
                                const opacity = isActive ? 1 : 0;
                                const scale = isActive ? 1 + phaseProgress * 0.03 : 0.95;

                                return (
                                    <div
                                        key={phase.id}
                                        className="visual-image"
                                        style={{
                                            opacity,
                                            transform: `scale(${scale})`,
                                            zIndex: isActive ? 2 : 1,
                                        }}
                                    >
                                        <div
                                            className="visual-placeholder relative overflow-hidden"
                                            style={{
                                                borderColor: `${phase.color}25`,
                                                background: '#0a0a0a'
                                            }}
                                        >
                                            {/* Video Preview Background */}
                                            <video
                                                src={phase.video}
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 ease-out"
                                                style={{
                                                    transform: `scale(${phase.videoScale || 1})`
                                                }}
                                            />

                                            {/* Removed particles and scanlines */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Phase Indicators */}
                <div className="phase-indicators">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className={`phase-indicator ${activePhase === index ? 'active' : ''}`}
                            style={{
                                backgroundColor: activePhase === index ? phase.color : 'transparent',
                                borderColor: activePhase === index ? phase.color : 'rgba(255,255,255,0.15)',
                                transform: activePhase === index ? 'scale(1.3)' : 'scale(1)',
                                boxShadow: activePhase === index ? `0 0 20px ${phase.color}50` : 'none',
                            }}
                        >
                            <span
                                className="phase-indicator-label"
                                style={{ opacity: activePhase === index ? 1 : 0 }}
                            >
                                {phase.subtitle}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="scroll-progress-bar">
                    <div
                        className="scroll-progress-fill"
                        style={{
                            width: `${smoothProgress * 100}%`,
                            backgroundColor: currentPhase.color,
                            boxShadow: `0 0 10px ${currentPhase.color}`,
                        }}
                    />
                </div>

                {/* Scroll Hint */}
                <div
                    className="scroll-hint"
                    style={{
                        opacity: progress < 0.05 ? 1 : 0,
                        transform: `translateX(-50%) translateY(${progress < 0.05 ? 0 : 20}px)`,
                    }}
                >
                    <span>SCROLL TO EXPLORE</span>
                    <div className="scroll-hint-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>

                {/* Section Label */}
                <div className="scroll-section-label">
                    <span style={{ color: `${currentPhase.color}90` }}>●</span> OUR EXPERTISE
                </div>
            </div>
            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Blur Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-300"
                        onClick={() => setActiveVideo(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20 animate-in fade-in zoom-in duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all duration-300 backdrop-blur-sm border border-white/10 group"
                        >
                            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Video Player */}
                        <video
                            src={activeVideo}
                            controls
                            autoPlay
                            className="w-full h-full object-cover"
                            controlsList="nodownload"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
