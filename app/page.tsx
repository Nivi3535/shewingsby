import CategoryCards from "@/components/CategoryCards/CategoryCards";
import Hero from "@/components/Hero/Hero";
import Divider from "@/components/common/Divider";
import Categories from "@/components/UICategories/UICategories";
import Chatbot from "@/components/Chatbot/Chatbot";

import "./globals.css";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <Divider></Divider>
      <CategoryCards></CategoryCards>
      <Categories></Categories>
      <Chatbot></Chatbot>
    </>
  );
}
