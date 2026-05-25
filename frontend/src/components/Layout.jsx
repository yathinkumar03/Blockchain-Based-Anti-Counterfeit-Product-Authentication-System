import { Link, NavLink } from "react-router-dom";

import WalletConnector from "./WalletConnector";

import { useAuth } from "../context/AuthContext";

function Layout({ children }) {

  const { role } = useAuth();

  // ROLE-BASED NAVIGATION

  const navItems = [

    {
      to: "/",
      label: "Home"
    },

    {
      to: "/verify",
      label: "Verify Product"
    },

    ...(role === "Manufacturer" ||
    role === "Admin"

      ? [
          {
            to: "/dashboard",
            label: "Dashboard"
          },

          {
            to: "/register",
            label: "Register Product"
          },

          {
            to: "/tracking",
            label: "Track Ownership"
          }
        ]

      : []),

    ...(role === "Admin"

      ? [
          {
            to: "/admin",
            label: "Admin Dashboard"
          }
        ]

      : [])
  ];

  return (

    <div

      className="app-shell"

      style={{

        minHeight: "100vh",

        padding: "2rem",

        background:
          `
          radial-gradient(
            circle at top left,
            rgba(59,130,246,0.18),
            transparent 22%
          ),

          radial-gradient(
            circle at bottom right,
            rgba(139,92,246,0.16),
            transparent 24%
          ),

          linear-gradient(
            135deg,
            #020617,
            #0f172a,
            #111827
          )
          `,

        color: "#f8fafc"
      }}
    >

      {/* HEADER */}

      <header

        className="site-header"

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          gap: "1.5rem",

          padding: "1.6rem 2rem",

          borderRadius: "32px",

          background:
            "rgba(15,23,42,0.72)",

          backdropFilter: "blur(18px)",

          border:
            "1px solid rgba(255,255,255,0.06)",

          boxShadow:
            `
            0 10px 40px
            rgba(0,0,0,0.35)
            `
        }}
      >

        {/* BRAND */}

        <div className="brand-group">

          <Link

            to="/"

            style={{

              textDecoration: "none",

              fontSize: "2.5rem",

              fontWeight: "800",

              letterSpacing: "-0.05em",

              background:
                `
                linear-gradient(
                  135deg,
                  #60a5fa,
                  #818cf8,
                  #c084fc
                )
                `,

              WebkitBackgroundClip: "text",

              WebkitTextFillColor:
                "transparent"
            }}
          >
            ChainSure
          </Link>

          <p

            style={{

              marginTop: "0.6rem",

              maxWidth: "720px",

              color: "#cbd5e1",

              lineHeight: "1.8",

              fontSize: "0.98rem"
            }}
          >
            Blockchain-powered anti-counterfeit
            product authentication and
            decentralized supply-chain
            verification platform for secure
            product traceability, ownership
            management, and QR-based
            authenticity validation.
          </p>

        </div>

        <WalletConnector />

      </header>

      {/* NAVIGATION */}

      <nav

        className="site-nav"

        style={{

          display: "flex",

          flexWrap: "wrap",

          gap: "1rem",

          margin: "1.8rem 0",

          padding: "1rem",

          borderRadius: "26px",

          background:
            "rgba(15,23,42,0.55)",

          backdropFilter: "blur(16px)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          boxShadow:
            `
            0 8px 28px
            rgba(0,0,0,0.25)
            `
        }}
      >

        {navItems.map((item) => (

          <NavLink

            key={item.to}

            to={item.to}

            style={({ isActive }) => ({

              padding:
                "0.9rem 1.5rem",

              borderRadius: "999px",

              textDecoration: "none",

              fontWeight: "600",

              letterSpacing: "0.01em",

              transition: "0.25s ease",

              color:

                isActive

                ? "#ffffff"

                : "#dbeafe",

              background:

                isActive

                ? `
                  linear-gradient(
                    135deg,
                    #3b82f6,
                    #8b5cf6
                  )
                  `

                : "rgba(255,255,255,0.04)",

              boxShadow:

                isActive

                ? `
                  0 10px 24px
                  rgba(99,102,241,0.35)
                  `

                : "none"
            })}
          >
            {item.label}
          </NavLink>

        ))}

      </nav>

      {/* MAIN CONTENT */}

      <main

        className="page-content"

        style={{

          display: "grid",

          gap: "1.5rem"
        }}
      >
        {children}
      </main>

    </div>
  );
}

export default Layout;