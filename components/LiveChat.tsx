import { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Carga el script del lado del cliente
    const script = document.createElement('script');
    script.src = '/api/livechat';
    script.async = true;
    document.head.appendChild(script);

    // Limpia el script cuando el componente se desmonte
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <noscript>
      <a href="https://www.livechat.com/chat-with/16069107/" rel="nofollow">
        Chat with us
      </a>
      , powered by{' '}
      <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
        LiveChat
      </a>
    </noscript>
  );
};

export default LiveChat;
