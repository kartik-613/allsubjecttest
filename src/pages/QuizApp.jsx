// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import QuestionCard from "../components/quizApp/QuestionCard";
// import NavigationButtons from "../components/quizApp/NavigationButtons";
// import Sidebar from "../components/quizApp/Sidebar";
// import ExitWarningModal from "../components/quizApp/ExitWarningModal";

// const API_CALL = import.meta.env.VITE_API_URL_PATH;
// const API_KEY = import.meta.env.VITE_API_URL_KEY;

// const QuizApp = () => {
//   const [questions, setQuestions] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(445);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [answered, setAnswered] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [markedForReview, setMarkedForReview] = useState({});
//   const [showExitWarning, setShowExitWarning] = useState(false);
//   const [securityBreachMessage, setSecurityBreachMessage] = useState("");

//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(import.meta.env.VITE_API_URL);
//         const fetchedQuestions = res.data.map((q) => ({
//           question: q.question,
//           options: q.options.map((opt) => {
//             const key = Object.keys(opt)[0];
//             return `${key.toUpperCase()}. ${opt[key]}`;
//           }),
//           correct_answer: q.correct_answer,
//           explanation: q.explanation,
//         }));
//         setQuestions(fetchedQuestions);
//         setAnswers(Array(fetchedQuestions.length).fill(null));
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmitTest();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       setAnswered(answers[currentQuestionIndex] !== null);
//     }
//   }, [currentQuestionIndex, answers, questions]);

//   useEffect(() => {
//     const preventDefault = (e) => e.preventDefault();
//     document.addEventListener("copy", preventDefault);
//     document.addEventListener("cut", preventDefault);
//     document.addEventListener("contextmenu", preventDefault);
//     document.body.style.userSelect = "none";

//     const handleBeforeUnload = (e) => {
//       e.preventDefault();
//       e.returnValue = "";
//       setSecurityBreachMessage(
//         "Exit attempt detected. Do you want to exit and submit or continue your test?"
//       );
//       setShowExitWarning(true);
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         setSecurityBreachMessage(
//           "Tab switch detected. Do you want to exit and submit or continue your test?"
//         );
//         setShowExitWarning(true);
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     const goFullScreen = () => {
//       const el = document.documentElement;
//       if (el.requestFullscreen) el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     };
//     goFullScreen();

//     const handleFullScreenChange = () => {
//       if (!document.fullscreenElement) {
//         setSecurityBreachMessage(
//           "Fullscreen exited. Do you want to exit and submit or continue your test?"
//         );
//         setShowExitWarning(true);
//       }
//     };
//     document.addEventListener("fullscreenchange", handleFullScreenChange);

//     const handleBackButton = (e) => {
//       e.preventDefault();
//       window.history.pushState(null, "", window.location.href);
//     };
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handleBackButton);

//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       })
//       .catch((err) => {
//         console.error("Camera access denied:", err);
//         setCameraActive(false);
//       });

//     return () => {
//       document.removeEventListener("copy", preventDefault);
//       document.removeEventListener("cut", preventDefault);
//       document.removeEventListener("contextmenu", preventDefault);
//       document.body.style.userSelect = "auto";
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       document.removeEventListener("fullscreenchange", handleFullScreenChange);
//       window.removeEventListener("popstate", handleBackButton);
//     };
//   }, []);

//   useEffect(() => {
//     if (!cameraActive) return;

//     const interval = setInterval(() => {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;

//       if (
//         !canvas ||
//         !video ||
//         video.videoWidth === 0 ||
//         video.videoHeight === 0
//       )
//         return;

//       const context = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const compressedCanvas = document.createElement("canvas");
//       const ctx = compressedCanvas.getContext("2d");
//       compressedCanvas.width = video.videoWidth * 0.5;
//       compressedCanvas.height = video.videoHeight * 0.5;
//       ctx.drawImage(
//         video,
//         0,
//         0,
//         compressedCanvas.width,
//         compressedCanvas.height
//       );

//       compressedCanvas.toBlob(
//         async (blob) => {
//           if (!blob) return;

//           const formData = new FormData();
//           formData.append("file", blob, `screenshot_${Date.now()}.jpg`);

//           try {
//             await axios.post(`${API_CALL}/api/FileAPI/UploadFiles`, formData, {
//               headers: { "Content-Type": "multipart/form-data" },
//               params: { APIKEY: API_KEY },
//             });
//           } catch (error) {
//             console.error("Upload failed:", error);
//           }
//         },
//         "image/jpeg",
//         0.6
//       );
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [cameraActive]);

