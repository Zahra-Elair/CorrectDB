import { useEffect, useState } from "react";
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
  const [data, setData] =
    useState<{ original: string; translated: string }[]>(); // Store the entire data set
  const [orText, setOrText] = useState(""); // Original text
  const [trText, setTrText] = useState(""); // Translated text
  const [counter, setCounter] = useState(0); // personal counter

  const [modOr, setModOr] = useState(false);
  const [modTr, setModTr] = useState(false);
  const location = useLocation();
  const user = location.state?.user || "Guest";
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current row
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

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
  // ----------------------------------------------------------------------------------------------------------

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // ------------------------------------------------CONFIRM----------------------------------------------------------

  // Function to handle Confirm and fetch the next row
  const handleConfirm = () => {
    // Update the current row with the new values
    const updatedData: { original: string; translated: string }[] = [
      ...(data as []),
    ];
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
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 dark:bg-accent-foreground ">
          <code className="text-white dark:text-black ">
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
      setCounter(counter + 1);
    } else {
      setCounter(counter + 1);
      setOrText("");
      setTrText("");
      // setCurrentIndex(0);
      // Deactivate the confirm and delete buttons
      setConfirmButtonDisabled(true); // Disable the Confirm button
      setDeleteButtonDisabled(true); // Disable the Delete button
      alert("No more rows left to display");
    }
  };
  // ----------------------------------------------------------------------------------------------------------

  // Function to handle text modification
  function handleModOr() {
    setModOr(true);
  }
  function handleModTr() {
    setModTr(true);
  }
  // -------------------------------------------DELETE---------------------------------------------------------------

  // Simulated delete operation
  const handleDelete = async () => {
    // Create a copy of the current data
    const updatedData: {
      original: string;
      translated: string;
    }[] = [...(data as [])];

    // Remove the current item
    const updatedDataAfterDeletion = updatedData.filter(
      (_, index) => index !== currentIndex
    );
    setCounter(counter + 1);

    // Handle edge cases when deleting the last item
    const nextIndex =
      currentIndex < updatedDataAfterDeletion.length
        ? currentIndex
        : currentIndex - 1;

    setData(updatedDataAfterDeletion);

    if (updatedDataAfterDeletion.length > 0 && nextIndex >= currentIndex) {
      setCurrentIndex(nextIndex); // Move to the correct index after deletion
      setOrText(updatedDataAfterDeletion[nextIndex].original);
      setTrText(updatedDataAfterDeletion[nextIndex].translated);
    } else {
      alert("No more rows left to display");
      setOrText("");
      setTrText("");
      setCurrentIndex(0);
      // Deactivate the confirm and delete buttons
      setConfirmButtonDisabled(true); // Disable the Confirm button
      setDeleteButtonDisabled(true); // Disable the Delete button
    }

    // Display a toast message confirming deletion
    toast({
      title: "You Deleted this expression:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 dark:bg-accent-foreground ">
          <code className="text-white dark:text-black ">
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
    <div className="flex flex-col justify-center items-center h-screen w-full relative gap-10  light:text-[#121212] dark:text-[#EFEFEF] dark:bg-[#222831]">
      {/* User information */}
      <div className="flex flex-row justify-center items-center gap-4 left-4 absolute top-4   ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h1 className="text-lg font-semibold">{user}</h1>
      </div>

      <div className="relative rounded-lg border border-[#EFEFEF] shadow-md flex flex-col  p-8 ">
        <p className="absolute top-2 right-4">You corrected {counter} rows</p>
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
                className="h-9 w-9 dark:bg-[#222831] border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
              >
                <LuPencil className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Separator className="my-4 w-[650px] bg-[#EFEFEF]" />

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
                className="h-9 w-9 dark:bg-[#222831] border dark:border-[#EFEFEF] hover:dark:bg-[#37404e]"
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
          disabled={confirmButtonDisabled}
          className="bg-[#30475E] text-white hover:bg-[#426282] dark:bg-[#205375] dark:hover:bg-[#164463]"
          onClick={handleConfirm}
        >
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Confirm
        </Button>
        <Button
          disabled={deleteButtonDisabled}
          className="text-white bg-[#F05454] hover:bg-[#f86b6b] dark:bg-[#F66B0E] dark:hover:bg-[#f66b0ed8]"
          onClick={handleDelete}
        >
          <MdDeleteOutline className="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default Hero;
