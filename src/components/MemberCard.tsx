import React from "react";
import { Member } from "../stores/members";
import Badge from "./ui/badge/Badge";
import moment from "moment";

export interface MemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  return (
    <div className="bg-gray-50 p-3">
      <div className="flex items-center">
        <img
          className="h-[50px] w-[50px] overflow-hidden rounded-full"
          src={`https://ui-avatars.com/api/?name=${member.name.split(" ").join("+")}&size=40`}
        />
        <h2 className="text-3xl ml-3 font-bold text-gray-800">{member.name}</h2>
      </div>
      <div className="my-3">
        {member.isRetired && (
          <Badge size="sm" color="warning">
            Retirado
          </Badge>
        )}
        {member.longUnpaid && (
          <Badge size="sm" color="error">
            3 impagos
          </Badge>
        )}
        {member.hasUnderAgeKids && (
          <Badge size="sm" color="warning">
            Menores
          </Badge>
        )}
        {member.isNew && (
          <Badge size="sm" color="success">
            Nuevo
          </Badge>
        )}
        {member.unpaid ? (
          <Badge size="sm" color="error">
            Pendiente
          </Badge>
        ) : (
          <Badge size="sm" color="success">
            Activo
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-600">
          <strong className="font-semibold">Número socio:</strong>{" "}
          {member.number}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">DNI/NIE:</strong> {member.idNumber}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Teléfono:</strong> {member.phone}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Email:</strong> {member.email}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Fecha de nacimiento:</strong>{" "}
          {moment(member.dateOfBirth).format("DD/MM/YYYY")}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Dirección:</strong> {member.address}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Jubilado:</strong>{" "}
          {member.isRetired ? "Sí" : "No"}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Fecha de registro:</strong>{" "}
          {moment(member.registeredAt).format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Hijos</h3>
        {member.children && member.children.length > 0 ? (
          <table className="min-w-full mt-2 bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border-b">
                  Nombre
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b">
                  Fecha de Nacimiento
                </th>
              </tr>
            </thead>
            <tbody>
              {member.children.map((child, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="px-4 py-2 border-b">{child.name}</td>
                  <td className="px-4 py-2 border-b">
                    {moment(child.dateOfBirth).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No tiene hijos.</p>
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Pagos</h3>
        {member.payments && member.payments.length > 0 ? (
          <table className="min-w-full mt-2 bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border-b">
                  Año
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b">
                  Cantidad (Eur)
                </th>
                <th className="px-4 py-2 text-left text-gray-600 border-b">
                  Fecha de Pago
                </th>
              </tr>
            </thead>
            <tbody>
              {member.payments.map((payment, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="px-4 py-2 border-b">{payment.year}</td>
                  <td className="px-4 py-2 border-b">{payment.amount}</td>
                  <td className="px-4 py-2 border-b">
                    {moment(payment.date).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No ha registrado pagos.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
