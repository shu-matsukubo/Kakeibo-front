declare module '*.svg?react' {
  import type * as React from 'react';

  const component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default component;
}
