import React from "react";
import { Member } from "../stores/members";
import moment from "moment";

export interface MemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">{member.name}</h2>
      <p>
        <strong>Número de socio:</strong> {member.idNumber}
      </p>
      <p>
        <strong>Teléfono:</strong> {member.phone}
      </p>
      <p>
        <strong>Email:</strong> {member.email}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {member.dateOfBirth}
      </p>
      <p>
        <strong>Dirección:</strong> {member.address}
      </p>
      <p>
        <strong>Jubilado:</strong> {member.isRetired ? "Yes" : "No"}
      </p>
      <p>
        <strong>Fecha de registro:</strong> {member.registeredAt}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">hijos</h3>
        {member.children && member.children.length > 0 ? (
          <ul className="list-disc list-inside">
            {member.children.map((child, index) => (
              <li key={index}>
                {child.name} - {moment(child.dateOfBirth).format("DD/MM/YYYY")}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tiene hijos.</p>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Pagos</h3>
        {member.payments && member.payments.length > 0 ? (
          <ul className="list-disc list-inside">
            {member.payments.map((payment, index) => (
              <li key={index}>
                Año: {payment.year}, Cantidad: {payment.amount}Eur, Fecha pago:{" "}
                {moment(payment.date).format("DD/MM/YYYY")}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ha registrado pagos.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
