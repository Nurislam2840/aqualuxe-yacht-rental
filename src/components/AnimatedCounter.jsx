import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ value, duration = 2, suffix = '' }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  const symbol = String(value).replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime;
          let animationFrame;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericValue));

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(numericValue);
            }
          };
          
          animationFrame = requestAnimationFrame(animate);
          
          setTimeout(() => {
            if (ref.current) observer.unobserve(ref.current);
          }, 100);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [numericValue, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {symbol}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;