import http from "http"
import { app } from "./app";

const express = require('express');

const port = process.env.post || 3306;
const   server = http.createServer(app);


server.listen(port,()=>{

    console.log("Server is Started");
} );
