"use client";  // Make this a Client Component

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import SessionProvider from "@/components/SessionProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
