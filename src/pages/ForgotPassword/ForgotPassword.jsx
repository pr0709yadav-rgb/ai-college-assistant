import { useState } from "react";

import EmailForm from "../../components/form/EmailForm";
import OTPForm from "../../components/form/OTPForm";
import ResetPasswordForm from "../../components/form/ResetPasswordForm";

function ForgotPassword() {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Reset your account password
        </p>

        {/* Step 1 */}

        {step === 1 && (

          <EmailForm
            setStep={setStep}
            email={email}
            setEmail={setEmail}
          />

        )}

        {/* Step 2 */}

        {step === 2 && (

          <OTPForm
            setStep={setStep}
            email={email}
            otp={otp}
            setOtp={setOtp}
          />

        )}

        {/* Step 3 */}

        {step === 3 && (

          <ResetPasswordForm
            email={email}
            otp={otp}
          />

        )}

      </div>

    </div>
  );
}

export default ForgotPassword;