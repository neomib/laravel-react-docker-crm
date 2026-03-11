
import { render } from "@testing-library/react";
import ContactDetailsForm from "../ContactDetailsForm";


const mockData = {

  id: "1",
  name: "Test Contact 1",
  email: "test.contact1@gmail.com",
  phone: "0502250123",
  company: "Test Company"

};
// The test itself
describe('Contact Form Tests', () => {
  it('displays a contact form', async () => {

    // Rendering the component
    const { getByDisplayValue } = render(<ContactDetailsForm contact={mockData} />);
    // Awaiting the response
    const contactEmail = await getByDisplayValue("test.contact1@gmail.com");
    const contactName = await getByDisplayValue("Test Contact 1");
    // Assertion
    expect(contactEmail).toBeTruthy();
    expect(contactName).toBeTruthy();
  });
});
