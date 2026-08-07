import { motion, HTMLMotionProps } from 'framer-motion';
import { motionTokens } from '../../motion/tokens';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  fullWidth?: boolean;
  loading?: boolean;
}

const variants = {
  primary: 'bg-brand-success text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/30',
  secondary: 'glass text-white hover:bg-white/15',
  ghost: 'text-white/70 hover:text-white hover:bg-white/10',
  danger: 'bg-red-600/80 text-white hover:bg-red-600',
};

export function Button({
  variant = 'primary',
  fullWidth,
  loading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: motionTokens.duration.fast }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3
        text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        children
      )}
    </motion.button>
  );
}
