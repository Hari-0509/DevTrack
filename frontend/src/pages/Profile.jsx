import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Profile() {
  const [
    profile,
    setProfile,
  ] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const res =
          await api.get(
            "/profile"
          );

        setProfile(
          res.data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  if (!profile) {
    return (
      <MainLayout>
        <h2>
          Loading...
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1
        style={{
          fontSize:
            "48px",
          marginBottom:
            "40px",
        }}
      >
        Profile
      </h1>

      <div
        style={{
          background:
            "white",
          borderRadius:
            "30px",
          padding:
            "50px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
          maxWidth:
            "700px",
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              width:
                "100px",
              height:
                "100px",
              borderRadius:
                "50%",
              background:
                "#2563EB",
              color:
                "white",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              fontSize:
                "40px",
              fontWeight:
                "700",
            }}
          >
            {
              profile.name[0]
            }
          </div>

          <div>
            <h2>
              {
                profile.name
              }
            </h2>

            <p
              style={{
                color:
                  "#64748B",
              }}
            >
              {
                profile.email
              }
            </p>

            <p
              style={{
                color:
                  "#64748B",
              }}
            >
              Member Since:
              {
                profile.joined
              }
            </p>
          </div>
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "25px",
            marginTop:
              "50px",
          }}
        >
          <div
            style={{
              background:
                "#F8FAFC",
              padding:
                "25px",
              borderRadius:
                "20px",
            }}
          >
            <h3>
              Projects
            </h3>

            <h1
              style={{
                color:
                  "#2563EB",
              }}
            >
              {
                profile.projects
              }
            </h1>
          </div>

          <div
            style={{
              background:
                "#F8FAFC",
              padding:
                "25px",
              borderRadius:
                "20px",
            }}
          >
            <h3>
              Completed
            </h3>

            <h1
              style={{
                color:
                  "#16A34A",
              }}
            >
              {
                profile.completed
              }
            </h1>
          </div>
        </div>

        <button
          style={{
            marginTop:
              "40px",
            background:
              "#2563EB",
            color:
              "white",
            border:
              "none",
            padding:
              "15px 30px",
            borderRadius:
              "14px",
            cursor:
              "pointer",
            fontSize:
              "16px",
          }}
        >
          Change Password
        </button>
      </div>
    </MainLayout>
  );
}

export default Profile;