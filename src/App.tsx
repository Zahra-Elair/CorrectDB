import { useState } from "react";
import SelectForm from "./app/selectForm";

function App() {
  const [user, setUser] = useState("");
  console.log(user);

  return (
    <div className="flex flex-col justify-center items-center dark:bg-[#222831] dark:text-[#EFEFEF] ">
      <div className="flex flex-col justify-center items-center gap-16 h-screen w-fit ">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            Lets Correct our Database
          </h1>
          <p className=" text-muted-foreground text-lg">
            You can choose to Confirm, Modify or Delete the expression from the
            database.
          </p>
        </div>
        <SelectForm setUser={setUser} />
      </div>
    </div>
  );
}

export default App;
