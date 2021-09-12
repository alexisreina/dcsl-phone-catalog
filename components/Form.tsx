import React from "react";
import { Phone } from "../utils/PhoneService";
import { ButtonPrimary } from "./Button";

export const Fieldset: React.FC = ({ children }) => (
  <fieldset className="w-full mb-4">{children}</fieldset>
);

export const Label: React.FC = ({ children }) => (
  <label className="uppercase font-semibold text-gray-500 text-xs mb-1 block tracking-wider">
    {children}
  </label>
);

export const FormField: React.FC<{
  label: string;
  component?: "input" | "textarea" | "select";
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
    case "input":
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

export const Form: React.FC<{
  data: Phone;
  mode: "create" | "update";
  handleSubmit: (evt: React.SyntheticEvent) => void;
  handleChange: (key: string, value: string | number) => void;
  handleDelete?: () => void;
}> = ({ data, mode, handleSubmit, handleChange, handleDelete }, ref) => {
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      {/* <input type="file" onChange={handleFile} /> */}

      <FormField
        label="Name"
        value={data.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("name", e.target.value)
        }
      />

      <FormField
        label="Color"
        value={data.color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("color", e.target.value)
        }
      />

      <FormField
        label="Manufacturer"
        value={data.manufacturer}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("manufacturer", e.target.value)
        }
      />

      <FormField
        label="Screen"
        value={data.screen}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("screen", e.target.value)
        }
      />

      <FormField
        label="Processor"
        value={data.processor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("processor", e.target.value)
        }
      />

      <FormField
        label="Memory"
        value={data.memory}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("memory", +e.target.value)
        }
      />

      <FormField
        label="RAM"
        value={data.ram}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("ram", +e.target.value)
        }
      />

      <FormField
        label="Price"
        value={data.price}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("price", +e.target.value)
        }
      />

      <FormField
        label="Description"
        value={data.description}
        component="textarea"
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange("description", e.target.value)
        }
      />

      <div
        className={`${mode === "update" && "flex justify-between"} text-right`}
      >
        {mode == "update" && handleDelete && (
          <button
            className="text-gray-500 text-sm uppercase tracking-wider"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};
