import MaterialIcon from "@/components/MaterialIcon";

const AboutHeader = () => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <MaterialIcon icon="package_2" size={24} />
        <p className="font-bold">Send</p>
      </div>
    </div>
  );
};

export default AboutHeader;
