import MaterialIcon from "@/components/common/MaterialIcon";
import Link from "next/link";

const SendLogo = () => {
  return (
    <Link href="/send" className="flex items-center gap-1">
      <MaterialIcon icon="package_2" size={24} className="text-primary" />
      <p className="font-bold">Send</p>
    </Link>
  );
};

export default SendLogo;
