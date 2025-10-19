'use client';

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // This function will only run on the client
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    checkDevice();

    // Listen for window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkDevice);
  }, [])

  return isMobile;
}
