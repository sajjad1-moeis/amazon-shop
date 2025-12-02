"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VIEWS } from "./Views";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import SignupVerifyView from "./SignupVerifyView";
import ResetRequestView from "./ResetRequestView";
import ResetVerifyView from "./ResetVerifyView";

export const fieldClassName = "h-10 rounded-lg bg-gray-50 border text-right placeholder:text-xs";

export function AuthModal({ open, onOpenChange }) {
  const [view, setView] = useState(VIEWS.LOGIN);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [code, setCode] = useState("");

  const resetFields = () => {
    setPassword("");
    setPasswordRepeat("");
    setCode("");
  };

  const goTo = (v) => {
    resetFields();
    setView(v);
  };

  const handleClose = (state) => {
    if (!state) {
      setView(VIEWS.LOGIN);
      resetFields();
      setPhone("");
    }
    onOpenChange?.(state);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl bg-white">
        {view === VIEWS.LOGIN && (
          <LoginView
            phone={phone}
            password={password}
            onChangePhone={setPhone}
            onChangePassword={setPassword}
            onGoSignup={() => goTo(VIEWS.SIGNUP)}
            onGoReset={() => goTo(VIEWS.RESET_REQUEST)}
          />
        )}

        {view === VIEWS.SIGNUP && (
          <SignupView
            phone={phone}
            password={password}
            passwordRepeat={passwordRepeat}
            onChangePhone={setPhone}
            onChangePassword={setPassword}
            onChangePasswordRepeat={setPasswordRepeat}
            onGoLogin={() => goTo(VIEWS.LOGIN)}
            onSubmitSignup={() => goTo(VIEWS.SIGNUP_VERIFY)}
          />
        )}

        {view === VIEWS.SIGNUP_VERIFY && (
          <SignupVerifyView phone={phone} code={code} onChangeCode={setCode} onBack={() => goTo(VIEWS.SIGNUP)} />
        )}

        {view === VIEWS.RESET_REQUEST && (
          <ResetRequestView
            phone={phone}
            onChangePhone={setPhone}
            onBack={() => goTo(VIEWS.LOGIN)}
            onNext={() => goTo(VIEWS.RESET_VERIFY)}
          />
        )}

        {view === VIEWS.RESET_VERIFY && (
          <ResetVerifyView
            phone={phone}
            code={code}
            password={password}
            onChangeCode={setCode}
            onChangePassword={setPassword}
            onBack={() => goTo(VIEWS.RESET_REQUEST)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
