import Swal from "sweetalert2";

export const Success_model = (message: Record<string, string>) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message.title || "Successfully!!!",
    text: message.text || "",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const Error_Modal = (message: Record<string, string>) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: message?.title || message || "Failed!!!",
    text: message?.text || "",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const ConfirmModal = (
  title?: string,
  message?: string,
  confirmBtnText?: string,
  cancelBtnText?: string,
) => {
  return Swal.fire({
    title: title || "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EA5326",
    cancelButtonColor: "#f11a00",
    confirmButtonText: confirmBtnText || "Yes, delete it!",
    cancelButtonText: cancelBtnText || "Cancel",
  });
};
