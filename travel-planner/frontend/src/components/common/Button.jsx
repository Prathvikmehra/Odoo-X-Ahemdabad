import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'teal' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";
  
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5 tracking-tight font-semibold"
  };

  const variantStyles = {
    primary: "bg-[#1c1c18] text-[#fcf9f3] hover:bg-[#000000] hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md focus:ring-[#1c1c18]",
    secondary: "bg-transparent border border-[#1c1c18] text-[#1c1c18] hover:bg-[#1c1c18] hover:text-[#fcf9f3] hover:scale-[1.02] active:scale-[0.98] focus:ring-[#1c1c18]",
    teal: "bg-[#00696d] text-white hover:bg-[#005356] hover:scale-[1.02] active:scale-[0.98] focus:ring-[#00696d] shadow-sm",
    tealLight: "bg-[#9af1f5]/25 text-[#00696d] border border-[#00696d]/20 hover:bg-[#9af1f5]/40 active:scale-[0.98]",
    ghost: "bg-transparent text-[#46464c] hover:text-[#1c1c18] hover:bg-[#f6f2e9] active:scale-[0.98]",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
    </button>
  );
}

export function Eyebrow({ children, className = '', color = 'text-[#76777d]' }) {
  return (
    <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase block select-none ${color} ${className}`}>
      {children}
    </span>
  );
}

export function Chip({ children, active = false, onClick, className = '', count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
        active
          ? "bg-[#1c1c18] text-[#fcf9f3] shadow-sm"
          : "bg-white/80 border border-[#e6e3dc] text-[#46464c] hover:border-[#1c1c18] hover:text-[#1c1c18]"
      } ${className}`}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? "bg-white/20 text-white" : "bg-[#f6f2e9] text-[#76777d]"}`}>
          {count}
        </span>
      )}
    </button>
  );
}
