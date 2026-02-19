import { useSelector } from "react-redux";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ContactDetailsForm from "../../components/crm/ContactDetailsForm";
import ContactsTable from "../../components/tables/BasicTables/ContactsTable";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { getAgentContacts } from "../../services/contactsService";
import Pagination from "../Tables/Pagination";

export default function Dashboard() {
  const { isOpen, openModal, closeModal } = useModal();
  const contactsList = useSelector((state: any) => state.contacts.contactsList);

  const onContactCreated = () => {
    getAgentContacts();
  }
  return (
    <>
      <PageMeta
        title=""
        description=""
      />

      <div className="space-y-6">
        <div className="flex flex-row justify-end">
          <Button size="md"
            variant="primary"
            startIcon={<span>+</span>}
            onClick={openModal}>
            Add Contact
          </Button>
        </div>
        <ComponentCard title="My Contacts">
          <ContactsTable />
          {contactsList && contactsList.length === 0 && <div>
            <p className="text-center text-gray-500">No contacts yet.</p>
            <p className="text-center text-gray-500"> Click the 'Add Contact' button to add a contact.</p>
          </div>}
          <div className="flex justify-end ">
            <Pagination currentPage={1} totalPages={1} onPageChange={() => { }} />
          </div>
        </ComponentCard>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <ContactDetailsForm closeModal={closeModal} contact={null} onEdit={onContactCreated} />
        </Modal>
      </div>
    </>
  );
}
