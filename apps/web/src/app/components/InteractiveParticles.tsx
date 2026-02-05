import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  originalAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size to match container with device pixel ratio for sharper rendering
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles
    const particleCount = Math.min(70, Math.max(30, Math.floor(window.innerWidth / 30)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const alpha = Math.random() * 0.5 + 0.1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5, // Slightly larger particles
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: '#9f5eff',
        alpha,
        originalAlpha: alpha,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
        pulseSpeed: 0.03 + Math.random() * 0.02, // Random pulse speed
      });
    }

    particlesRef.current = particles;

    // Mouse events with throttling
    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 16) return; // Throttle to ~60fps
      
      lastMoveTime = now;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY - window.scrollY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with requestAnimationFrame timing
    let lastTime = 0;
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas with slight fade effect for trails
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Scale movement by deltaTime for consistent speed regardless of framerate
        const timeScale = deltaTime / 16.67; // normalize to 60fps
        
        // Move particles
        particle.x += particle.speedX * timeScale;
        particle.y += particle.speedY * timeScale;
        
        // Wrap around edges
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        
        // Interactive behavior: react to mouse proximity
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          // Repel from mouse with easing
          particle.speedX -= Math.cos(angle) * force * 0.02 * timeScale;
          particle.speedY -= Math.sin(angle) * force * 0.02 * timeScale;
          
          // Increase opacity near mouse
          particle.alpha = Math.min(1, particle.originalAlpha + force * 0.5);
          
          // Limit speed
          const maxSpeed = 2;
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        } else {
          // Gradually return to original alpha
          particle.alpha = particle.alpha * 0.95 + particle.originalAlpha * 0.05;
        }
        
        // Apply slight drag for natural movement
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Update pulse effect
        particle.pulsePhase += particle.pulseSpeed * timeScale;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.2;
        
        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2 * pulseScale
        );
        gradient.addColorStop(0, `rgba(159, 94, 255, ${particle.alpha})`);
        gradient.addColorStop(1, 'rgba(159, 94, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Connect particles with lines
        connectParticles(particle, index);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Draw lines between particles that are close to each other
    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Calculate line opacity based on distance and particle alphas
          const lineOpacity = 0.1 * (1 - distance / 100) * 
                             ((particle.alpha + otherParticle.alpha) / 2);
          
          // Draw connection line with gradient
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            otherParticle.x, otherParticle.y
          );
          gradient.addColorStop(0, `rgba(159, 94, 255, ${lineOpacity * particle.alpha})`);
          gradient.addColorStop(1, `rgba(159, 94, 255, ${lineOpacity * otherParticle.alpha})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-0 animate-fade-in"
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        animation: 'fadeIn 1s ease-out forwards',
      }}
    />
  );
};

export default InteractiveParticles;
