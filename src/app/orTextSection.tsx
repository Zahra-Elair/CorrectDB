import React from "react";
import TextareaForm from "./textAreaForm";
import { Button } from "@/components/ui/button";
import { LuPencil } from "react-icons/lu";

interface orTextSectionProps {
  modOr: boolean;
  orText: string;
  setOrText: (orText: string) => void;
  setModOr: (modOr: boolean) => void;
}

const OrTextSection: React.FC<orTextSectionProps> = ({
  modOr,
  orText,
  setOrText,
  setModOr,
}) => {
  return (
    <div className="flex flex-col justify-center items-start gap-10  w-full">
      <h1 className="scroll-m-20 text-lg md:text-2xl font-extrabold tracking-tight lg:text-3xl">
        Original Text :
      </h1>
      <div className="flex justify-between gap-4 px-2 items-center  w-full ">
        <div className="w-full">
          {!modOr && (
            <p className="text-muted-foreground text-lg h-[60px] overflow-y-auto  ">
              {orText}
            </p>
          )}
          {modOr && (
            <TextareaForm
              type="or"
              Text={orText}
              setOrText={setOrText}
              setModOr={setModOr}
            />
          )}
        </div>
        {!modOr && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setModOr(true);
            }}
            className="h-9 w-9  border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
          >
            <LuPencil className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrTextSection;
