import { useSocketStore } from "@/lib/socket";
import { useAuth } from "@clerk/expo";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SocketConnection = () => {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    // if (isSignedIn) {
    //   getToken().then((token) => {
    //     if (token) connect(token, queryClient);
    //   });
    // } else disconnect();
    let cancelled = false;

    const syncSocket = async () => {
      if (!isSignedIn) {
        disconnect();
        return;
      }

      try {
        const token = await getToken();
        if (!cancelled && token) {
          connect(token, queryClient);
        }
      } catch {
        if (!cancelled) disconnect();
      }

      void syncSocket();
    };

    return () => {
      cancelled = true;
      disconnect();
    };
  }, [isSignedIn, connect, disconnect, getToken, queryClient]);

  return null;
};

export default SocketConnection;
