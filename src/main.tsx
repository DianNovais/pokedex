import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptBR}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
