import React from "react";

export const Fieldset: React.FC = ({ children }) => (
  <fieldset className="w-full mb-6">{children}</fieldset>
);

export const Label: React.FC = ({ children }) => (
  <label className="uppercase font-semibold text-sm mb-1 block">
    {children}
  </label>
);

export const FormField: React.FC<{
  label: string;
  component?: string;
  [rest: string]: any;
}> = ({ label, component = "input", ...rest }) => {
  switch (component) {
    case "textarea":
      return (
        <Fieldset>
          <Label>{label}</Label>
          <textarea
            className="block w-full border-2 border-gray-300 px-3 py-2 transition-all border-blue rounded-sm"
            {...rest}
          />
        </Fieldset>
      );
    case "select":
      <Fieldset>
        <Label>{label}</Label>
        <select
          className="block w-full h-10 border-2 border-gray-300 px-3 transition-all border-blue rounded-sm"
          {...rest}
        />
      </Fieldset>;
    default:
      return (
        <Fieldset>
          <Label>{label}</Label>
          <input
            className="block w-full h-10 border-2 border-gray-300 px-3 transition-all border-blue rounded-sm"
            {...rest}
          />
        </Fieldset>
      );
  }
};

// FormField.displayName = "FormField";
