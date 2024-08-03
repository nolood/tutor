import { Divider, Link } from "@nextui-org/react";
import { ReactNode } from "react";

type LinkVariantsFormProps = {
  title: ReactNode;
  link: string;
  text: string;
};

const LinkVariantsForm = ({ title, link, text }: LinkVariantsFormProps) => {
  return (
    <>
      <Divider className="my-4" />
      <div className={"flex align-items-center justify-end w-full gap-4"}>
        <span className={"text-lg text-fuchsia-100"}>{title}</span>
        <Link href={link} color="secondary" className={"text-xl"}>
          {text}
        </Link>
      </div>
    </>
  );
};

export default LinkVariantsForm;
