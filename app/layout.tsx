// import { verifyToken } from "@/src/utils/middlewares/auth";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import './globals.css'

export default function PublicLayout({
    children,
}: {
  children: React.ReactNode
}) {
    // const cookie = cookies().get("Session");

    // if (cookie) {
    //     const token = verifyToken(cookie.value);

    //     if (token) {
    //         redirect("/dashboard");
    //     }
    // }
    
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
