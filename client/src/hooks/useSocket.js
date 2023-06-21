import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../services/http.service.js';

export function useSocket(id, setCodeBlock, setIsTeacher) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('is teacher', (isTeacher) => {
      setIsTeacher(isTeacher);
    });

    socketRef.current.on('code change', (updatedCodeBlock) => {
      if (updatedCodeBlock._id === id) {
        setCodeBlock(updatedCodeBlock);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id, setCodeBlock, setIsTeacher]);

  return socketRef.current;
}
