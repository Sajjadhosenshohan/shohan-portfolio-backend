/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { addProject, deleteProject, updateProject } from "@/services/project";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type EntityType = "project" | "blog";
type ActionType = "create" | "update" | "delete";

interface EntityHandlers {
  create: (data: any) => Promise<any>;
  update: (data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}


const entityHandlersMap: Partial<Record<EntityType, EntityHandlers>> = {
  project: {
    create: addProject,
    update: updateProject,
    delete: deleteProject,
  }
};


export const handleEntityAction = async (
  entity: EntityType,
  action: ActionType,
  payload: FormData | string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setIsFormOpen?: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const entityHandler = entityHandlersMap[entity];

    if (!entityHandler) {
      toast.error(`No handler defined for ${entity}`);
      return;
    }

    const handler = entityHandler[action];

    if (!handler) {
      toast.error(`No action "${action}" defined for ${entity}`);
      return;
    }

    const res = await handler(payload as any);

    console.log("response of project",res)
    if (res.success) {
      toast.success(res?.message || `${entity} ${action}d successfully`);
      setIsFormOpen?.(false);
    } else {
      toast.error(res?.message || `Failed to ${action} ${entity}`);
    }
  } catch (error: any) {
    toast.error(error?.message || `Failed to ${action} ${entity}`);
  } finally {
    setLoading(false);
  }
};
