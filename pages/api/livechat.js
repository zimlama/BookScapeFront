// pages/api/livechat.js

export default function handler(req, res) {
    // Configura aquí tus datos de LiveChat
    const licenseNumber = 16069107;
  
    // Verifica si la solicitud es para cargar el script del lado del servidor
    if (req.method === 'GET') {
      // Genera el script de LiveChat y responde con él
      const script = `
        window.__lc = window.__lc || {};
        window.__lc.license = ${licenseNumber};
        ;(function(n,t,c){
            function i(n){
                return e._h?e._h.apply(null,n):e._q.push(n)
            }
            var e={_q:[],_h:null,_v:"2.0",
            on:function(){i(["on",c.call(arguments)])},
            once:function(){i(["once",c.call(arguments)])},
            off:function(){i(["off",c.call(arguments)])},
            get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");
            return i(["get",c.call(arguments)])},
            call:function(){i(["call",c.call(arguments)])},
            init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
      `;
  
      res.setHeader('Content-Type', 'application/javascript');
      res.status(200).send(script);
    } else {
      // Maneja otras solicitudes según sea necesario
      res.status(404).end();
    }
  }
  