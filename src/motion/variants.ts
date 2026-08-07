import type { Variants } from 'framer-motion';
import { motionTokens } from './tokens';

const { duration, easing, depth } = motionTokens;

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, z: depth.far },
  animate: {
    opacity: 1,
    y: 0,
    z: 0,
    transition: { duration: duration.normal, ease: easing },
  },
  exit: {
    opacity: 0,
    y: -10,
    z: depth.near,
    transition: { duration: duration.fast, ease: easing },
  },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, z: depth.mid },
  animate: {
    opacity: 1,
    scale: 1,
    z: 0,
    transition: { duration: duration.normal, ease: easing },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    z: depth.near,
    transition: { duration: duration.fast, ease: easing },
  },
};

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

export const cardCarouselVariants: Variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 25 : -25,
    scale: 0.85,
    opacity: 0.5,
    z: -depth.near,
  }),
  center: {
    rotateY: 0,
    scale: 1,
    opacity: 1,
    z: 0,
    transition: { duration: duration.normal, ease: easing },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -25 : 25,
    scale: 0.85,
    opacity: 0.5,
    z: -depth.near,
    transition: { duration: duration.normal, ease: easing },
  }),
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing } },
};

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const successCheckVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: duration.slow, ease: easing },
  },
};

export const confettiVariants: Variants = {
  initial: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  animate: (i: number) => ({
    opacity: [1, 1, 0],
    y: [-20 - i * 15, -80 - i * 20],
    x: (i % 2 === 0 ? 1 : -1) * (30 + i * 12),
    rotate: i * 45,
    scale: [1, 0.8, 0],
    transition: { duration: 1.2, ease: 'easeOut' },
  }),
};
