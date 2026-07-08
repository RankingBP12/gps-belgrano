import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  buttonClasses,
  type ButtonVariant,
  type ButtonSize,
} from './buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses(variant, size, fullWidth, className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
