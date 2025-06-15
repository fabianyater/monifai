type GreetProps = {
  name?: string;
};

export const Greet = ({ name }: GreetProps) => {
  const hour = new Date().getHours();
  let greeting: string;
  if (hour < 12) {
    greeting = "!Buenos días,👋";
  } else if (hour < 18) {
    greeting = "!Buenas tardes,👋";
  } else {
    greeting = "!Buenas noches, 👋";
  }

  return (
    <h2 className="text-xl font-bold">
      {name ? (
        <>
          {greeting}
          <span className="block">{name.split(" ")[0]}!</span>
        </>
      ) : (
        <span className="skeleton w-full h-4 rounded-md" />
      )}
    </h2>
  );
};
