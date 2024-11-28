import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SingleDetail } from "./pages/SingleDetail";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asset/:id" element={<SingleDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
