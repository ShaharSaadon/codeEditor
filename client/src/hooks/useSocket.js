import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../services/http.service.js';

export function useSocket(codeBlockId, setCodeBlock, setIsTeacher) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join room', codeBlockId);
    });

    socketRef.current.on('is teacher', (isTeacher) => {
      setIsTeacher(isTeacher);
    });

    socketRef.current.on('code change', (updatedCodeBlock) => {
      if (updatedCodeBlock._id === codeBlockId) {
        setCodeBlock(updatedCodeBlock);
      }
    });

    return () => {
      socketRef.current.emit('leave room', codeBlockId);
      socketRef.current.disconnect();
    };
  }, [codeBlockId, setCodeBlock, setIsTeacher]);

  return socketRef.current;
}
