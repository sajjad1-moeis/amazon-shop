import { Button } from "@/components/ui/button";

export default function AuthToggle({ active = "login", onLogin, onSignup }) {
  const activeClass = "border-primary-600 bg-primary-100 text-primary-600 dark:bg-dark-title dark:text-primary-700";
  const unActiveClass = "bg-transparent border-gray-200  dark:border-dark-title dark:text-dark-title";

  return (
    <div className="flex items-center gap-2 rounded-full p-1 text-xs">
      {/* ثبت نام */}

      {/* ورود */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogin}
        className={`w-1/2 rounded-lg border 
          ${active === "login" ? activeClass : unActiveClass}`}
      >
        ورود
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onSignup}
        className={`w-1/2 rounded-lg border 
          ${active === "signup" ? activeClass : unActiveClass}`}
      >
        ثبت نام
      </Button>
    </div>
  );
}
