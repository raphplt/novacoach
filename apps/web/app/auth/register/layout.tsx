import { RegisterProvider } from "contexts/RegisterProvider";

const RegisterLayout = async ({ children }: { children: React.ReactNode }) => {
	return <RegisterProvider>{children}</RegisterProvider>;
};

export default RegisterLayout;
