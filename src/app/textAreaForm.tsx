"use client";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface TextareaProps {
  Text: string;
  setOrText: (orText: string) => void;
  setModOr: (modOr: boolean) => void;
}

const TextareaForm: React.FC<TextareaProps> = ({
  Text,
  setOrText,
  setModOr,
}) => {
  // Set initial default value
  const [text, setText] = useState(Text);

  // Handle change event for TextArea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value); // Update the state with the new value
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission behavior
    setOrText(text); // Call the parent state setter to update the original text
    setModOr(false);
    // toast({
    //   title: "You submitted this text:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(text, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <form className="w-full  flex gap-2 justify-between items-center  ">
      <Textarea
        placeholder="..."
        className="resize-none dark:border-[#EFEFEF] w-full"
        value={text} // Bind the state to the value prop
        onChange={handleChange} // Update the state on change
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleSubmit}
        className="h-9 w-9  border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
      >
        <FaCheck className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TextareaForm;
