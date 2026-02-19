import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getAgentContacts } from "../../../services/contactsService";
import { Contact } from "../../../types/CRM";


export default function ContactsTable() {
  const contactsList: Contact[] = useSelector((state: any) => state.contacts.contactsList);
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (user)
      getAgentContacts();
  }, [user]);

  const colors = ['bg-sky-400', 'bg-blue-400', 'bg-emerald-400', 'bg-violet-400', 'bg-teal-400'];
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Phone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Company
              </TableCell>

            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {contactsList && contactsList.map((contact) => (

              <TableRow key={contact.id} className="text-gray-800 dark:text-white/90 hover:bg-slate-50 dark:hover:bg-gray-500">
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <Link to={`contacts/${contact.id}`} className="flex items-center gap-3">
                    <div className={`w-10 h-10 overflow-hidden rounded-full flex items-center justify-center text-theme-xl text-white ${colors[Math.floor(Math.random() * colors.length)]}`}>
                      {contact.name[0]}
                    </div>
                    <div>
                      <span className="block font-medium  text-theme-sm ">
                        {contact.name}
                      </span>

                    </div>
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3  text-start text-theme-sm ">
                  <Link to={`contacts/${contact.id}`} >
                    <div className="h-10 flex items-center">{contact.email}</div>
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3  text-start text-theme-sm">
                  <Link to={`contacts/${contact.id}`} >
                    <div className="h-10 flex items-center">{contact.phone}</div>
                  </Link>
                </TableCell>

                <TableCell className="px-4 py-3  text-theme-sm ">
                  <Link to={`contacts/${contact.id}`} >
                    <div className="h-10 flex items-center">{contact.company}</div>
                  </Link>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
