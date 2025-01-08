import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connection from "./connection.js";
import multer from "multer";
import fs from "fs";
import path from 'path'
import { env } from "process";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb('Error: Only images and PDFs are allowed!');
    }
  },
});

connection.connect((e) => {
  if (e) {
    console.error("Error connecting to the database:", e.message);
  } else {
    console.log("Connected to the MySQL database");
  }
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  connection.query(query, (e, result) => {
    if (e) {
      console.log("Failed to retrieve data");
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(result);
    }
  });
});

const sanitizeValue = (value) => {
  if (typeof value === "string" && value.trim() === "") return null; 
  if (typeof value === "object" && Object.keys(value).length === 0) return null; 
  return value;
};

const filesToUpload = upload.fields([
  { name: 'passport', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'personalImage', maxCount: 1 },
]);

app.post("/submit", filesToUpload, (req, res) => {
  try {
    const values = req.body;

    const passportFile = req.files.passport ? fs.readFileSync(req.files.passport[0].path) : null;
    const cvFile = req.files.cv ? fs.readFileSync(req.files.cv[0].path) : null;
    const personalImageFile = req.files.personalImage ? fs.readFileSync(req.files.personalImage[0].path) : null;

    console.log("Body:", values);
    console.log("Files:", req.files);

    const query = `
      INSERT INTO users (
        first_name, last_name, father_name, date_of_birth, phone_number, email_address,
        nationality, passport, degree, university, department, cv, personal_image
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const sanitizedValues = [
      sanitizeValue(values.firstName),
      sanitizeValue(values.lastName),
      sanitizeValue(values.fathersName),
      sanitizeValue(values.DOB),
      sanitizeValue(values.phone),
      sanitizeValue(values.email),
      sanitizeValue(values.nationality),
      passportFile,
      sanitizeValue(values.degree),
      sanitizeValue(values.university),
      sanitizeValue(values.department),
      cvFile,
      personalImageFile,
    ];

    connection.query(query, sanitizedValues, (e, result) => {
      if (e) {
        console.error("Error inserting data:", e.message);
        console.log("Sanitized values:", sanitizedValues);
        return res.status(500).json({ error: e.message });
      } else {
        console.log("Data inserted:", sanitizedValues);
        return res.status(201).json({
          message: "User added successfully",
          id: result.insertId,
        });
      }
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/download/:id/:document", (req, res) => {
  const userId = req.params.id;
  const document = req.params.document;

  const query = `SELECT ${document} FROM users WHERE ID = ?`;

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error retrieving file:", err);
      return res.status(500).json({ error: "Failed to retrieve file" });
    }

    if (!result[0] || !result[0][document]) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileBuffer = result[0][document];
    let fileExtension = "";
    let contentType = "";

    
    const fileHeader = fileBuffer.toString("hex", 0, 4); 

    if (fileHeader === "ffd8ffe0" || fileHeader === "ffd8ffe1") {
      
      fileExtension = ".jpg";
      contentType = "image/jpeg";
    } else if (fileHeader === "89504e47") {
      
      fileExtension = ".png";
      contentType = "image/png";
    } else if (fileHeader.startsWith("25504446")) {
      
      fileExtension = ".pdf";
      contentType = "application/pdf";
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${document}${fileExtension}`
    );

    
    res.send(fileBuffer);
  });
});


app.listen(3000 , () => {
  console.log("Server is running on port : 3000");
});
