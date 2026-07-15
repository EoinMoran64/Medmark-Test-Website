(() => {
  const loadExistingSiteScript = () => new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/EoinMoran64/Medmark-Test-Website@5fe85d838ef2b635c64511253819c2099166ef9a/script.js";
    script.async = false;
    script.onload = resolve;
    script.onerror = () => {
      console.warn("The archived Medmark site script could not be loaded.");
      resolve();
    };
    document.head.appendChild(script);
  });

  const load8x8Chat = () => {
    document.querySelector(".chat-button")?.remove();
    document.querySelector(".chat-panel")?.remove();

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "__8x8-chat-button-container-script_8908431576a0b159db9c2f3.80372082";
    document.body.appendChild(buttonContainer);

    (function(c, f, ef) {
      const typeofC = Object.prototype.toString.call(c);
      const props = (typeofC === "[object Object]" && c) || {};
      const cb = f || (typeofC === "[object Function]" && c);
      const config = {
        scriptUuid: "script_8908431576a0b159db9c2f3.80372082",
        tenant: "bWVkbWFyazAx",
        channelName: "Chat",
        channelUuid: "R5oza40FQieSr5OktxdgSQ",
        domain: "https://vcc-eu13.8x8.com",
        buttonContainerId: "__8x8-chat-button-container-script_8908431576a0b159db9c2f3.80372082",
        align: "right"
      };

      const url = new URL("https://cloud8-cc-geo.8x8.com/vcc-chat-channels/public/webchat/discovery");
      const params = {
        domain: config.domain,
        tenant: config.tenant,
        channelUuid: config.channelUuid
      };
      url.search = new URLSearchParams(params).toString();

      fetch(url)
        .then(response => response.json())
        .then(data => {
          config.domain = !data.domain ? config.domain : data.domain;
        })
        .catch(error => {
          console.warn("Failed to retrieve override domain; continuing with", config.domain, error);
        })
        .finally(loadChat);

      function loadChat() {
        const se = document.createElement("script");
        se.type = "text/javascript";
        se.async = true;
        se.src = props.loaderURL || `${config.domain}/CHAT/common/js/chatv3.js`;
        Object.keys(config).forEach(k => {
          se.dataset[k] = config[k];
        });
        Object.keys(props).forEach(k => {
          se.dataset[k] = props[k];
        });

        function handleInitEvent(e) {
          e.detail.init(config, cb);
          se.removeEventListener("init", handleInitEvent);
        }

        function handleErrorEvent(e) {
          if (ef) ef(e);
          se.removeEventListener("customerror", handleErrorEvent);
        }

        se.addEventListener("init", handleInitEvent);
        se.addEventListener("customerror", handleErrorEvent);
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(se, firstScript);
      }
    })();
  };

  loadExistingSiteScript().finally(load8x8Chat);
})();
