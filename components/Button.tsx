import React, { Ref } from "react";

export const Button: React.FC = ({ children }) => <button>{children}</button>;

export const ButtonPrimary = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  {
    [rest: string]: any;
    component?: "a" | "button";
  }
>(({ children, component = "button", ...rest }, ref) => {
  switch (component) {
    case "a":
      return (
        <a
          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-2 px-8 rounded-full text-white font-semibold"
          {...rest}
          ref={ref}
        >
          {children}
        </a>
      );
    case "button":
    default:
      return (
        <button
          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-2 px-8 rounded-full text-white font-semibold"
          {...rest}
          ref={ref}
        >
          {children}
        </button>
      );
  }
});
