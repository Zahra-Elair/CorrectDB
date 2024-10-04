import SelectForm from "./selectForm";

function Auth() {
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-16 ">
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
            Lets Correct our Database
          </h1>
          <p className=" text-muted-foreground lg:text-lg px-2">
            You can choose to Confirm, Modify or Delete the expression from the
            database.
          </p>
        </div>
        <SelectForm />
      </div>
    </div>
  );
}

export default Auth;
