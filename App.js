import { useEffect, useRef } from "react";
import MainStack from "./src/navigation/MainStack.jsx";
import UserProvider from "./src/context/UserProvider.jsx";

import { startNotifications } from "./src/utils/notifications.js";

export default function App() {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    startNotifications(notificationListener, responseListener)
  }, [])


  return (
    <UserProvider>
      <MainStack />
    </UserProvider>
  );
}