//   const handleOptionSelect = (index) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentQuestionIndex] = index;
//     setAnswers(updatedAnswers);
//     setAnswered(true);
//   };

//   const toggleMarkForReview = (index) => {
//     setMarkedForReview((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleSubmitTest = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject;
//       stream.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     navigate("/tabs");
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-xl font-semibold">Loading questions...</div>
//     );
//   }

//   const currentQ = questions[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-white text-black px-10 py-7">
//       <video ref={videoRef} autoPlay playsInline className="hidden" />
//       <canvas ref={canvasRef} className="hidden" />

//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="flex-1 flex flex-col space-y-5">
//           <div className="bg-white rounded-xl px-5 py-6 border border-gray-300">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h1 className="text-2xl font-bold">📘 Subject: Quiz</h1>
//               <h2 className="text-xl font-semibold">
//                 ⏱️ TIME LEFT -{" "}
//                 {`${Math.floor(timeLeft / 60)
//                   .toString()
//                   .padStart(2, "0")}:${(timeLeft % 60)
//                   .toString()
//                   .padStart(2, "0")}`}{" "}
//                 MIN
//               </h2>
//             </div>
//           </div>

//           <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
//             <QuestionCard
//               question={currentQ}
//               index={currentQuestionIndex}
//               selectedAnswer={answers[currentQuestionIndex]}
//               onSelect={handleOptionSelect}
//             />

//             <NavigationButtons
//               currentQuestionIndex={currentQuestionIndex}
//               totalQuestions={questions.length}
//               timeLeft={timeLeft}
//               answered={answered}
//               markedForReview={markedForReview}
//               onPrevious={() =>
//                 setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
//               }
//               onNext={() =>
//                 setCurrentQuestionIndex((prev) =>
//                   Math.min(prev + 1, questions.length - 1)
//                 )
//               }
//               onToggleMark={() => {
//                 toggleMarkForReview(currentQuestionIndex);
//                 if (
//                   !markedForReview[currentQuestionIndex] &&
//                   currentQuestionIndex < questions.length - 1
//                 ) {
//                   setCurrentQuestionIndex((prev) => prev + 1);
//                 }
//               }}
//               onSubmit={handleSubmitTest}
//             />
//           </div>
//         </div>

//         <Sidebar
//           questions={questions}
//           answers={answers}
//           markedForReview={markedForReview}
//           currentIndex={currentQuestionIndex}
//           onSelectQuestion={setCurrentQuestionIndex}
//           onSubmit={handleSubmitTest}
//         />
//       </div>

//       <ExitWarningModal
//         visible={showExitWarning}
//         message={securityBreachMessage}
//         onContinue={() => setShowExitWarning(false)}
//         onExit={() => {
//           setShowExitWarning(false);
//           handleSubmitTest();
//         }}
//       />
//     </div>
//   );
// };

// export default QuizApp;








import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import QuestionCard from "../components/quizApp/QuestionCard";
import NavigationButtons from "../components/quizApp/NavigationButtons";
import Sidebar from "../components/quizApp/Sidebar";
import ExitWarningModal from "../components/quizApp/ExitWarningModal";

