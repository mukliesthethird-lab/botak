"use client";

import { useState, useEffect } from "react";

const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Floating Pill Navbar */}
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <div
                    className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${scrolled
                        ? "w-[min(90vw,850px)] py-4 px-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
                        : "w-[min(90vw,1200px)] py-6 px-6 bg-transparent border-transparent"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="#home" className={`relative z-10 font-bold tracking-[0.2em] transition-all duration-500 flex items-center gap-2 ${scrolled ? "text-sm pl-4" : "text-xl"}`}>
                            <img
                                src="/Botak.webp"
                                alt="Botak Logo"
                                className={`object-cover rounded-full transition-all duration-500 ${scrolled ? "w-8 h-8" : "w-10 h-10"}`}
                            />
                            BOTAK
                        </a>

                        {/* Desktop Menu */}
                        <nav className={`hidden md:flex items-center gap-2 transition-all duration-500 ${scrolled ? "opacity-100" : "opacity-0 translate-x-10 pointer-events-none"}`}>
                            {scrolled && navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="px-5 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 relative z-10">
                            <a
                                href="#contact"
                                className={`
                                    overflow-hidden relative group flex items-center justify-center
                                    transition-all duration-500 cursor-pointer
                                    ${scrolled
                                        ? "w-10 h-10 rounded-full bg-white text-black"
                                        : "px-6 py-2.5 bg-white text-black text-xs font-bold tracking-widest hover:bg-[var(--accent)]"
                                    }
                                `}
                            >
                                <span className={`absolute transition-all duration-300 ${scrolled ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}>
                                    HIRE
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-all duration-300 ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 absolute"}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>

                            {/* Hamburger (Visible when not scrolled or mobile) */}
                            {/* Hamburger (Visible on mobile always, desktop only when not scrolled) */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className={`w-10 h-10 flex flex-col items-end justify-center gap-[5px] group cursor-pointer ${scrolled ? "flex md:hidden" : "flex"}`}
                            >
                                <span className="w-6 h-[2px] bg-white group-hover:w-8 group-hover:bg-[var(--accent)] transition-all duration-300" />
                                <span className="w-4 h-[2px] bg-white/80 group-hover:w-8 group-hover:bg-[var(--accent)] transition-all duration-300" />
                                <span className="w-5 h-[2px] bg-white group-hover:w-8 group-hover:bg-[var(--accent)] transition-all duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Fullscreen Menu Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-[#050505] transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? "clip-circle-full" : "clip-circle-0"
                    }`}
                style={{ clipPath: isOpen ? "circle(150% at 100% 0)" : "circle(0% at 95% 5%)" }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center group z-10"
                >
                    <span className="absolute w-6 h-px bg-white rotate-45" />
                    <span className="absolute w-6 h-px bg-white -rotate-45" />
                    <span className="absolute inset-0 border border-white/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-300" />
                </button>

                <div className="h-full flex flex-col items-center justify-center relative">
                    {navItems.map((item, i) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group relative text-5xl md:text-7xl font-bold tracking-tighter mb-4 hover:text-[var(--accent)] transition-all duration-300"
                            style={{
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0)" : "translateY(50px)",
                                transitionDelay: `${i * 100}ms`
                            }}
                        >
                            <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                0{i + 1}
                            </span>
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
