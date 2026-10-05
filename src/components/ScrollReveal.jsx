import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // একবার দেখা গেলে observer বন্ধ
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up': return 'opacity-0 translate-y-10';
        case 'fade-down': return 'opacity-0 -translate-y-10';
        case 'fade-left': return 'opacity-0 translate-x-10';
        case 'fade-right': return 'opacity-0 -translate-x-10';
        case 'zoom-in': return 'opacity-0 scale-90';
        case 'zoom-out': return 'opacity-0 scale-110';
        case 'fade': return 'opacity-0';
        default: return 'opacity-0 translate-y-10';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;