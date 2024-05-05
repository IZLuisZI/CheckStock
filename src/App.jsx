import Form from "./components/Form";
import Title from "./components/Title";

function App() {
  return (
    <main
      className="grid place-items-center min-h-screen w-full bg-gray-50 dark:bg-black
      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
      dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    >
      <section className="mx-12 md:mx-72 lg:mx-96 lg:px-32">
        <Title />
        <Form />
      </section>
    </main>
  );
}

export default App;
