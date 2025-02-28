import { ReactElement, useEffect, useState } from "react";
import Button from "./ui/button/Button";
import Input, { InputProps } from "./Input";
import moment from "moment";

export type FormField<T> = Omit<InputProps, "onChange" | "name" | "type"> & {
  name: keyof T;
  type?:
    | "text"
    | "number"
    | "date"
    | "time"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "search"
    | "color"
    | "range"
    | "checkbox"
    | "radio"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "week"
    | "datetime-local";
};

export interface FormProps<T> {
  fields: FormField<T>[];
  buttonTitle?: string;
  buttonIcon?: string;
  className?: string;
  inputWrapperClassName?: string;
  onChange?: (data: T) => void;
  onSubmit?: (data: T) => void;
}

export default function Form<T>({
  fields,
  buttonTitle = "Send",
  className,
  inputWrapperClassName,
  onChange,
  onSubmit,
}: FormProps<T>): ReactElement {
  const [data, setData] = useState<T>({} as T);

  const setDataKey = (key: keyof T, value: string | number | undefined) => {
    setData((data) => ({ ...data, [key]: value }));
  };

  useEffect(() => {
    fields.forEach((field) => {
      let finalValue = field.value;
      if (field.type === "date") {
        finalValue = moment(field.value).format("YYYY-MM-DD");
      }
      setDataKey(field.name, finalValue);
    });
  }, [fields]);

  useEffect(() => {
    if (onChange) onChange(data);
  }, [data]);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit && onSubmit(data);
      }}
    >
      <div className={inputWrapperClassName}>
        {fields.map((field, index) => (
          <Input
            key={index}
            className="text-sm mb-3"
            {...field}
            name={field.name as string}
            value={data[field.name] as string | number | undefined}
            onChange={(value) =>
              setDataKey(
                field.name,
                field.type === "number" ? parseFloat(value as string) : value,
              )
            }
          />
        ))}
      </div>
      {onSubmit && <Button>{buttonTitle}</Button>}
    </form>
  );
}
