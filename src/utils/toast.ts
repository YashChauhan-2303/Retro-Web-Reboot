
import { toast as sonnerToast } from "sonner";

export const toast = {
  info: (message: string) => sonnerToast.info(message),
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  warning: (message: string) => sonnerToast.warning(message),
};
