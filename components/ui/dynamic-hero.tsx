"use client"
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Button } from "@/components/ui/button"
import { AnimatedContainer } from '@/components/ui/animated-container';
import { HeroAnalysisDialog } from "@/components/HeroAnalysisDialog";
import { Badge } from "@/components/ui/badge";
import { PhoneCall } from "lucide-react";

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
    tagline = "You can&apos;t live without this product. I&apos;m sure of it.",
    buttonText = "Get Started",
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const targetRef = useRef<HTMLButtonElement | null>(null);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const mousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const isMouseInsideRef = useRef(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

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

    // Update drawArrow to use viewport coordinates
    const drawArrow = useCallback(() => {
        if (!canvasRef.current || !targetRef.current || !ctxRef.current) return;
        const ctx = ctxRef.current;
        const mouse = mousePosRef.current;
        if (mouse.x === null || mouse.y === null) return;
        // Target button center in viewport
        const rect = targetRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Arrow coordinates relative to canvas (canvas covers viewport)
        const startX = mouse.x;
        const startY = mouse.y;
        const endX = cx;
        const endY = cy;
        const a = Math.atan2(endY - startY, endX - startX);
        const x1 = endX - Math.cos(a) * (rect.width / 2 + 12);
        const y1 = endY - Math.sin(a) * (rect.height / 2 + 12);
        const midX = (startX + x1) / 2;
        const midY = (startY + y1) / 2;
        const offset = Math.min(200, Math.hypot(x1 - startX, y1 - startY) * 0.5);
        const t = Math.max(-1, Math.min(1, (startY - y1) / 200));
        const controlX = midX;
        const controlY = midY + offset * t;
        const r = Math.sqrt((x1 - startX) ** 2 + (y1 - startY) ** 2);
        const opacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500);
        const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
        ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
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

    // Track mouse position globally for both hero and jumbotron
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !targetRef.current) return;
        ctxRef.current = canvas.getContext("2d");

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", updateCanvasSize);
        updateCanvasSize();

        function handleMouseMove(e: MouseEvent): void {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
            isMouseInsideRef.current = true;
        }
        function handleMouseLeave() {
            mousePosRef.current = { x: null, y: null };
            isMouseInsideRef.current = false;
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const animateLoop = () => {
            if (ctxRef.current && canvas) {
                ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
                drawArrow();
            }
            animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        };
        animateLoop();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [drawArrow]);

    return (
        <AnimatedContainer className="bg-background text-foreground flex flex-col relative overflow-hidden">
            <div ref={heroRef}>
                <div className="max-w-8xl mx-auto w-full flex-grow flex flex-col">
                    <main className="flex-grow flex flex-col items-center justify-center my-12 sm:my-16 lg:my-24">
                        <div className="flex flex-col items-center">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center px-4">
                                {heading}
                            </h1>
                            <p className="mt-3 block text-muted-foreground text-center text-lg sm:text-xl lg:text-2xl font-medium px-4 max-w-xl">
                                {tagline}
                            </p>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Button
                                ref={targetRef}
                                className="py-6 px-12 text-xl rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer transform hover:scale-105 active:scale-95"
                                onClick={() => setDialogOpen(true)}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    </main>
                </div>
                <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
            </div>
            {/* Jumbotron */}
            <AnimatedContainer className="w-full py-10 lg:py-20">
                <div className="max-w-8xl mx-auto px-4">
                    <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                        <div>
                            <Badge>Get started</Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                                Marketing is important...
                            </h3>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                                However, there are already 101 things on your to-do list
                                and they are all important!
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <a href="tel:+16692499127" tabIndex={0}>
                                <Button className="gap-4 cursor-pointer" variant="outline">
                                    Jump on a call <PhoneCall className="w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </AnimatedContainer>
            <HeroAnalysisDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
        </AnimatedContainer>
    );
};

export { HeroSection }