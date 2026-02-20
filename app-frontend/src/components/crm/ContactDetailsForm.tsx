import { useState } from "react";
import { toast } from "react-toastify";
import { createContact, updateContact } from "../../services/contactsService";
import { Contact } from "../../types/CRM";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

interface ContactDetailsFormProps {
    contact: Contact | null;
    onEdit?: (newContact: Contact) => void;
    closeModal?: () => void;
}

export default function ContactDetailsForm(props: ContactDetailsFormProps) {
    const { contact, onEdit, closeModal } = props;
    const [name, setName] = useState(contact?.name || "");
    const [email, setEmail] = useState(contact?.email || "");
    const [phone, setPhone] = useState(contact?.phone || "");
    const [company, setCompany] = useState(contact?.company || "");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        if (!name || !email || !phone || !company) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        toast.promise(
            contact ? updateContact({ id: contact.id, name, email, phone, company }) : createContact({ name, email, phone, company }),
            {
                pending: 'Saving information...',
                success: 'Contact details saved successfully!',
                error: {
                    render({ data }) {
                        return <span>{data as any}</span>
                    }
                }
            }
        ).then((newContact: Contact) => {
            if (closeModal) {
                closeModal();
            }
            if (onEdit) {
                onEdit(newContact);
            }
        })
    }

    return <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Contact Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Fill in contact details.
            </p>
        </div>
        <div className="flex flex-col">
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
                {/* <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" value="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input type="text" value="https://instagram.com/PimjoHQ" />
                  </div>
                </div>
              </div> */}
                <div className="mt-7">
                    {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Personal Information
                    </h5> */}

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div className="col-span-2 lg:col-span-1">
                            <Label>Name<span className="text-error-500">*</span></Label>
                            <Input type="text"
                                value={name}
                                onChange={e => { setName(e.target.value) }} />
                        </div>



                        <div className="col-span-2 lg:col-span-1">
                            <Label>Email Address<span className="text-error-500">*</span></Label>
                            <Input type="text"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>Phone<span className="text-error-500">*</span></Label>
                            <Input type="text"
                                value={phone}
                                onChange={e => { setPhone(e.target.value) }} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>Company<span className="text-error-500">*</span></Label>
                            <Input type="text"
                                value={company}
                                onChange={e => { setCompany(e.target.value) }} />
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && <p className="text-error-500">{errorMessage}</p>}
            <div className="flex flex-row justify-end items-center gap-3 px-2 mt-6 lg:justify-end">
                {closeModal && <Button size="sm" variant="outline" onClick={closeModal}>
                    Close
                </Button>}
                <Button size="sm" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </div>
    </div>

}