const API_CALL = import.meta.env.VITE_API_URL_PATH;
const API_KEY = import.meta.env.VITE_API_URL_KEY;

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(445);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markedForReview, setMarkedForReview] = useState({});
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [securityBreachMessage, setSecurityBreachMessage] = useState("");

  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL);
        const fetchedQuestions = res.data.map((q) => ({
          question: q.question,
          options: q.options.map((opt) => {
            const key = Object.keys(opt)[0];
            return `${key.toUpperCase()}. ${opt[key]}`;
          }),
          correct_answer: q.correct_answer,
          explanation: q.explanation,
        }));
        setQuestions(fetchedQuestions);
        setAnswers(Array(fetchedQuestions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update answered flag
  useEffect(() => {
    if (questions.length > 0) {
      setAnswered(answers[currentQuestionIndex] !== null);
    }
  }, [currentQuestionIndex, answers, questions]);

  // Exam security and camera setup
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("contextmenu", preventDefault);
    document.body.style.userSelect = "none";

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      setSecurityBreachMessage("Exit attempt detected. Do you want to exit and submit or continue your test?");
      setShowExitWarning(true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSecurityBreachMessage("Tab switch detected. Do you want to exit and submit or continue your test?");
        setShowExitWarning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

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

    const handleBackButton = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setCameraActive(false);
      });

    return () => {
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("contextmenu", preventDefault);
      document.body.style.userSelect = "auto";
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // Periodic camera screenshot
  useEffect(() => {
    if (!cameraActive) return;

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video || video.videoWidth === 0 || video.videoHeight === 0) return;

      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const compressedCanvas = document.createElement("canvas");
      const ctx = compressedCanvas.getContext("2d");
      compressedCanvas.width = video.videoWidth * 0.5;
      compressedCanvas.height = video.videoHeight * 0.5;
      ctx.drawImage(video, 0, 0, compressedCanvas.width, compressedCanvas.height);

      compressedCanvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append("file", blob, `screenshot_${Date.now()}.jpg`);

        try {
          await axios.post(`${API_CALL}/api/FileAPI/UploadFiles`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { APIKEY: API_KEY },
          });
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }, "image/jpeg", 0.6);
    }, 60000);

    return () => clearInterval(interval);
  }, [cameraActive]);

  useEffect(() => {
  let screenStream;

  const startScreenCapture = async () => {
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = screenStream;
      video.play();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const interval = setInterval(async () => {
        if (video.videoWidth && video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("file", blob, `screen_${Date.now()}.jpg`);

            try {
              await axios.post(`${API_CALL}/api/FileAPI/UploadFiles`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                params: { APIKEY: API_KEY },
              });
            } catch (err) {
              console.error("Screen upload failed:", err);
            }
          }, 'image/jpeg', 0.7);
        }
      }, 5000); // every 5 seconds

      return () => {
        clearInterval(interval);
        screenStream.getTracks().forEach((track) => track.stop());
      };
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  startScreenCapture();
}, []);

useEffect(() => {
  let mediaRecorder;
  let recordedChunks = [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraActive(true);

      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append("file", blob, `video_clip_${Date.now()}.webm`);

        try {
          await axios.post(`${API_CALL}/api/FileAPI/UploadFiles`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { APIKEY: API_KEY },
          });
        } catch (err) {
          console.error("Video upload failed:", err);
        }
      };

      mediaRecorder.start();

      const stopInterval = setInterval(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
          mediaRecorder.start(); // start new 2-min recording
        }
      }, 120000); // 2 minutes

      return () => {
        clearInterval(stopInterval);
        stream.getTracks().forEach((track) => track.stop());
      };

    } catch (error) {
      console.error("Video recording error:", error);
      setCameraActive(false);
    }
  };

  startRecording();
}, []);


  const handleOptionSelect = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = index;
    setAnswers(updatedAnswers);
    setAnswered(true);
  };

  const toggleMarkForReview = (index) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmitTest = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    navigate("/tabs");
  };

  if (loading) {
    return <div className="p-10 text-xl font-semibold">Loading questions...</div>;
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white text-black px-10 py-7">
      <video ref={videoRef} autoPlay playsInline className="hidden" />
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col space-y-5">
          <div className="bg-white rounded-xl px-5 py-6 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📘 Subject: Quiz</h1>
              <h2 className="text-xl font-semibold">
                ⏱️ TIME LEFT - {`${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`} MIN
              </h2>
            </div>
          </div>

          <div className="rounded-xl border border-gray-300 flex flex-col justify-between">
            <QuestionCard
              question={currentQ}
              index={currentQuestionIndex}
              selectedAnswer={answers[currentQuestionIndex]}
              onSelect={handleOptionSelect}
            />

            <NavigationButtons
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
              answered={answered}
              markedForReview={markedForReview}
              onPrevious={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
              onNext={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              onToggleMark={() => {
                toggleMarkForReview(currentQuestionIndex);
                if (!markedForReview[currentQuestionIndex] && currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex((prev) => prev + 1);
                }
              }}
              onSubmit={handleSubmitTest}
            />
          </div>
        </div>

        <Sidebar
          questions={questions}
          answers={answers}
          markedForReview={markedForReview}
          currentIndex={currentQuestionIndex}
          onSelectQuestion={setCurrentQuestionIndex}
          onSubmit={handleSubmitTest}
        />
      </div>

      <ExitWarningModal
        visible={showExitWarning}
        message={securityBreachMessage}
        onContinue={() => setShowExitWarning(false)}
        onExit={() => {
          setShowExitWarning(false);
          handleSubmitTest();
        }}
      />
    </div>
  );
};

export default QuizApp;
