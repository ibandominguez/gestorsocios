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
  const { members, updateMember, deleteMember } = useMembersStore();

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
        description="Aquí podrás actualizar la ficha del socio y todos sus campos"
        className="max-w-[700px] m-4"
        actions={{
          Guardar: () =>
            updateMember(memberForm as Member).then(() => {
              setMemberForm(null);
            }),
        }}
      >
        <MemberForm
          initialValues={{ ...memberForm }}
          onChange={(member) =>
            setMemberForm((oldForm) => ({ ...oldForm, ...member }))
          }
        />
      </Modal>
    </>
  );
}
