import React, { ReactElement, useState } from "react";
import { Member, MemberChild } from "../stores/members";
import Input from "./Input";
import MultiSelect from "./form/MultiSelect";
import moment from "moment";

export interface MemberFormProps {
  initialValues: Partial<Member>;
  onSubmit: (member: Partial<Member>) => void;
}

export default function MemberForm({
  initialValues = {},
  onSubmit,
}: MemberFormProps): ReactElement {
  const [form, setForm] = useState<Partial<Member>>(initialValues);

  const makeKeyHandler =
    (key: keyof Member) => (value: string | number | boolean) => {
      setForm((form) => ({ ...form, [key]: value }));
    };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  const addChild = () => {
    setForm({
      ...form,
      children: [{ name: "", dateOfBirth: "" }, ...(form.children || [])],
    });
  };

  const updateChild = (
    index: number,
    key: keyof MemberChild,
    value: string,
  ) => {
    setForm((form) => {
      const updatedChildren = [...(form.children || [])];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [key]: value,
      };
      return { ...form, children: updatedChildren };
    });
  };

  const removeChild = (index: number) => {
    setForm((form) => {
      const updatedChildren = [...(form.children || [])];
      updatedChildren.splice(index, 1);
      return { ...form, children: updatedChildren };
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        name="id"
        type="number"
        placeholder="Identificador único del socio"
        label="Número de socio"
        className="text-xs"
        readOnly={true}
        value={form.id}
        onChange={makeKeyHandler("id")}
      />

      <Input
        name="name"
        placeholder="Nombre completo del socio"
        label="Nombre"
        className="text-xs"
        value={form.name}
        onChange={makeKeyHandler("name")}
      />

      <Input
        name="idNumber"
        placeholder="43567627H"
        label="Documento DNI/NIE"
        className="text-xs"
        value={form.idNumber}
        onChange={makeKeyHandler("idNumber")}
      />

      <Input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        label="Email"
        className="text-xs"
        value={form.email}
        onChange={makeKeyHandler("email")}
      />

      <Input
        name="phone"
        placeholder="Número de teléfono"
        label="Teléfono"
        className="text-xs"
        value={form.phone}
        onChange={makeKeyHandler("phone")}
      />

      <Input
        name="dateOfBirth"
        type="date"
        placeholder="Fecha de nacimiento"
        label="Fecha de Nacimiento"
        className="text-xs"
        value={form.dateOfBirth}
        onChange={makeKeyHandler("dateOfBirth")}
      />

      <Input
        name="address"
        type="text"
        placeholder="Calle Panamá n2 ..."
        label="Dirección"
        className="text-xs"
        value={form.address}
        onChange={makeKeyHandler("address")}
      />

      <Input
        name="registeredAt"
        type="date"
        placeholder="Fecha de registro"
        label="Fecha de Registro"
        className="text-xs"
        value={form.registeredAt}
        onChange={makeKeyHandler("registeredAt")}
      />

      <label className="flex items-center p-1 py-3 text-sm text-gray-500">
        <input
          name="isRetired"
          checked={form.isRetired}
          onChange={(e) => makeKeyHandler("isRetired")(e.target.checked)}
          className="mr-2"
          type="checkbox"
        />
        Retirado{" "}
        <small className="ml-2 text-xs text-gray-400">
          (Si la edad del socio es mayor de 67 este campo se actualizará
          automaticamente)
        </small>
      </label>

      <MultiSelect
        label="Pagos anuales"
        defaultSelected={form.yearPayments?.map((n) => n.toString()) || []}
        onChange={(values) => {
          setForm({ ...form, yearPayments: values.map((y) => parseInt(y)) });
        }}
        options={Array.from({ length: 11 }, (_, i) => {
          const year = moment().year() - 9 + i;
          return { text: year.toString(), value: year.toString() };
        })}
      />

      <section className="p-3 bg-gray-100 rounded-md">
        <header className="flex items-center justify-between px-1">
          <h3>Hijos</h3>
          <span
            onClick={addChild}
            className="cursor-pointer material-icons-outlined"
          >
            add
          </span>
        </header>
        {form.children?.map((child, index) => (
          <div key={index} className="flex item-center">
            <Input
              name={`child-name-${index}`}
              placeholder="Nombre del niño"
              label="Nombre"
              className="text-xs w-full"
              value={child.name}
              onChange={(value) => updateChild(index, "name", value as string)}
            />
            <Input
              name={`child-dob-${index}`}
              type="date"
              placeholder="Fecha de nacimiento"
              label="Fecha de Nacimiento"
              className="text-xs w-full"
              value={child.dateOfBirth}
              onChange={(value) =>
                updateChild(index, "dateOfBirth", value as string)
              }
            />
            <span
              className="p-3 pt-7 text-red-500 material-icons-outlined cursor-pointer self-center"
              onClick={() => removeChild(index)}
            >
              delete
            </span>
          </div>
        ))}
      </section>
    </form>
  );
}
