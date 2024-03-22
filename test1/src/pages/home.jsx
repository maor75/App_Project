import React from "react";
import Table from "../components/UI/table/table";

const Home = () => {
    const httpUrl = 'http://127.0.0.1:8000/product'; // Define the HTTP URL here

    return (
        <div>
            <h1>This is our Home page</h1>
            <Table FetchUrl={httpUrl}></Table>
        </div>
    );
};

export default Home;
