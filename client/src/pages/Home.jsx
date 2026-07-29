import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import UrlForm from "../components/UrlForm/UrlForm";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <UrlForm />
        </>
    );
};

export default Home;