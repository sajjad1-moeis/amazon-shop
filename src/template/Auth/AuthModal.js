"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VIEWS } from "./Views";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import SignupVerifyView from "./SignupVerifyView";
import ResetRequestView from "./ResetRequestView";
import ResetVerifyView from "./ResetVerifyView";

export const fieldClassName =
  "h-10 rounded-lg bg-gray-50 border text-right placeholder:text-xs dark:bg-dark-field dark:border-dark-stroke";

export function AuthModal({ open, onClose }) {
  const [view, setView] = useState(VIEWS.LOGIN);

  const handleClose = (state) => {
    if (!state) {
      setView(VIEWS.LOGIN);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden !rounded-2xl bg-white dark:bg-dark-box">
        {view === VIEWS.LOGIN && (
          <LoginView
            onGoSignup={() => setView(VIEWS.SIGNUP)}
            onGoReset={() => setView(VIEWS.RESET_REQUEST)}
            onSuccess={() => handleClose(false)}
          />
        )}

        {view === VIEWS.SIGNUP && (
          <SignupView
            onGoLogin={() => setView(VIEWS.LOGIN)}
            onSuccess={() => setView(VIEWS.SIGNUP_VERIFY)}
          />
        )}

        {view === VIEWS.SIGNUP_VERIFY && (
          <SignupVerifyView
            onBack={() => setView(VIEWS.SIGNUP)}
            onSuccess={() => handleClose(false)}
          />
        )}

        {view === VIEWS.RESET_REQUEST && (
          <ResetRequestView
            onBack={() => setView(VIEWS.LOGIN)}
            onSuccess={() => setView(VIEWS.RESET_VERIFY)}
          />
        )}

        {view === VIEWS.RESET_VERIFY && (
          <ResetVerifyView
            onBack={() => setView(VIEWS.RESET_REQUEST)}
            onSuccess={() => handleClose(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
