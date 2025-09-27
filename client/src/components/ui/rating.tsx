'use client';

import { cn } from '@/lib/utils';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { type LucideProps, StarIcon } from 'lucide-react';
import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';

type RatingContextValue = {
  value: number;
  readOnly: boolean;
  hoverValue: number | null;
  focusedStar: number | null;
  allowHalf: boolean;
  handleValueChange: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    value: number
  ) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  setHoverValue: (value: number | null) => void;
  setFocusedStar: (value: number | null) => void;
};

const RatingContext = createContext<RatingContextValue | null>(null);

const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating must be used within a Rating component');
  }
  return context;
};

export type RatingButtonProps = LucideProps & {
  index?: number;
  icon?: ReactElement<LucideProps>;
};

export const RatingButton = ({
                               index: providedIndex,
                               size = 20,
                               className,
                               icon = <StarIcon strokeWidth={1.5} />,
                             }: RatingButtonProps) => {
  const {
    value,
    readOnly,
    hoverValue,
    focusedStar,
    handleValueChange,
    handleKeyDown,
    setHoverValue,
    setFocusedStar,
    allowHalf,
  } = useRating();

  const index = providedIndex ?? 0;
  const currentValue = hoverValue ?? focusedStar ?? value ?? 0;
  const isFull = index + 1 <= currentValue;
  const isHalf = !isFull && currentValue > index && currentValue < index + 1;

  const tabIndex = !readOnly && Math.ceil(currentValue) === index + 1 ? 0 : -1;

  const handleMouse = (event: MouseEvent<HTMLButtonElement>) => {
    if (readOnly) return;

    let newValue = index + 1;
    if (allowHalf) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - left) / width;
      newValue = percent <= 0.5 ? index + 0.5 : index + 1;
    }

    handleValueChange(event, newValue);
  };

  const handleHover = (event: MouseEvent<HTMLButtonElement>) => {
    if (readOnly) return;

    let newHover = index + 1;
    if (allowHalf) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - left) / width;
      newHover = percent <= 0.5 ? index + 0.5 : index + 1;
    }

    setHoverValue(newHover);
  };

  return (
    <button
      type="button"
      onClick={handleMouse}
      onMouseMove={handleHover}
      onMouseLeave={() => setHoverValue(null)}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocusedStar(index + 1)}
      onBlur={() => setFocusedStar(null)}
      disabled={readOnly}
      tabIndex={tabIndex}
      className={cn(
        'relative p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        readOnly && 'cursor-default',
        className
      )}
    >
      <span className="relative block">
        {cloneElement(icon, {
          size,
          className: cn(
            'text-muted transition-colors duration-200',
            readOnly ? 'cursor-default' : 'cursor-pointer',
            isFull ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-gray-300'
          ),
          'aria-hidden': 'true',
        })}
        {isHalf && (
          <span
            className="absolute left-0 top-0 h-full overflow-hidden"
            style={{ width: '50%' }}
          >
            {cloneElement(icon, {
              size,
              className: 'fill-yellow-400 text-yellow-400',
            })}
          </span>
        )}
      </span>
    </button>
  );
};

export type RatingProps = {
  defaultValue?: number;
  value?: number;
  onChange?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    value: number
  ) => void;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
  className?: string;
  children?: ReactNode;
};

export const Rating = ({
                         value: controlledValue,
                         onValueChange: controlledOnValueChange,
                         defaultValue,
                         onChange,
                         readOnly = false,
                         allowHalf = false,
                         className,
                         children,
                         ...props
                       }: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedStar, setFocusedStar] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, onValueChange] = useControllableState({
    defaultProp: defaultValue!,
    prop: controlledValue,
    onChange: controlledOnValueChange,
  });

  const handleValueChange = useCallback(
    (
      event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
      newValue: number
    ) => {
      if (!readOnly) {
        onChange?.(event, newValue);
        onValueChange?.(newValue);
      }
    },
    [readOnly, onChange, onValueChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (readOnly) return;

      const total = Children.count(children);
      let newValue = focusedStar !== null ? focusedStar : value ?? 0;

      switch (event.key) {
        case 'ArrowRight':
          newValue += allowHalf ? 0.5 : 1;
          newValue = Math.min(total, newValue);
          break;
        case 'ArrowLeft':
          newValue -= allowHalf ? 0.5 : 1;
          newValue = Math.max(allowHalf ? 0.5 : 1, newValue);
          break;
        default:
          return;
      }

      event.preventDefault();
      setFocusedStar(newValue);
      handleValueChange(event, newValue);
    },
    [focusedStar, value, children, readOnly, handleValueChange, allowHalf]
  );

  useEffect(() => {
    if (focusedStar !== null && containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button');
      const index = Math.floor(focusedStar - 1);
      buttons[index]?.focus();
    }
  }, [focusedStar]);

  const contextValue: RatingContextValue = {
    value: value ?? 0,
    readOnly,
    hoverValue,
    focusedStar,
    allowHalf,
    handleValueChange,
    handleKeyDown,
    setHoverValue,
    setFocusedStar,
  };

  return (
    <RatingContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn('inline-flex items-center gap-0.5', className)}
        role="radiogroup"
        aria-label="Rating"
        onMouseLeave={() => setHoverValue(null)}
        {...props}
      >
        {Children.map(children, (child, index) => {
          if (!child) return null;
          return cloneElement(child as ReactElement<RatingButtonProps>, {
            index,
          });
        })}
      </div>
    </RatingContext.Provider>
  );
};
