import express from "express";
import bodyParser from "body-parser";
import upload from "./upload.js"
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const apiUrl ="http://localhost:5000/process_image";
const app = express();
app.use(express.static('public'));

const port =2000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
   res.render("index.ejs"); 
});

app.post("/upload",upload.single("file") ,async (req,res)=>
{    
    let trend_index= [];
    for (let i = 0; i < 5; i++) {
        trend_index.push(Math.floor(Math.random() * 100)); // Generate random numbers between 0 and 99
    }

    
    let imgpath = path.join(__dirname,req.file.path);


    const formData = new FormData();
    formData.append("image",fs.createReadStream(imgpath));// the key to send is image for the api
    
    try {
        const response = await axios.post(apiUrl,formData, {
            headers:{
                ...formData.getHeaders(),
                
            }
            
        });

        let images_data = response.data.similar_images;
        console.log(images_data);

        res.render("index.ejs",{message : "Image Uploaded successfully!", images: images_data, trendIndex: trend_index});

    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
    
});

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});