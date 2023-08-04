

import { QueryClient , QueryClientProvider as TenStackQueryClientProvider} from '@tanstack/react-query';

import { queryClientOptions } from '../utils/constant';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export const QueryClientProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return <TenStackQueryClientProvider client={queryClient}>
    
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </TenStackQueryClientProvider>;
};