import { ReactElement, useState } from "react";
import { Member } from "../stores/members";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import { Modal } from "../components/ui/modal";
import Form from "../components/Form";
import MembersList from "../components/MembersList";
import { useMembersStore } from "../stores/members";

export default function Members(): ReactElement {
  const [memberForm, setMemberForm] = useState<Partial<Member> | null>(null);
  const { members, createMember, updateMember, deleteMember } =
    useMembersStore();

  return (
    <>
      <PageMeta
        title="Club Famara - Gestión de socios"
        description="Gestiona tus socios de forma eficiente"
      />

      <PageBreadcrumb pageTitle="Gestión de socios" />

      <MembersList
        data={members}
        onSelectMember={setMemberForm}
        onDeleteMember={deleteMember}
      />

      <Modal
        isOpen={memberForm !== null}
        onClose={() => setMemberForm(null)}
        title="Gestionar socio"
        description="Gestiona tu socio ..."
        className="max-w-[700px] m-4"
        actions={{
          Guardar: console.log,
        }}
      >
        <Form<Member>
          onChange={setMemberForm}
          fields={[
            {
              label: "Número socio",
              name: "id",
              placeholder: "Identificador único de socio",
              type: "number",
            },
            {
              label: "Nombre",
              name: "name",
              placeholder: "Nombre completo del socio",
            },
            {
              label: "Email",
              name: "email",
              placeholder: "socio@email.com",
              type: "email",
            },
            {
              label: "Fecha de nacimiento",
              name: "dateOfBirth",
              type: "date",
            },
            {
              label: "Registro",
              name: "registeredAt",
              type: "date",
            },
          ]}
        />
      </Modal>
    </>
  );
}
