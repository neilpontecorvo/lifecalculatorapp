import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg material-button touch-action-manipulation no-print"
    >
      <span className="material-icons">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </Button>
  );
}
