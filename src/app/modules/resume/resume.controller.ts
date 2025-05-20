import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResumeServices } from "./resume.service";

import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

import { Request, Response } from "express";
import axios from "axios";

const addResumeIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body;

  // if (req.file) {
  //   const uploadsDir = path.join(process.cwd(), "public/resumes");

  //   // Ensure directory exists
  //   if (!fs.existsSync(uploadsDir)) {
  //     try {
  //       fs.mkdirSync(uploadsDir, { recursive: true });
  //     } catch (error) {
  //       throw new Error(
  //         `Failed to create uploads directory: ${(error as Error).message}`
  //       );
  //     }
  //   }

  //   const uniqueFilename = `${uuidv4()}-${req.file.originalname}`;
  //   const filePath = path.join(uploadsDir, uniqueFilename);

  //   // Save file asynchronously
  //   try {
  //     await fs.promises.writeFile(filePath, req.file.buffer);
  //     console.log("File saved at:", filePath);
  //     data.pdfUrl = `/api/resumes/${uniqueFilename}`;
  //     console.log("File URL sdfh:", data.pdfUrl);
  //   } catch (error) {
  //     throw new Error(`Failed to save file: ${(error as Error).message}`);
  //   }
  // }

  // if (req.file) {
  //      // Instead of saving to filesystem, pass the buffer to the service
  //     //  data.pdfBuffer = req.file.buffer;
  //      // Optionally, you can still store a reference URL or ID
  //      data.pdfUrl = `/api/resumes/${Date.now()}-${req.file.originalname}`;
  //    }

  const result = await ResumeServices.addResumeIntoDB(data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New Resume added Successfully",
    data: result,
  });
});

const getAllResumeDataFromDB = catchAsync(async (req, res) => {
  const result = await ResumeServices.getAllResumeDataFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Resume retrieved successfully",
    data: result,
  });
});
// const updateResumeFromDB = catchAsync(async (req, res) => {
//    const {id, ...skillInfo} = req.body;
//   const result = await ResumeServices.updateResumeFromDB(id,skillInfo);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Resume updated successfully',
//     data: result,
//   });
// });
export const updateResumeFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const data = req?.body;

    // if (req.file) {
    //   const uploadsDir = path.join(process.cwd(), "public/resumes");

    //   // Ensure directory exists
    //   if (!fs.existsSync(uploadsDir)) {
    //     try {
    //       fs.mkdirSync(uploadsDir, { recursive: true });
    //     } catch (error) {
    //       throw new Error(
    //         `Failed to create uploads directory: ${(error as Error).message}`
    //       );
    //     }
    //   }

    //   const uniqueFilename = `${uuidv4()}-${req.file.originalname}`;
    //   const filePath = path.join(uploadsDir, uniqueFilename);

    //   // Save file asynchronously
    //   try {
    //     await fs.promises.writeFile(filePath, req.file.buffer);
    //     // console.log("File saved at:", filePath);
    //     data.pdfUrl = `/api/resumes/${uniqueFilename}`;
    //     // console.log("File URL sdfh:", skillInfo.pdfUrl);
    //   } catch (error) {
    //     throw new Error(`Failed to save file: ${(error as Error).message}`);
    //   }
    // }
    const result = await ResumeServices.updateResumeFromDB(data);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Resume updated successfully",
      data: result,
    });
  }
);

const deleteResumeFromDB = catchAsync(async (req, res) => {
  const result = await ResumeServices.deleteResumeFromDB(
    req.query.id as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Resume deleted successfully",
    data: result,
  });
});

const ResumeGets = {
  streamResumePDF: async (req: Request, res: Response) => {
    const pdfUrl = req.query.url as string;

    if (!pdfUrl) {
      return res.status(400).json({ message: "PDF URL is required" });
    }

    try {
      // Validate URL
      try {
        new URL(pdfUrl);
      } catch {
        return res.status(400).json({ message: "Invalid PDF URL" });
      }

      const response = await axios.get(pdfUrl, {
        responseType: "stream",
      });

      const contentType = response.headers["content-type"];
      if (!contentType.includes("pdf")) {
        return res
          .status(400)
          .json({ message: "URL does not point to a PDF file" });
      }

      // Set headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");

      // Stream the PDF
      response.data.pipe(res);
    } catch (error) {
      console.error("Failed to stream PDF:", error);
      res.status(500).json({ message: "Failed to load PDF" });
    }
  },
};

export const ResumeController = {
  addResumeIntoDB,
  getAllResumeDataFromDB,
  deleteResumeFromDB,
  updateResumeFromDB,
  ResumeGets,
};
