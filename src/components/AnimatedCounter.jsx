import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  // Extract numeric value from string like "500+" or "98%"
  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  const symbol = String(value).replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {count}
      {symbol}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;