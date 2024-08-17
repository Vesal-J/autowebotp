# Auto Web OTP

A simple library to automatically generate and validate OTP codes for your website.

## Installation

```bash
npm install autowebotp
```

## Usage

### React
```tsx
import { webotp } from "autowebotp"
import { useEffect, useState } from "react"

export default function Home() {
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    const abortWebOTP = webotp((receivedOtp) => {
      console.log("OTP received:", receivedOtp);
      setOtp(receivedOtp);
      alert(`OTP received: ${receivedOtp}`);
    });

    // Clean up function
    return () => {
      abortWebOTP();
    };
  }, []);

  return (
    <>
      <input 
        type="text" 
        autoComplete="one-time-code" 
        inputMode="numeric" 
        className="border-2"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </>
  )
}
```