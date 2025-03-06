
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: '#9f5eff',
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    particlesRef.current = particles;

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY - window.scrollY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Interactive behavior: react to mouse proximity
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.speedX -= Math.cos(angle) * force * 0.02;
          particle.speedY -= Math.sin(angle) * force * 0.02;
          
          // Limit speed
          const maxSpeed = 2;
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(159, 94, 255, ${particle.alpha})`;
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
          ctx.beginPath();
          ctx.strokeStyle = `rgba(159, 94, 255, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default InteractiveParticles;
