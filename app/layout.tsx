"use client";
import CustomChat from "./CustomChat";
import { CopilotKit } from "@copilotkit/react-core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <CopilotKit runtimeUrl="/api/chat"> */}
        {/* <CustomChat /> */}
        {/* </CopilotKit> */}
        {children}
      </body>
    </html>
  );
}
