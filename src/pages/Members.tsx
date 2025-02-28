import { ReactElement, useState } from "react";
import { Member } from "../stores/members";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { Modal } from "../components/ui/modal";
import MembersList from "../components/MembersList";
import MemberForm from "../components/MemberForm";
import { useMembersStore } from "../stores/members";

export default function Members(): ReactElement {
  const [memberForm, setMemberForm] = useState<Partial<Member> | null>(null);
  const { members } = useMembersStore();

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
        onDeleteMember={console.log}
      />

      <Modal
        isOpen={memberForm !== null}
        onClose={() => setMemberForm(null)}
        title="Gestionar socio"
        description="Aquí podrás actualizar la ficha del socio y todos sus campos"
        className="max-w-[700px] m-4"
        actions={{
          Guardar: console.log,
        }}
      >
        <MemberForm initialValues={{ ...memberForm }} onSubmit={console.log} />
      </Modal>
    </>
  );
}
