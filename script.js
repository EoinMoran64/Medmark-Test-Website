(() => {
  const CHAT_BUTTON_CONTAINER_ID = "__8x8-chat-button-container-script_20161119516a6229b04a68e1.95227577";
  const CHAT_SCRIPT_UUID = "script_20161119516a6229b04a68e1.95227577";
  const STALE_CHAT_BUTTON_CONTAINER_ID = "__8x8-chat-button-container-script_8908431576a0b159db9c2f3.80372082";
  const STALE_CHAT_SCRIPT_UUID = "script_8908431576a0b159db9c2f3.80372082";

  const chatContainerSelector = `[id="${CHAT_BUTTON_CONTAINER_ID}"]`;
  const chatFrameSelector = `[id="${CHAT_SCRIPT_UUID}"]`;
  const chatIconMask = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M278.125 128H229.656C200.062 128 176 152.062 176 181.641C176 190.484 183.156 197.641 192 197.641S208 190.484 208 181.641C208 169.703 217.719 160 229.656 160H278.125C292.406 160 304 171.609 304 185.875C304 195.75 298.531 204.625 289.469 209.141L248.625 230.344C243.312 233.094 240 238.578 240 244.547V272C240 280.844 247.156 288 256 288S272 280.844 272 272V254.266L304 237.656C323.75 227.781 336 207.938 336 185.875C336 153.969 310.031 128 278.125 128ZM256 312C244.955 312 236 320.953 236 332C236 343.045 244.955 352 256 352S276 343.045 276 332C276 320.953 267.045 312 256 312ZM256.033 32C114.678 32 0.068 125.125 0.068 240C0.068 287.625 19.941 331.25 52.935 366.25C38.062 405.75 7.066 439.125 6.566 439.5C-0.057 446.5 -1.807 456.75 1.943 465.5C5.816 474.25 14.316 480 23.939 480C85.431 480 133.926 454.25 163.047 433.75C192.043 442.75 223.289 448 256.033 448C397.39 448 512 354.875 512 240S397.39 32 256.033 32ZM256.033 416C227.787 416 199.791 411.75 172.795 403.25C163.279 400.182 152.873 401.789 144.726 407.588L144.674 407.625C121.678 423.875 86.181 442.875 42.062 447.25C54.06 432.125 71.808 406.75 82.806 377.625L82.935 377.285C87.219 366.014 84.726 353.287 76.506 344.463L76.308 344.25C47.312 313.75 32.064 277.625 32.064 240C32.064 143 132.551 64 256.033 64C379.517 64 480.004 143 480.004 240S379.517 416 256.033 416Z'/%3E%3C/svg%3E";

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

  const installChatButtonStyles = () => {
    if (document.getElementById("medmark-8x8-chat-button-style")) return;

    const style = document.createElement("style");
    style.id = "medmark-8x8-chat-button-style";
    style.textContent = `
      ${chatContainerSelector} {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 2147483601;
      }

      ${chatContainerSelector} button {
        width: auto !important;
        min-width: 225px !important;
        height: 66px !important;
        padding: 0 26px 0 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 10px !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: #12a8d4 !important;
        color: #ffffff !important;
        font: 700 18px/1.1 Arial, sans-serif !important;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18) !important;
        cursor: pointer !important;
        overflow: visible !important;
        transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
      }

      ${chatContainerSelector} button:hover {
        background: #0f98c2 !important;
        transform: translateY(-1px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22) !important;
      }

      ${chatContainerSelector} button:focus-visible {
        outline: 3px solid rgba(18, 168, 212, 0.35) !important;
        outline-offset: 4px !important;
      }

      ${chatContainerSelector} button img {
        display: none !important;
      }

      ${chatContainerSelector} button::before {
        content: "";
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
        background-color: #ffffff;
        -webkit-mask: url("${chatIconMask}") center / contain no-repeat;
        mask: url("${chatIconMask}") center / contain no-repeat;
      }

      ${chatContainerSelector} button::after {
        content: "Chat to Medmark";
        white-space: nowrap;
      }

      ${chatFrameSelector} {
        right: 24px !important;
        bottom: 104px !important;
        width: min(400px, calc(100vw - 48px)) !important;
        height: min(704px, calc(100dvh - 132px)) !important;
      }

      @media (max-width: 480px) {
        ${chatContainerSelector} {
          right: 16px;
          bottom: 16px;
        }

        ${chatContainerSelector} button {
          min-width: 198px !important;
          height: 58px !important;
          padding: 0 20px 0 15px !important;
          font-size: 16px !important;
        }

        ${chatContainerSelector} button::before {
          width: 30px;
          height: 30px;
          flex-basis: 30px;
        }

        ${chatFrameSelector} {
          right: 16px !important;
          bottom: 88px !important;
          width: calc(100vw - 32px) !important;
          height: min(704px, calc(100dvh - 112px)) !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const getChatFrame = () => document.getElementById(CHAT_SCRIPT_UUID);

  const setChatOpen = isOpen => {
    const frame = getChatFrame();
    const button = document.getElementById(CHAT_BUTTON_CONTAINER_ID)?.querySelector("button");
    if (!frame) return;

    frame.style.display = isOpen ? "block" : "none";
    button?.setAttribute("aria-expanded", String(isOpen));
  };

  const toggleChat = () => {
    const frame = getChatFrame();
    if (!frame) return;
    setChatOpen(getComputedStyle(frame).display === "none");
  };

  const createFallbackChatButton = () => {
    const container = document.getElementById(CHAT_BUTTON_CONTAINER_ID);
    if (!container || container.querySelector("button")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Chat to Medmark");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", toggleChat);
    container.appendChild(button);
  };

  const labelChatButton = () => {
    const button = document.getElementById(CHAT_BUTTON_CONTAINER_ID)?.querySelector("button");
    if (!button) return;

    button.setAttribute("aria-label", "Chat to Medmark");
    if (!button.dataset.medmarkChatBound) {
      button.dataset.medmarkChatBound = "true";
      button.addEventListener("click", () => {
        setTimeout(() => {
          const frame = getChatFrame();
          if (frame) button.setAttribute("aria-expanded", String(getComputedStyle(frame).display !== "none"));
        }, 100);
      });
    }
  };

  const load8x8Chat = () => {
    document.querySelector(".chat-button")?.remove();
    document.querySelector(".chat-panel")?.remove();
    document.getElementById(STALE_CHAT_BUTTON_CONTAINER_ID)?.remove();
    document.getElementById(STALE_CHAT_SCRIPT_UUID)?.remove();

    installChatButtonStyles();

    const buttonContainer = document.createElement("div");
    buttonContainer.id = CHAT_BUTTON_CONTAINER_ID;
    document.body.appendChild(buttonContainer);

    const observer = new MutationObserver(labelChatButton);
    observer.observe(buttonContainer, { childList: true, subtree: true });

    (function(c, f, ef) {
      const typeofC = Object.prototype.toString.call(c);
      const props = (typeofC === "[object Object]" && c) || {};
      const cb = f || (typeofC === "[object Function]" && c);
      const config = {
        scriptUuid: CHAT_SCRIPT_UUID,
        tenant: "bWVkbWFyazAx",
        channelName: "Chat",
        channelUuid: "R5oza40FQieSr5OktxdgSQ",
        domain: "https://vcc-eu13.8x8.com",
        buttonContainerId: CHAT_BUTTON_CONTAINER_ID,
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
          labelChatButton();
          setTimeout(createFallbackChatButton, 500);
          se.removeEventListener("init", handleInitEvent);
        }

        function handleErrorEvent(e) {
          if (ef) ef(e);
          createFallbackChatButton();
          se.removeEventListener("customerror", handleErrorEvent);
        }

        se.addEventListener("init", handleInitEvent);
        se.addEventListener("customerror", handleErrorEvent);
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(se, firstScript);
      }
    })();

    setTimeout(createFallbackChatButton, 2500);
  };

  loadExistingSiteScript().finally(load8x8Chat);
})();
