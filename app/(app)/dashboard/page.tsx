//I want to do load all the products from the database and display them in the dashboard page.
//  I want to use the fetch function to fetch the products from the database and pass them as props to the dashboard page. I also want to use the useEffect hook to fetch the products from the database when the component mounts. I want to use the useState hook to store the products in a state variable. I want to use the map function to iterate over the products and display them in a grid layout. I want to use Tailwind CSS to style the dashboard page.
//reason i want to do that as client component is below all the products
//user should have the ability to wishlist and add them to cart
//so this product page has to be a parent pages
//and the there is already grid page i have done but look for better design
//product image->product name->product price->
//then click on the product should display the product single product page with
//ages available then price for the selected age add to wishlist and add to cart confusing
//on the productdetails page after some point show similar product in the grid
import React from "react";
//import { InfiniteList } from "@/components/Dashboard/InfiniteList"; "@/components/Dashboard/Dashboard";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function page() {
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
}
