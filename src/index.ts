export function webotp(callbackFn: (otp: string) => void) {
    if ("OTPCredential" in window) {
      window.addEventListener("DOMContentLoaded", (e) => {
        const ac = new AbortController();
        setTimeout(() => {
          ac.abort();
        }, 1 * 60 * 1000);     
        navigator.credentials
          .get({
            // @ts-ignore
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then((otp) => {
            if (!otp) {
              throw new Error("No OTP received");
            }
            // @ts-ignore
            callbackFn(otp.code);
            ac.abort();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  }
  