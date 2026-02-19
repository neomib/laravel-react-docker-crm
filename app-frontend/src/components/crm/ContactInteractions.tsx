import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { createInteraction } from "../../services/contactsService";
import { Contact, ContactInteraction, InteractionType } from "../../types/CRM";
import Divider from "../common/Divider";
import Label from "../form/Label";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";

interface ContactInteractionsProps {
    interactions: ContactInteraction[];
    contact: Contact;
    onAdd: (interaction: ContactInteraction) => void;
}

export default function ContactInteractions(props: ContactInteractionsProps) {
    const { interactions, contact, onAdd } = props;
    const [interactionType, setInteractionType] = useState(InteractionType.Email);
    const [note, setNote] = useState("");

    const addActivity = () => {
        toast.promise(
            createInteraction({
                type: interactionType,
                contact_id: contact.id || '', note
            }),
            {
                pending: 'Please wait...',
                // success: 'Note added successfully!',
                error: {
                    render({ data }) {
                        return <span>{data as any}</span>
                    }
                }
            },
        ).then((res) => {
            onAdd(res as ContactInteraction);
        })
    }

    return <div>
        <div className="p-5 mb-8 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <Label>Activity Type</Label>
            <Select defaultValue={interactionType}
                options={Object.entries(InteractionType)
                    .map(([key, value]) => ({
                        value: key, label: value.toString()
                    }))}
                onChange={(value => setInteractionType(value as any))}
                className="dark:bg-dark-900" />
            <Label className="mt-4">Note</Label>
            <TextArea placeholder="Enter a note"
                value={note}
                onChange={(value) => setNote(value)}
                rows={3}
            />
            <div className="flex lg:justify-end">
                <Button className="mt-2 width lg:width-initial" onClick={addActivity}>Add Activity</Button>
            </div>
        </div>
        {interactions.map((interaction, index, arr) => <div>
            <div className="flex justify-between">
                <Label className="text-sm text-gray-400">Activity: {interaction.type}</Label>
                <Label className="text-sm text-gray-400">
                    {moment(interaction.updated_at).format("MMMM Do YYYY, h:mm a")}
                </Label>
            </div>
            <p className="text-lg dark:text-white">{interaction.note}</p>
            {index < arr.length - 1 && <Divider />}
        </div>)}
    </div>
}