"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text,
  className = '',
  delay = 0.1,
  duration = 0.6,
  splitType = 'chars',
  tag = 'p',
  stagger = 0.05,
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center',
  id
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { 
    threshold, 
    margin: rootMargin,
    once: true 
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const splitText = (text, type) => {
    if (!mounted) {
      return text;
    }

    if (type === 'chars') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{
            duration: duration * 0.6,
            delay: index * stagger * 0.5,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    } else if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{
            duration: duration * 0.6,
            delay: index * stagger * 0.5,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ));
    } else if (type === 'lines') {
      return text.split('\n').map((line, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{
            duration: duration * 0.6,
            delay: index * stagger * 0.5,
            ease: "easeOut"
          }}
          style={{ display: 'block' }}
        >
          {line}
        </motion.span>
      ));
    }
    return text;
  };

  const renderTag = () => {
    const textAlignClass = textAlign === 'left' ? 'text-left' : textAlign === 'right' ? 'text-right' : 'text-center';
    const classes = `overflow-hidden ${textAlignClass} ${className}`;
    const content = splitText(text, splitType);

    // For lines split type, we need to use div instead of p to avoid nesting issues
    const Tag = splitType === 'lines' && tag === 'p' ? 'div' : tag;

    return (
      <Tag ref={ref} id={id} className={classes}>
        {content}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;