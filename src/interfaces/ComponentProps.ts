import * as React from 'react';

interface ComponentProps {
 /**
  * Injected by the documentation to work in an iframe.
  * You won't need it on your project.
  */
 window?: () => Window;
 children: React.ReactElement;
}

export default ComponentProps;