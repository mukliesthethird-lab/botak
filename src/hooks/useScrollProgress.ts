"use client";

import { useEffect, useState, RefObject, useCallback } from "react";

interface ScrollProgressOptions {
    offset?: number; // When to start tracking (0 = top of viewport)
    duration?: number; // How much scroll distance to complete (in vh units)
}

export function useScrollProgress(
    containerRef: RefObject<HTMLElement | null>,
    options: ScrollProgressOptions = {}
): number {
    const { offset = 0, duration = 100 } = options;
    const [progress, setProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const containerHeight = container.offsetHeight;

        // Calculate scroll progress within the container
        const scrollStart = windowHeight * (1 - offset / 100);
        const scrollEnd = -containerHeight + windowHeight;

        const totalScrollDistance = containerHeight - windowHeight;
        const currentScroll = scrollStart - rect.top;

        let newProgress = currentScroll / totalScrollDistance;
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

// Hook to get which phase is active based on scroll progress
export function useScrollPhase(progress: number, phaseCount: number): number {
    return Math.min(Math.floor(progress * phaseCount), phaseCount - 1);
}

// Hook to get progress within a specific phase (0-1)
export function usePhaseProgress(progress: number, phaseIndex: number, phaseCount: number): number {
    const phaseSize = 1 / phaseCount;
    const phaseStart = phaseIndex * phaseSize;
    const phaseEnd = (phaseIndex + 1) * phaseSize;

    if (progress < phaseStart) return 0;
    if (progress >= phaseEnd) return 1;

    return (progress - phaseStart) / phaseSize;
}
