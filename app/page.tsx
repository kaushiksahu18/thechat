import { Suspense } from "react";
import MainPage from "@/components/MainPage";

export default function LandingPage() {
  return (
    // <Suspense fallback={<Loading />}>
    <Suspense
      fallback={<div className="h-screen w-full text-center">lodding...</div>}
    >
      <MainPage />
    </Suspense>
  );
}

// export function Loading() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary">
//       <div className="relative">
//         <MessageSquare className="h-24 w-24 animate-pulse text-primary" />
//         <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20"></div>
//       </div>
//       <h1 className="mt-8 animate-pulse text-4xl font-bold text-foreground">
//         THEchat
//       </h1>
//       <div className="mt-4 flex space-x-2">
//         {[0, 1, 2].map((index) => (
//           <div
//             key={index}
//             className="h-3 w-3 animate-bounce rounded-full bg-primary"
//             style={{ animationDelay: `${index * 0.1}s` }}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// }
