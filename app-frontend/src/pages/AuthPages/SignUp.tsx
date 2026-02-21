import SignUpForm from "../../components/auth/SignUpForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title=""
        description=""
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
