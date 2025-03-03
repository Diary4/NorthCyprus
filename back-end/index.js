import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connection from "./connection.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb("Error: Only images and PDFs are allowed!");
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

const filesToUpload = upload.fields([
  { name: "passport", maxCount: 1 },
  { name: "masterTranscript", maxCount: 1 },
  { name: "thesisPropsal", maxCount: 1 },
  { name: "bachelorTranscript", maxCount: 1 },
  { name: "masterCertification", maxCount: 1 },
  { name: "recommendationLetter", maxCount: 1 },
  { name: "grade12Transcript", maxCount: 1 },
]);

app.post("/submit", filesToUpload, (req, res) => {
  try {
    const values = req.body;

    const files = req.files || {};
    const passportFile = files.passport ? fs.readFileSync(files.passport[0].path) : null;
    const masterTranscriptFile = files.masterTranscript ? fs.readFileSync(files.masterTranscript[0].path) : null;
    const thesisProposalFile = files.thesisPropsal ? fs.readFileSync(files.thesisPropsal[0].path) : null;
    const bachelorTranscriptFile = files.bachelorTranscript ? fs.readFileSync(files.bachelorTranscript[0].path) : null;
    const masterCertificationFile = files.masterCertification ? fs.readFileSync(files.masterCertification[0].path) : null;
    const recommendationLetterFile = files.recommendationLetter ? fs.readFileSync(files.recommendationLetter[0].path) : null;
    const grade12TranscriptFile = files.grade12Transcript ? fs.readFileSync(files.grade12Transcript[0].path) : null;

    const query = `
      INSERT INTO users (
        first_name, last_name, father_name, date_of_birth, phone_number, email_address,
        nationality, passport, degree, university, department, scholar_ship,
        master_transcript, thesis_proposal, bachelor_transcript, master_certification,
        recommendation_letter, 12_grade_transcript
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const sanitizedValues = [
      values.firstName,
      values.lastName,
      values.fathersName,
      values.DOB,
      values.phone,
      values.email,
      values.nationality,
      passportFile,
      values.degree,
      values.university,
      values.department,
      values.scholarship,
      masterTranscriptFile,
      thesisProposalFile,
      bachelorTranscriptFile,
      masterCertificationFile,
      recommendationLetterFile,
      grade12TranscriptFile,
    ];

    connection.query(query, sanitizedValues, (e, result) => {
      if (e) {
        console.error("Error inserting data into the database:", e.message);
        return res.status(500).json({ error: e.message });
      }
      res.status(201).json({
        message: "User added successfully",
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error("Internal server error:", error);
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

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
