import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TextareaForm from "./textAreaForm";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Hero = () => {
  const [data, setData] = useState([]); // Store the entire data set
  const [orText, setOrText] = useState(""); // Original text
  const [trText, setTrText] = useState(""); // Translated text

  const [modOr, setModOr] = useState(false);
  const [modTr, setModTr] = useState(false);
  const location = useLocation();
  const user = location.state?.user || "Guest";
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current row

  // Load data from JSON file
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const jsonData = await response.json();
      setData(jsonData); // Load all data
      setOrText(jsonData[0].original); // Set the first row original text
      setTrText(jsonData[0].translated); // Set the first row translated text
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle Confirm and fetch the next row
  const handleConfirm = () => {
    // Update the current row with the new values
    const updatedData = [...data];
    updatedData[currentIndex] = {
      original: orText,
      translated: trText,
    };

    setData(updatedData); // Update the state with the new data
    console.log(updatedData);

    // Simulate saving the data to the "database"
    toast({
      title: "You submitted this expression:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              { "Original Text": orText, "Translated Text": trText },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });

    // Move to the next row if available
    const nextIndex = currentIndex + 1;
    if (nextIndex < updatedData.length) {
      setCurrentIndex(nextIndex);
      setOrText(updatedData[nextIndex].original);
      setTrText(updatedData[nextIndex].translated);
    } else {
      alert("No more rows left to display");
    }
  };

  // Function to handle text modification
  function handleModOr() {
    setModOr(true);
  }
  function handleModTr() {
    setModTr(true);
  }

  // Simulated delete operation
  const handleDelete = async () => {
    // Create a copy of the current data
    const updatedData = [...data];

    // Remove the current row
    updatedData.splice(currentIndex, 1);

    // Update the state with the new data
    setData(updatedData);
    console.log(updatedData);

    // Move to the next row if available
    const nextIndex =
      currentIndex < updatedData.length ? currentIndex : currentIndex - 1;

    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex);
      setOrText(updatedData[nextIndex].original);
      setTrText(updatedData[nextIndex].translated);
    } else {
      alert("No more rows left to display");
      setOrText(""); // Clear the original text
      setTrText(""); // Clear the translated text
    }

    // Display a toast message confirming deletion
    toast({
      title: "You Deleted this expression:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              { "Original Text": orText, "Translated Text": trText },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full relative gap-10 ">
      {/* User information */}
      <div className="flex flex-row justify-center items-center gap-4 absolute top-4 left-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h1 className="text-lg font-semibold">{user}</h1>
      </div>

      <div className="rounded-lg border shadow-md flex flex-col  p-8 ">
        {/* Original text */}
        <div className="flex flex-col justify-center items-start gap-8 w-[650px] ">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Original Text :
          </h1>
          <div className="flex justify-center pl-2 items-start gap-4 ">
            <div className="w-[600px] h-[150px]">
              {!modOr && (
                <p className="text-muted-foreground text-lg">{orText}</p>
              )}
              {modOr && (
                <TextareaForm
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
                onClick={handleModOr}
                className="h-9 w-9"
              >
                <LuPencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Separator className="my-4 w-[650px]" />

        {/* Translated text */}
        <div className="flex flex-col justify-center items-start gap-8 w-[650px] ">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Translated Text :
          </h1>
          <div className="flex justify-center pl-2 items-start gap-4 ">
            <div className="w-[600px] h-[150px]">
              {!modTr && (
                <p className="text-muted-foreground text-lg">{trText}</p>
              )}
              {modTr && (
                <TextareaForm
                  Text={trText}
                  setOrText={setTrText}
                  setModOr={setModTr}
                />
              )}
            </div>
            {!modTr && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleModTr}
                className="h-9 w-9"
              >
                <LuPencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-10">
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={handleConfirm}
        >
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Confirm
        </Button>
        <Button
          variant="destructive"
          className="text-white hover:bg-red-600"
          onClick={handleDelete}
        >
          <MdDeleteOutline className="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default Hero;
