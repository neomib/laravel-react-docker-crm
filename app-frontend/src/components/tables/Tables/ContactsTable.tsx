import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getAgentContacts } from "../../../services/contactsService";
import { Contact } from "../../../types/CRM";



export default function ContactsTable() {
  const contactsList: Contact[] | null = useSelector((state: any) => state.contacts.contactsList);
  const user = useSelector((state: any) => state.auth.user);

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user)
      getAgentContacts();
  }, [user]);

  useEffect(() => {
    filterContacts("");
  }, [contactsList]);

  const colors = ['bg-sky-400', 'bg-blue-400', 'bg-emerald-400', 'bg-violet-400', 'bg-teal-400'];

  const filterContacts = (searchStr: string) => {
    if (!contactsList) {
      return;
    }
    if (searchStr === "") {
      setFilteredContacts(contactsList);
    }
    else {
      // Using JSON.stringify to search contacts 
      const contactsStr = contactsList.map(c => JSON.stringify(c));
      setFilteredContacts(contactsStr.filter(c => c.includes(searchStr))
        .map(c => JSON.parse(c)));
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-4 sm:justify-end">
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            onChange={e => { filterContacts(e.target.value) }}
            type="text"
            placeholder="Search..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
        </div>
      </div>

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
              {filteredContacts.map((contact) => (
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
    </div>
  );
}
