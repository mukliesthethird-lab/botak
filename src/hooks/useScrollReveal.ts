"use client";

import { useEffect, useRef, useState, RefObject, useCallback } from "react";

// Lerp function for smooth animations
function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
    options: UseScrollRevealOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (triggerOnce) {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(element);
                    }
                } else {
                    setIsVisible(entry.isIntersecting);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

// Advanced smooth scroll reveal with lerp-based progress
interface UseSmoothRevealOptions {
    threshold?: number;
    rootMargin?: string;
    duration?: number; // Animation duration in seconds
}

export function useSmoothReveal<T extends HTMLElement>(
    options: UseSmoothRevealOptions = {}
): [RefObject<T | null>, number, boolean] {
    const { threshold = 0.1, rootMargin = "-50px" } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const targetProgress = useRef(0);
    const animationFrame = useRef<number | undefined>(undefined);

    // Smooth animation loop
    useEffect(() => {
        const animate = () => {
            setProgress(prev => {
                const diff = targetProgress.current - prev;
                if (Math.abs(diff) < 0.001) return targetProgress.current;
                return lerp(prev, targetProgress.current, 0.12);
            });
            animationFrame.current = requestAnimationFrame(animate);
        };

        animationFrame.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    // Intersection observer
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const visible = entry.isIntersecting;
                setIsVisible(visible);
                targetProgress.current = visible ? 1 : 0;
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, progress, isVisible];
}

// Scroll-linked progress (for parallax effects)
export function useScrollProgress(
    containerRef: RefObject<HTMLElement | null>,
    options: { offset?: number } = {}
): number {
    const { offset = 0 } = options;
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress from 0 (just entering bottom) to 1 (leaving top)
        const start = windowHeight;
        const end = -rect.height;
        const current = rect.top - offset;

        let newProgress = 1 - (current - end) / (start - end);
        newProgress = Math.max(0, Math.min(1, newProgress));

        setProgress(newProgress);
    }, [containerRef, offset]);

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [handleScroll]);

    return progress;
}

// Hook for staggered children reveal
export function useScrollRevealChildren(
    containerRef: RefObject<HTMLElement | null>,
    options: UseScrollRevealOptions = {}
) {
    const { threshold = 0.1, rootMargin = "0px" } = options;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [containerRef, threshold, rootMargin]);

    return isVisible;
}
