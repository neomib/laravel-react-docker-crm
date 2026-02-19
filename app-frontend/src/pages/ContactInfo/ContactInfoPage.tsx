import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ContactInfoCard from "../../components/crm/ContactInfoCard";
import ContactInteractions from "../../components/crm/ContactInteractions";
import { getContact } from "../../services/contactsService";
import { Contact, ContactInteraction } from "../../types/CRM";


export default function ContactInfoPage() {
  const { contactId } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<ContactInteraction[]>([]);

  const navigate = useNavigate();

  const retrieveContact = () => {
    if (contactId) {
      getContact(contactId).then(result => {
        setContact(result.contact);
        setInteractions(result.interactions);
      });
    }
  }
  useEffect(() => {
    retrieveContact();
  }, [contactId]);

  const onEditContact = (newContact: Contact) => {
    setContact(newContact);
  }
  const onDeleteContact = () => {
    navigate('/');
  }
  const onAddActivity = () => {
    retrieveContact();
  }
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <PageBreadcrumb pageTitle="Contact Details" />
      <ComponentCard title={contact?.name || ''}>
        {contact && <div className="grid grid-cols-8 gap-x-6 gap-y-5 ">
          <div className=" order-2 lg:order-1 col-span-12 lg:col-span-5">
            <ContactInteractions interactions={interactions} contact={contact} onAdd={onAddActivity} />
          </div>
          <div className="order-1 lg:order-2 col-span-12 lg:col-span-3  bg-gray-50 dark:bg-gray-900">
            <ContactInfoCard contact={contact} onEdit={onEditContact} onDelete={onDeleteContact} />
          </div>
        </div>}


      </ComponentCard>
    </>
  );
}
