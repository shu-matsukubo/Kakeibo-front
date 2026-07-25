import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    iconOnly && 'btn--icon',
    loading && 'is-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={loading || disabled} {...props}>
      {loading ? (
        <span className="btn__spinner" />
      ) : iconOnly ? (
        leftIcon
      ) : (
        <>
          {leftIcon && <span className="btn__icon">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="btn__icon">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
