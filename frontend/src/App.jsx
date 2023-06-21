import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/app-routes";



function App() {
  

  return (
    <div>
       <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </div>
  )
}

export default App;
