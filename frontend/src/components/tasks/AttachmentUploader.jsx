import { useRef, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AttachmentUploader({
  taskId,
  onUploadSuccess,
}) {

  const inputRef =
    useRef(null);

  const [loading,
    setLoading] =
    useState(false);

  const uploadFile =
    async (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      setLoading(true);

      try {

        const response =
    await api.post(
        `/tasks/${taskId}/attachments`,
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data"
            }
        }
    );

toast.success(
    "File uploaded successfully"
);

if(
    onUploadSuccess
){
    onUploadSuccess(
        response.data.attachment
    );
}

      } catch (error) {

        

        toast.error(
          error.response?.data
            ?.message ||
          "Upload failed"
        );

      }

      setLoading(false);

      event.target.value =
        "";

    };

  return (

    <div
      style={{
        marginTop: "15px",
      }}
    >

      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={
          uploadFile
        }
      />

      <button
        disabled={loading}
        onClick={() =>
          inputRef.current.click()
        }
        style={{
          background:
            "#EFF6FF",

          color:
            "#2563EB",

          border:
            "1px solid #BFDBFE",

          padding:
            "10px 16px",

          borderRadius:
            "12px",

          cursor:
            "pointer",

          fontWeight:
            "600",

          width:
            "100%",
        }}
      >

        {loading
          ? "Uploading..."
          : "📎 Upload File"}

      </button>

    </div>

  );

}

export default AttachmentUploader;
