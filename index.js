"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webotp = webotp;
function webotp(callbackFn) {
    if ("OTPCredential" in window) {
        const ac = new AbortController();
        navigator.credentials
            .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
        })
            .then((otp) => {
            if (otp && otp.code) {
                callbackFn(otp.code);
            }
            else {
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
    return () => { };
}
