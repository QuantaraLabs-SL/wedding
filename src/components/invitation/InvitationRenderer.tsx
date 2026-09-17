'use client';

import { WeddingConfig } from '@/types/database';
import ClassicTheme from '@/themes/classic/ClassicTheme';

interface InvitationRendererProps {
  wedding: WeddingConfig;
}

export default function InvitationRenderer({ wedding }: InvitationRendererProps) {
  // In the future, this will dynamically load the theme based on wedding.theme_id
  // const ThemeComponent = ThemeRegistry[wedding.theme_id || 'classic'];
  
  const themeId = wedding.theme_id || 'classic';
  
  if (themeId === 'classic') {
    return <ClassicTheme wedding={wedding} />;
  }

  // Fallback to classic
  return <ClassicTheme wedding={wedding} />;
}
