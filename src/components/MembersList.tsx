import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import Badge from "./ui/badge/Badge";
import { ReactElement, useEffect, useState } from "react";
import Input from "./form/input/InputField";
import Select from "./form/Select";
import { Member } from "../stores/members";

export interface MembersListProps {
  data: Member[];
  onAddMember?: () => void;
  onSelectMember: (member: Member) => void;
  onDeleteMember: (member: Member) => void;
}

export default function MembersList({
  data,
  onAddMember,
  onSelectMember,
  onDeleteMember,
}: MembersListProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Member[]>(data);

  useEffect(() => {
    let newFilteredData = data;
    if (searchTerm) {
      newFilteredData = newFilteredData.filter((member) => {
        return [
          member.id,
          member.name,
          member.email,
          member.phone,
          member.idNumber,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }
    if (filter) {
      newFilteredData = newFilteredData.filter(
        (member) => member[filter as keyof Member],
      );
    }
    setFilteredData(newFilteredData);
  }, [data, searchTerm, filter]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Socios
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar socios ..."
            onChange={(event) => setSearchTerm(event.target.value || "")}
            value={searchTerm}
          />

          <Select
            className="max-w-40"
            onChange={(value) => setFilter(value || "")}
            placeholder="Mostrar todos"
            options={[
              { label: "Mostrar pendientes", value: "unpaid" },
              { label: "Mostrar con hijos menores", value: "hasUnderAgeKids" },
              { label: "Mostrar jubilados", value: "isRetired" },
              { label: "Mostrar 3 años impago", value: "longUnpaid" },
            ]}
          />

          <span
            className="material-icons-outlined cursor-pointer"
            onClick={onAddMember}
          >
            add
          </span>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Socio
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Detalles
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Pago actual
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {!filteredData.length && (
              <TableRow>
                <TableCell className="py-3">No hay resultados</TableCell>
              </TableRow>
            )}
            {filteredData.map((member) => (
              <TableRow key={member.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        className="rounded-full"
                        src={`https://ui-avatars.com/api/?name=${member.name.split(" ").join("+")}&size=40`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {member.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        <small className="text-gray-500">Desde: </small>
                        {"  "}
                        {member.registeredAt}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {member.isRetired && (
                    <Badge size="sm" color="warning">
                      Retirado
                    </Badge>
                  )}
                  {member.longUnpaid && (
                    <Badge size="sm" color="error">
                      3 años de impago
                    </Badge>
                  )}
                  {member.hasUnderAgeKids && (
                    <Badge size="sm" color="warning">
                      Hijos menores
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      member.yearPayments.includes(new Date().getFullYear())
                        ? "success"
                        : "error"
                    }
                  >
                    {member.yearPayments.includes(new Date().getFullYear())
                      ? "Al corriente"
                      : "Pendiente"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span
                    onClick={() => onSelectMember(member)}
                    className="cursor-pointer material-icons-outlined p-2 text-blue-500"
                  >
                    edit
                  </span>
                  <span
                    onClick={() => onDeleteMember(member)}
                    className="cursor-pointer material-icons-outlined p-2 text-red-500"
                  >
                    delete
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
