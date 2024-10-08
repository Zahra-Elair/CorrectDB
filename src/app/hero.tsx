import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
// import { LuPencil } from "react-icons/lu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import TextareaForm from "./textAreaForm";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import TrTextSection from "./trTextSection";
import OrTextSection from "./orTextSection";

const Hero = () => {
  const [data, setData] =
    useState<{ original: string; translated: string }[]>(); // Store the entire data set
  const [orText, setOrText] = useState(""); // Original text
  const [trText, setTrText] = useState(""); // Translated text
  const [counter, setCounter] = useState(0); // personal counter

  const [modOr, setModOr] = useState(false);
  const [modTr, setModTr] = useState(false);
  const [modTn, setModTn] = useState(false);
  const location = useLocation();
  const user = location.state?.user || "Guest";
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current row
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [tnText, setTnText] = useState("اسليما چهناهويليك");

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
        <pre className="mt-2 w-[340px] rounded-md bg-[#37404e] p-4 dark:bg-accent-foreground ">
          <code className="text-white dark:text-black ">
            {JSON.stringify(
              { "Original Text": orText, "Translated Text": tnText },
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
        <pre className="mt-2 w-[340px] rounded-md bg-[#37404e] p-4 dark:bg-foreground ">
          <code className="text-white dark:text-black ">
            {JSON.stringify(
              { "Original Text": orText, "Translated Text": tnText },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full  h-screen gap-10  light:text-[#121212] ">
      {/* User information */}
      <div className="flex flex-row justify-center items-center gap-4 left-4 absolute top-4   ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h1 className="text-lg font-semibold">{user}</h1>
      </div>

      <div className="relative flex flex-col justify-center items-center rounded-lg border border-[#EFEFEF] shadow-md w-5/6 lg:w-3/6   px-6 py-4 lg:py-6">
        <p className="absolute top-[-30px] right-4">
          You corrected {counter} rows
        </p>

        {/* Original text */}
        <OrTextSection
          modOr={modOr}
          orText={orText}
          setOrText={setOrText}
          setModOr={setModOr}
        />
        <Separator className=" w-full dark:bg-[#37404e] my-6" />

        {/* Translated text */}
        <TrTextSection
          modOr={modTr}
          modTn={modTn}
          tnText={tnText}
          orText={trText}
          setOrText={setTrText}
          setModOr={setModTr}
          setTnText={setTnText}
          setModTn={setModTn}
        />
      </div>

      {/* Buttons */}
      <div className="flex  w-full justify-center items-center gap-6 md:gap-10 ">
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
