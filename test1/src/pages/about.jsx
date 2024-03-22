import React from "react";
import Table from "../components/UI/table/table";

const About = () => {
    const httpUrl = 'http://127.0.0.1:8000/costumers'; // Define the HTTP URL here

    return (
        <div>
            

            <Table FetchUrl={httpUrl}></Table>
        </div>
    );
};
export default About;