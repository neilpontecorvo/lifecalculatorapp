import { useEffect, useRef } from 'react';

interface TouchGestureCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useTouchGestures(callbacks: TouchGestureCallbacks) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;
      
      // Check if it's a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && callbacks.onSwipeLeft) {
          callbacks.onSwipeLeft();
        } else if (deltaX < 0 && callbacks.onSwipeRight) {
          callbacks.onSwipeRight();
        }
      }
      
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [callbacks]);
}
