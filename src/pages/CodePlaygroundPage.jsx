// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import axios from "axios";
// import { Button } from "../components/button";
// import { Navigate, useNavigate } from "react-router-dom";


// const languageOptions = [
//   { label: "C", value: "c" },
//   { label: "C++", value: "cpp" },
//   { label: "Java", value: "java" },
//   { label: "Python", value: "python" },
//   { label: "JavaScript", value: "javascript" },
//   { label: "TypeScript", value: "typescript" },
//   { label: "PHP", value: "php" },
//   { label: "Ruby", value: "ruby" },
//   { label: "Go", value: "go" },
//   { label: "Rust", value: "rust" },
//   { label: "Swift", value: "swift" },
//   { label: "Kotlin", value: "kotlin" },
//   { label: "Perl", value: "perl" },
//   { label: "Scala", value: "scala" },
//   { label: "R", value: "r" },
//   { label: "Haskell", value: "haskell" },
//   { label: "Lua", value: "lua" },
//   { label: "Bash", value: "bash" },
//   { label: "SQL", value: "sql" },
//   { label: "Dart", value: "dart" },
// ];

// const defaultCode = {
//   javascript: "console.log('Hello, world!')",
//   python: "print('Hello, world!')",
//   java: `public class Main {
//   public static void main(String[] args) {
//     System.out.println("Hello, world!");
//   }
// }`,
//   c: `#include <stdio.h>
// int main() {
//   printf("Hello, world!\\n");
//   return 0;
// }`,
//   cpp: `#include <iostream>
// int main() {
//   std::cout << "Hello, world!" << std::endl;
//   return 0;
// }`,
// };

