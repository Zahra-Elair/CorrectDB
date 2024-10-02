"use client";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const { toast } = useToast();
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
    <form className="w-full space-y-6">
      <Textarea
        placeholder="..."
        className="resize-none"
        value={text} // Bind the state to the value prop
        onChange={handleChange} // Update the state on change
      />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default TextareaForm;
