type GreetProps = {
  name?: string;
};

export const Greet = ({ name }: GreetProps) => {
  const hour = new Date().getHours();
  let greeting: string;
  if (hour < 12) {
    greeting = "Buenos días";
  } else if (hour < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }
  
  return (
    <h1 className="text-lg md:text-3xl">
      ¡{greeting} 👋,{" "}
      {name ? (
        <span className="font-bold">{name.split(" ")[0]}</span>
      ) : (
        <span className="skeleton w-full h-4 rounded-md" />
      )}
      !
    </h1>
  );
};
