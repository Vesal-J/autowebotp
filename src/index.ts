export function webotp(callbackFn: (otp: string) => void) {
  if ("OTPCredential" in window) {
    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      } as any)
      .then((otp: any) => {
        if (otp && otp.code) {
          callbackFn(otp.code);
        } else {
          throw new Error("No OTP received");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("WebOTP error:", err);
        }
      })
      .finally(() => {
        ac.abort();
      });

    return () => ac.abort();
  }
  return () => {};
}
