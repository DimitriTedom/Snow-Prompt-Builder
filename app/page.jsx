import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="gradient_text text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">Snow Prompt Builder is an open-source AI prompting tool for modern world to generate,save and share creative prompts 😍️</p>

      <Feed/>
    </section>
  );
};
export default Home;
