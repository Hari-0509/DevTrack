import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AttachmentList({ taskId }) {

  const [attachments, setAttachments] =
    useState([]);

    const addAttachment =
(
newAttachment
)=>
{
    setAttachments(
        previous=>[
            ...previous,
            newAttachment
        ]
    );
};

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (taskId) {
      loadAttachments();
    }

  }, [taskId]);

  const loadAttachments = async () => {

    try {

      const response =
        await api.get(
          `/tasks/${taskId}/attachments`
        );

      setAttachments(
        response.data || []
      );

    } catch (error) {

      
    }

    setLoading(false);

  };

  const deleteAttachment =
    async (id) => {

      if (
        !window.confirm(
          "Delete this attachment?"
        )
      ) {
        return;
      }

      try {

        await api.delete(
          `/attachments/${id}`
        );

        toast.success(
          "Attachment deleted"
        );

        loadAttachments();

      } catch (error) {

        toast.error(
          "Unable to delete attachment"
        );

      }

    };

  if (loading) {

    return (
      <p
        style={{
          color:"#64748B",
          marginTop:"12px"
        }}
      >
        Loading attachments...
      </p>
    );

  }

  return (

    <div
      style={{
        marginTop:"18px"
      }}
    >

      <h4
        style={{
          marginBottom:"12px",
          color:"#0F172A"
        }}
      >
        📎 Attachments
      </h4>

      {
        attachments.length===0 && (

          <p
            style={{
              color:"#64748B",
              fontSize:"14px"
            }}
          >
            No attachments
          </p>

        )
      }

      {

        attachments.map(
          (file)=>(

            <div
              key={file.id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"12px",
                marginBottom:"10px",
                border:"1px solid #E2E8F0",
                borderRadius:"12px",
                background:"#FFFFFF"
              }}
            >

              <div>

                <div
                  style={{
                    fontWeight:"600"
                  }}
                >
                  📄 {file.filename}
                </div>

                <small
                  style={{
                    color:"#64748B"
                  }}
                >
                  {file.created_at}
                </small>

              </div>

              <div
                style={{
                  display:"flex",
                  gap:"10px"
                }}
              >

                <a
                  href={`http://127.0.0.1:5000/attachments/${file.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration:"none",
                    color:"#2563EB",
                    fontWeight:"600"
                  }}
                >
                  Open
                </a>

                <button
                  onClick={()=>
                    deleteAttachment(
                      file.id
                    )
                  }
                  style={{
                    border:"none",
                    background:"#FEE2E2",
                    color:"#DC2626",
                    padding:"8px 12px",
                    borderRadius:"8px",
                    cursor:"pointer",
                    fontWeight:"600"
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          )
        )

      }

    </div>

  );

}

export {
    AttachmentList
};

export default AttachmentList;