// const CodePlaygroundPage = () => {
//   const [language, setLanguage] = useState("c");
//   const [code, setCode] = useState(defaultCode["c"]);
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleRunCode = async () => {
//     setLoading(true);
//     setOutput("");

//     try {
//       const response = await axios.post(
//         "https://emkc.org/api/v2/piston/execute",
//         {
//           language,
//           version: "*",
//           files: [
//             {
//               content: code,
//             },
//           ],
//         }
//       );

//       const out =
//         response.data.run?.output ||
//         response.data.run?.stdout ||
//         response.data.run?.stderr ||
//         "No output.";
//       setOutput(out);
//     } catch (error) {
//       setOutput("Error: " + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//   // Prevent copy, right-click, and text selection
//   const preventActions = (e) => e.preventDefault();
//   document.addEventListener("contextmenu", preventActions);
//   document.addEventListener("copy", preventActions);
//   document.addEventListener("cut", preventActions);
//   document.addEventListener("selectstart", preventActions);

//   // Auto-submit on tab switch or blur
//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       alert("Tab switch detected. Test will be auto-submitted.");
//       navigate("/tabs");
//     }
//   };
//   const handleBlur = () => {
//     alert("Window lost focus. Test will be auto-submitted.");
//     navigate("/tabs");
//   };
//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   window.addEventListener("blur", handleBlur);

//   // Disable DevTools shortcuts
//   const disableDevTools = (e) => {
//     if (
//       e.key === "F12" ||
//       (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
//       (e.ctrlKey && e.key === "U")
//     ) {
//       e.preventDefault();
//       alert("Developer tools blocked. Test will be auto-submitted.");
//       navigate("/tabs");
//     }
//   };
//   document.addEventListener("keydown", disableDevTools);

//   // Request full screen
//   const goFullScreen = () => {
//     const el = document.documentElement;
//     if (el.requestFullscreen) el.requestFullscreen();
//     else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//     else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//     else if (el.msRequestFullscreen) el.msRequestFullscreen();
//   };
//   goFullScreen();

//   return () => {
//     document.removeEventListener("contextmenu", preventActions);
//     document.removeEventListener("copy", preventActions);
//     document.removeEventListener("cut", preventActions);
//     document.removeEventListener("selectstart", preventActions);
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     window.removeEventListener("blur", handleBlur);
//     document.removeEventListener("keydown", disableDevTools);
//   };
// }, []);


//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-8">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left side: Editor (60%) */}
//         <div className="flex-[3] space-y-5">
//           <div className="border border-gray-300 rounded-xl p-4 bg-white">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h1 className="text-2xl font-bold">🧠 Code Playground</h1>
//               <div className="flex items-center gap-2">
//                 <select
//                   value={language}
//                   onChange={(e) => {
//                     const lang = e.target.value;
//                     setLanguage(lang);
//                     setCode(defaultCode[lang] || "");
//                     setOutput("");
//                   }}
//                   className="border border-gray-300 rounded p-2 text-sm"
//                 >
//                   {languageOptions.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//                 <Button
//                   onClick={handleRunCode}
//                   className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 text-sm rounded"
//                 >
//                   {loading ? "Running..." : "Run Code"}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="border border-gray-300 rounded-xl overflow-hidden h-[500px]">
//             <Editor
//               height="100%"
//               language={language}
//               value={code}
//               onChange={(val) => setCode(val)}
//               theme="vs-dark"
//               options={{
//                 fontSize: 14,
//                 minimap: { enabled: false },
//                 automaticLayout: true,
//               }}
//             />
//           </div>
//         </div>

//         {/* Right side: Output (40%) */}
//         {/* Right side: Output (40%) */}
//         <div className="flex-[2] border border-gray-300 rounded-xl bg-white flex flex-col">
//           {/* Header */}
//           <div className="p-5 border-b border-gray-300 flex justify-between">
//             <h1 className="text-2xl font-bold">💻 Output</h1>
//             <Button
//               className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 text-sm rounded"
//               onClick={() => setOutput("")}
//             >
//               Clear Output
//             </Button>
//           </div>

//           {/* Output content scrollable area */}
//           <div className="flex-1 p-5 flex flex-col">
//             <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm h-[420px] overflow-x-auto overflow-y-auto scroll-smooth">
//               <pre className="whitespace-pre font-mono min-w-[100%]">
//                 {output || "Run your code to see the output here."}
//               </pre>
//             </div>
//           </div>

//           {/* Bottom button */}
//     <div className="w-full flex justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-b-xl">
//       <Button
//         onClick={() => navigate("/tabs")}
        
//       >
//         Submit Test
//       </Button>
//     </div>
//        </div>
//       </div>
//     </div>
//   );
// };

// export default CodePlaygroundPage;








import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

const languageOptions = [
  { label: "C", value: "c" }, { label: "C++", value: "cpp" },
  { label: "Java", value: "java" }, { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" }, { label: "TypeScript", value: "typescript" },
  { label: "PHP", value: "php" }, { label: "Ruby", value: "ruby" },
  { label: "Go", value: "go" }, { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" }, { label: "Kotlin", value: "kotlin" },
  { label: "Perl", value: "perl" }, { label: "Scala", value: "scala" },
  { label: "R", value: "r" }, { label: "Haskell", value: "haskell" },
  { label: "Lua", value: "lua" }, { label: "Bash", value: "bash" },
  { label: "SQL", value: "sql" }, { label: "Dart", value: "dart" },
];

const defaultCode = {
  javascript: "console.log('Hello, world!')",
  python: "print('Hello, world!')",
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
  c: `#include <stdio.h>
int main() {
  printf("Hello, world!\\n");
  return 0;
}`,
  cpp: `#include <iostream>
int main() {
  std::cout << "Hello, world!" << std::endl;
  return 0;
}`,
};

const CodePlaygroundPage = () => {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(defaultCode["c"]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showExitWarning, setShowExitWarning] = useState(false);
  const [securityBreachMessage, setSecurityBreachMessage] = useState("");

  const navigate = useNavigate();

  const handleRunCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version: "*",
          files: [{ content: code }],
        }
      );

      const out =
        response.data.run?.output ||
        response.data.run?.stdout ||
        response.data.run?.stderr ||
        "No output.";
      setOutput(out);
    } catch (error) {
      setOutput("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTest = () => {
    navigate("/tabs");
  };

  useEffect(() => {
    const preventActions = (e) => e.preventDefault();
    document.addEventListener("contextmenu", preventActions);
    document.addEventListener("copy", preventActions);
    document.addEventListener("cut", preventActions);
    document.addEventListener("selectstart", preventActions);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSecurityBreachMessage("Tab switch detected. Do you want to exit and submit or continue your test?");
        setShowExitWarning(true);
      }
    };
    const handleBlur = () => {
      setSecurityBreachMessage("Window focus lost. Do you want to exit and submit or continue your test?");
      setShowExitWarning(true);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    const disableDevTools = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        setSecurityBreachMessage("Developer tools detected. Do you want to exit and submit or continue your test?");
        setShowExitWarning(true);
      }
    };
    document.addEventListener("keydown", disableDevTools);

    const goFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };
    goFullScreen();

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setSecurityBreachMessage("Fullscreen exited. Do you want to exit and submit or continue your test?");
        setShowExitWarning(true);
      }
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("contextmenu", preventActions);
      document.removeEventListener("copy", preventActions);
      document.removeEventListener("cut", preventActions);
      document.removeEventListener("selectstart", preventActions);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("keydown", disableDevTools);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Editor */}
        <div className="flex-[3] space-y-5">
          <div className="border border-gray-300 rounded-xl p-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">🧠 Code Playground</h1>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => {
                    const lang = e.target.value;
                    setLanguage(lang);
                    setCode(defaultCode[lang] || "");
                    setOutput("");
                  }}
                  className="border border-gray-300 rounded p-2 text-sm"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleRunCode}
                  className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 text-sm rounded"
                >
                  {loading ? "Running..." : "Run Code"}
                </Button>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl overflow-hidden h-[500px]">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(val) => setCode(val)}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Right: Output */}
        <div className="flex-[2] border border-gray-300 rounded-xl bg-white flex flex-col">
          <div className="p-5 border-b border-gray-300 flex justify-between">
            <h1 className="text-2xl font-bold">💻 Output</h1>
            <Button
              className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 text-sm rounded"
              onClick={() => setOutput("")}
            >
              Clear Output
            </Button>
          </div>

          <div className="flex-1 p-5 flex flex-col">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-sm h-[420px] overflow-x-auto overflow-y-auto scroll-smooth">
              <pre className="whitespace-pre font-mono min-w-[100%]">
                {output || "Run your code to see the output here."}
              </pre>
            </div>
          </div>

          <div className="w-full flex justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-b-xl">
            <Button onClick={handleSubmitTest}>Submit Test</Button>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">Exit Warning</h2>
            <p className="mb-6">
              {securityBreachMessage ||
                "Do you want to exit and submit the test or continue?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowExitWarning(false)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowExitWarning(false);
                  handleSubmitTest();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Exit & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlaygroundPage;
