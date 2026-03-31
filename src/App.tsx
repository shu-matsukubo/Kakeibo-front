import './App.css';
import './styles/base.css';
import { useState } from "react";
import { SummaryPage } from "./pages/SummaryPage";
import { CreatePage } from "./pages/CreatePage";
import { MasterPage } from "./pages/MasterPage";

function App() {
  const [page, setPage] = useState<"summary" | "create" | "master">("summary");

  return (
    <div>
      {page === "summary" && <SummaryPage />}
      {page === "create" && <CreatePage onBack={() => setPage("summary")} />}
      {page === "master" && <MasterPage onBack={() => setPage("summary")}/>}

      {page === "summary" && (
        <>
          <button onClick={() => setPage("master")}>マスタ管理</button>
          <button onClick={() => setPage("create")}>＋追加</button>
        </>
      )}
    </div>
  );
}

export default App;