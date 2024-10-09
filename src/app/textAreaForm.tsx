"use client";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface TextareaProps {
  type: string;
  Text: string;
  setOrText: (orText: string) => void;
  setModOr: (modOr: boolean) => void;
}

const TextareaForm: React.FC<TextareaProps> = ({
  type,
  Text,
  setOrText,
  setModOr,
}) => {
  const [text, setText] = useState(Text);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setOrText(text); // Call the parent state setter to update the original text
    setModOr(false);
    console.log("submitting...");
  }

  function handleReload(event: React.FormEvent) {
    event.preventDefault();
    console.log("reloading...");
    setText("tarjma");
    setShowKeyboard(false);
  }

  const [showKeyboard, setShowKeyboard] = useState(false);

  const onChange = (input: string) => {
    setText(input);
  };

  return (
    <div className="relative">
      <form className=" flex gap-2 justify-between items-center  ">
        <Textarea
          placeholder="..."
          className="resize-none dark:border-[#EFEFEF] w-full  "
          value={text} // Bind the state to the value prop
          onChange={handleChange} // Update the state on change
          onFocus={() => setShowKeyboard(true)}
        />

        {/* buttons */}
        <div>
          {/* submit button */}
          {(type === "tr" || type === "or") && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleSubmit}
              className="h-9 w-9  border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
            >
              <FaCheck className="h-4 w-4" />
            </Button>
          )}
          {/* reload button */}
          {type === "tn" && (
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleReload}
                      className="h-9 w-9  border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
                    >
                      <TbReload className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tounsi {"=>"} تونسي </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="outline"
                size="icon"
                onClick={handleSubmit}
                className="h-9 w-9  border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
              >
                <FaCheck className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </form>
      <div className="absolute w-full bottom-[-400%] dark:text-black">
        {showKeyboard && (
          <Keyboard
            onChange={onChange}
            input={text}
            onKeyPress={(button) => {
              console.log("key pressed = ", text);
              if (button === "{bksp}") {
                setText(text.slice(0, -1));
              }
            }}
            layout={{
              default: [
                "1 2 3 4 5 6 7 8 9 0",
                "ض ص ث ق ف غ ع ه خ ح ج د",
                "ش س ي ب ل ا ت ن م ك ط",
                "ڨ ئ ء ؤ ر لا ى ة و ز ظ {bksp}",
                "{space}",
              ],
            }}
            display={{
              "{bksp}": "⌫",
              // "{shift}": "⇧",
              "{space}": "Space",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TextareaForm;
