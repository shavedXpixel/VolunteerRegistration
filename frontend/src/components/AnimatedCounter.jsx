import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const numericValue = parseInt(value.replace(/,/g, ''));
      const duration = 2000;
      const increment = numericValue / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = count >= 100000 
    ? count.toLocaleString('en-IN') + '+'
    : (count > 0 && typeof value === 'string' && value.includes('+') ? count.toLocaleString('en-IN') + '+' : count.toLocaleString('en-IN'));

  return (
    <div ref={ref} className="flex flex-col items-center p-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
        <Icon size={32} />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">
        {value === '0' ? '0' : displayValue}
      </h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
