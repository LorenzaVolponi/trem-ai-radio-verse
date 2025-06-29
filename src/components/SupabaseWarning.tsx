import React from 'react';
import { SUPABASE_AVAILABLE } from '@/integrations/supabase/client';

const SupabaseWarning = () => {
  if (SUPABASE_AVAILABLE) return null;
  return (
    <div className="bg-red-600 text-white text-center p-2 text-sm">
      Supabase environment variables are not configured. Backend features are disabled.
    </div>
  );
};

export default SupabaseWarning;
