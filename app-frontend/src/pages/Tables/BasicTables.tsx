import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ContactsTable from "../../components/tables/Tables/ContactsTable";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <ContactsTable />
        </ComponentCard>
      </div>
    </>
  );
}
