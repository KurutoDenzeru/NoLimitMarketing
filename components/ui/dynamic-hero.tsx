"use client"
import React, { useEffect, useRef, useCallback } from 'react';

// Helper to parse 'rgb(r, g, b)' or 'rgba(r, g, b, a)' string to {r, g, b}
interface RgbColor {
    r: number
    g: number
    b: number
}

function parseRgbColor(colorString: string): RgbColor | null {
    if (!colorString) return null
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
    if (match) {
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
        }
    }
    return null
}
const HeroSection = ({
    heading = "Something you really want",
    tagline = "You can't live without this product. I'm sure of it.",
    buttonText = "Get Started",
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const targetRef = useRef<HTMLButtonElement | null>(null);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const isMouseInsideRef = useRef(false);

    const resolvedCanvasColorsRef = useRef({
        strokeStyle: { r: 128, g: 128, b: 128 }, // Default mid-gray
    });

    useEffect(() => {
        const tempElement = document.createElement('div');
        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);

        const updateResolvedColors = () => {
            tempElement.style.color = 'var(--foreground)';
            const computedFgColor = getComputedStyle(tempElement).color;
            const parsedFgColor = parseRgbColor(computedFgColor);
            if (parsedFgColor) {
                resolvedCanvasColorsRef.current.strokeStyle = parsedFgColor;
            } else {
                console.warn("HeroSection: Could not parse --foreground for canvas arrow. Using fallback.");
                const isDarkMode = document.documentElement.classList.contains('dark');
                resolvedCanvasColorsRef.current.strokeStyle = isDarkMode ? { r: 250, g: 250, b: 250 } : { r: 10, g: 10, b: 10 }; // Brighter fallback
            }
        };
        updateResolvedColors();
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.documentElement) {
                    updateResolvedColors();
                    break;
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => {
            observer.disconnect();
            if (tempElement.parentNode) {
                tempElement.parentNode.removeChild(tempElement);
            }
        };
    }, []);

    const drawArrow = useCallback(() => {
        if (!canvasRef.current || !targetRef.current || !ctxRef.current || !heroRef.current) return;
        if (!isMouseInsideRef.current) return;

        const targetEl = targetRef.current;
        const ctx = ctxRef.current;
        const mouse = mousePosRef.current;
        const heroRect = heroRef.current.getBoundingClientRect();

        // Mouse position relative to hero section
        const x0 = mouse.x;
        const y0 = mouse.y;
        if (x0 === null || y0 === null) return;

        // Only draw if mouse is inside hero section
        if (
            x0 < 0 ||
            y0 < 0 ||
            x0 > heroRect.width ||
            y0 > heroRect.height
        ) return;

        // Target button center relative to hero section
        const rect = targetEl.getBoundingClientRect();
        const cx = rect.left - heroRect.left + rect.width / 2;
        const cy = rect.top - heroRect.top + rect.height / 2;

        const a = Math.atan2(cy - y0, cx - x0);
        const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
        const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

        const midX = (x0 + x1) / 2;
        const midY = (y0 + y1) / 2;
        const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
        const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
        const controlX = midX;
        const controlY = midY + offset * t;

        const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
        const opacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500);

        const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
        ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(controlX, controlY, x1, y1);
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        ctx.restore();

        // Draw arrowhead
        const angle = Math.atan2(y1 - controlY, x1 - controlX);
        const headLength = 10 * (ctx.lineWidth / 1.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(
            x1 - headLength * Math.cos(angle - Math.PI / 6),
            y1 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x1, y1);
        ctx.lineTo(
            x1 - headLength * Math.cos(angle + Math.PI / 6),
            y1 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !targetRef.current || !heroRef.current) return;
        ctxRef.current = canvas.getContext("2d");
        const ctx = ctxRef.current;

        const updateCanvasSize = () => {
            const heroRect = heroRef.current!.getBoundingClientRect();
            canvas.width = heroRect.width;
            canvas.height = heroRect.height;
        };

        function handleMouseMove(e: MouseEvent): void {
            if (!heroRef.current) return;
            const heroRect = heroRef.current.getBoundingClientRect();
            const x = e.clientX - heroRect.left;
            const y = e.clientY - heroRect.top;
            // Only track if inside hero
            if (x >= 0 && y >= 0 && x <= heroRect.width && y <= heroRect.height) {
                mousePosRef.current = { x, y };
                isMouseInsideRef.current = true;
            } else {
                mousePosRef.current = { x: null, y: null };
                isMouseInsideRef.current = false;
            }
        }

        function handleMouseLeave() {
            mousePosRef.current = { x: null, y: null };
            isMouseInsideRef.current = false;
        }

        window.addEventListener("resize", updateCanvasSize);
        updateCanvasSize();

        if (heroRef.current) {
            heroRef.current.addEventListener("mousemove", handleMouseMove);
            heroRef.current.addEventListener("mouseleave", handleMouseLeave);
        }

        const animateLoop = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawArrow();
            }
            animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        };
        animateLoop();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (heroRef.current) {
                heroRef.current.removeEventListener("mousemove", handleMouseMove);
                heroRef.current.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [drawArrow]);

    return (
        <div ref={heroRef} className="bg-background text-foreground flex flex-col h-screen relative overflow-hidden">
            <div className="max-w-8xl mx-auto w-full flex-grow flex flex-col">
                <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col items-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center px-4">
                            {heading}
                        </h1>
                        <p className="mt-3 block text-muted-foreground text-center text-lg sm:text-xl lg:text-2xl font-medium px-4 max-w-xl">
                            {tagline}
                        </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            ref={targetRef}
                            className="py-2 px-6 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer transform hover:scale-105 active:scale-95"
                        >
                            {buttonText}
                        </button>
                    </div>
                </main>
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
        </div>
    );
};

export { HeroSection }