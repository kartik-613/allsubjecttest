import { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!window.google || !window.google.translate) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  const clickLanguageOption = (lang, attempt = 0) => {
    const frame = document.querySelector("iframe.goog-te-menu-frame");
    if (frame) {
      const innerDoc = frame.contentDocument || frame.contentWindow.document;
      const items = innerDoc.querySelectorAll(".goog-te-menu2-item span.text");
      items.forEach((item) => {
        if (item.innerText.toLowerCase().includes(lang.toLowerCase())) {
          item.click();
        }
      });
    } else if (attempt < 10) {
      setTimeout(() => clickLanguageOption(lang, attempt + 1), 500);
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    clickLanguageOption(lang);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded shadow-md">
      <div id="google_translate_element" style={{ display: "none" }} />
      <select
        value={selectedLang}
        onChange={handleLanguageChange}
        className="border border-gray-300 rounded p-1 text-sm outline-none"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="zh-CN">Chinese</option>
      </select>
    </div>
  );
};

export default GoogleTranslate;
