"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Linear interpolation for smoothing
function lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

interface ScrollStoryOptions {
    smoothing?: number;
    offset?: number;
    mode?: 'sticky' | 'viewport'; // 'sticky' = for pinned sections, 'viewport' = for standard reveal
}

export function useScrollStory(ref: React.RefObject<HTMLElement | null>, options: ScrollStoryOptions = {}) {
    const [progress, setProgress] = useState(0);
    const [smoothProgress, setSmoothProgress] = useState(0);

    const targetProgressRef = useRef(0);
    const animationFrameRef = useRef<number | undefined>(undefined);

    const smoothing = options.smoothing ?? 0.1;
    const mode = options.mode ?? 'sticky';

    const handleScroll = useCallback(() => {
        const container = ref.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerHeight = container.offsetHeight;

        let p = 0;

        if (mode === 'sticky') {
            // Logic for Pinned/Sticky sections (progress 0->1 as you scroll past the pinned content)
            const scrollDistance = containerHeight - windowHeight;
            if (scrollDistance <= 0) {
                // Not tall enough to scroll "through", so just instant finish
                p = rect.top <= 0 ? 1 : 0;
            } else {
                const currentScroll = -rect.top;
                p = currentScroll / scrollDistance;
            }
        } else {
            // Logic for Viewport/Reveal sections (progress 0->1 as element crosses viewport)
            // 0 = top of element enters bottom of screen
            // 1 = top of element hits top of screen (or custom offset)

            // Standard "Reveal": Start when top enters bottom (rect.top < windowHeight)
            // End when top reaches... let's say 20% from top? or just top (0).

            const startPoint = windowHeight;
            const endPoint = 0; // Top of screen

            // p = (startPoint - rect.top) / (startPoint - endPoint)
            //   = (windowHeight - rect.top) / windowHeight

            p = (windowHeight - rect.top) / windowHeight;
        }

        // Clamp
        p = Math.max(0, Math.min(1, p));

        targetProgressRef.current = p;
        setProgress(p);
    }, [ref, mode]);

    // Smooth Animation Loop
    useEffect(() => {
        const animate = () => {
            setSmoothProgress(prev => {
                const diff = targetProgressRef.current - prev;
                if (Math.abs(diff) < 0.0001) return targetProgressRef.current;
                return lerp(prev, targetProgressRef.current, smoothing);
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [smoothing]);

    // Attach Listeners
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [handleScroll]);

    return { progress, smoothProgress };
}
