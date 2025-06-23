import { useEffect } from "react";

const GoogleTranslate = () => {
useEffect(() => {
  const addScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.error("Google Translate script failed to load.");
    };
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,fr,de,es,zh",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      } else {
        console.error("Google Translate is not available.");
      }
    };
  };

  addScript();
}, []);


  return (
    <div className="fixed top-4 right-4 z-50">
   <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslate;


// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Add Google Translate script
//     const script = document.createElement("script");
//     script.src =
//       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     // Hide branding and toolbar
//     const style = document.createElement("style");
//     style.innerHTML = `
//       .goog-te-banner-frame.skiptranslate,
//       .goog-te-gadget-icon,
//       .goog-logo-link,
//       .goog-te-gadget span,
//       #goog-gt-tt,
//       .goog-te-balloon-frame {
//         display: none !important;
//       }
//       body {
//         top: 0 !important;
//       }
//       .goog-te-menu-frame {
//         box-shadow: none !important;
//       }
//     `;
//     document.head.appendChild(style);

//     // Initialize Google Translate
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   // Programmatically change language
//   const changeLanguage = (lang) => {
//     const select = document.querySelector(".goog-te-combo");
//     if (select) {
//       select.value = lang;
//       select.dispatchEvent(new Event("change"));
//     }
//   };

//   return (
//     <div className="fixed top-4 right-4 z-50 bg-white p-3 rounded shadow space-x-2">
//       <button
//         onClick={() => changeLanguage("en")}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         English
//       </button>
//       <button
//         onClick={() => changeLanguage("hi")}
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         हिंदी
//       </button>

//       {/* Hidden Google Translate element */}
//       <div id="google_translate_element" style={{ display: "none" }} />
//     </div>
//   );
// };

// export default GoogleTranslate;
