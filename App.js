import MainStack from "./src/navigation/MainStack.jsx";
import UserProvider from "./src/context/UserProvider.jsx";


export default function App() {
  return (
    <UserProvider>
      <MainStack />
    </UserProvider>
  );
}


