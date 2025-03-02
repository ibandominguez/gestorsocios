import { ReactElement, useState } from "react";
import { Member } from "../stores/members";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { Modal } from "../components/ui/modal";
import MembersList from "../components/MembersList";
import MemberForm from "../components/MemberForm";
import MemberCard from "../components/MemberCard";
import { useMembersStore } from "../stores/members";

export default function Members(): ReactElement {
  const [memberForm, setMemberForm] = useState<Partial<Member> | null>(null);
  const [selectedMember, setSelectedMember] = useState<Partial<Member> | null>(
    null,
  );
  const { members, addMember, updateMember, deleteMember } = useMembersStore();

  return (
    <>
      <PageMeta
        title="Club Famara - Gestión de socios"
        description="Gestiona tus socios de forma eficiente"
      />

      <PageBreadcrumb pageTitle="Gestión de socios" />

      <MembersList
        data={members}
        onAddMember={() => {
          const newMember: Partial<Member> = {
            children: [],
            payments: [],
          };
          setMemberForm(newMember);
        }}
        onSelectMember={setSelectedMember}
        onEditMember={setMemberForm}
        onDeleteMember={deleteMember}
      />

      <Modal
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
        title="Ficha socio"
        description="Aquí podrás ver todos los detalles del socio"
        className="max-w-[700px] m-4"
      >
        <MemberCard member={selectedMember as Member} />
      </Modal>

      <Modal
        isOpen={memberForm !== null}
        onClose={() => setMemberForm(null)}
        title="Gestionar socio"
        description="Aquí podrás actualizar la ficha del socio y todos sus campos"
        className="max-w-[700px] m-4"
        actions={{
          Guardar: () => {
            if (memberForm?.id) {
              updateMember(memberForm as Member).then(() => {
                setMemberForm(null);
              });
            } else {
              addMember(memberForm as Member).then(() => {
                setMemberForm(null);
              });
            }
          },
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
