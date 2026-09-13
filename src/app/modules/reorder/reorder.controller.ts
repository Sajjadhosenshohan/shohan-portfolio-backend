import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReorderServices } from "./reorder.service";

const reorderEntities = catchAsync(async (req, res) => {
  const { entity, orderedIds } = req.body;

  if (!entity || !orderedIds || !Array.isArray(orderedIds)) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "entity and orderedIds array are required",
      data: null,
    });
  }

  const validEntities = ["resume", "project", "blog", "skill"];
  if (!validEntities.includes(entity)) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: `Invalid entity. Must be one of: ${validEntities.join(", ")}`,
      data: null,
    });
  }

  const result = await ReorderServices.reorderEntities(entity, orderedIds);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: result,
  });
});

export const ReorderController = {
  reorderEntities,
};
