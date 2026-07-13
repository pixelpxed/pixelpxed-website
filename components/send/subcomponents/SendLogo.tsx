import MaterialIcon from "@/components/common/MaterialIcon";

const SendLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <MaterialIcon icon="package_2" size={24} className="text-primary" />
      <p className="font-bold">Send</p>
    </div>
  );
};

export default SendLogo;
