'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, CopyCheck, Copy, Paperclip, X, AlertCircle, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

// Define message interface
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  feedback?: 'positive' | 'negative' | null;
}

// Define sample legal topics for suggestions
const suggestedQuestions = [
  "What are my rights as a tenant?",
  "How do I file for divorce?",
  "What should I do after a car accident?",
  "How can I dispute a consumer purchase?",
  "What documents are needed for property registration?",
  "What is the process for filing an RTI?",
];

// Define suggested document types for upload
const documentTypes = [
  { name: "Rental Agreement", type: "rental" },
  { name: "Court Notice", type: "court" },
  { name: "Legal Notice", type: "notice" },
  { name: "Contract", type: "contract" },
];

export default function ChatInterface() {
  // State for managing messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'नमस्ते! मैं आपकी कानूनी प्रश्नों के साथ सहायता कर सकता हूं। आप अपना प्रश्न हिंदी या अंग्रेजी में पूछ सकते हैं।\n\nHi! I can help with your legal questions. You can ask in Hindi or English.',
      timestamp: new Date(),
    }
  ]);
  
  // Input state
  const [input, setInput] = useState('');
  
  // Recording and accessibility states
  const [isRecording, setIsRecording] = useState(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(false);
  const [isTextToSpeechPlaying, setIsTextToSpeechPlaying] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Simulated language detection (in a real implementation, this would use a language detection API)
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');

  // Scroll to bottom of messages on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle click outside attachment options
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAttachmentOptions && !(event.target as HTMLElement)?.closest('.attachment-options-container')) {
        setShowAttachmentOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAttachmentOptions]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Generate a unique ID for the message
    const userMessageId = `user-${Date.now()}`;
    
    // Add user message
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Start loading state
    setIsLoadingResponse(true);
    
    // Simulate language detection
    detectLanguage(input);
    
    // Generate assistant response after a delay (simulating API call)
    setTimeout(() => {
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoadingResponse(false);
      
      // If text-to-speech is enabled, read out the response
      if (isTextToSpeechEnabled) {
        speakText(assistantMessage.content);
      }
    }, 1500);
  };

  // Detect language (simplified simulation)
  const detectLanguage = (text: string) => {
    // Simple check for Hindi characters (Devanagari Unicode range)
    const containsHindiChars = /[\u0900-\u097F]/.test(text);
    const containsTamilChars = /[\u0B80-\u0BFF]/.test(text);
    const containsTeluguChars = /[\u0C00-\u0C7F]/.test(text);
    
    if (containsHindiChars) {
      setDetectedLanguage('hi');
    } else if (containsTamilChars) {
      setDetectedLanguage('ta');
    } else if (containsTeluguChars) {
      setDetectedLanguage('te');
    } else {
      setDetectedLanguage('en');
    }
  };

  // Generate a response (simplified for demonstration)
  const generateResponse = (userInput: string): string => {
    // Convert to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Simple rule-based responses based on keywords
    if (input.includes('tenant') || input.includes('rent') || input.includes('landlord') || 
        input.includes('किरायेदार') || input.includes('किराया')) {
      if (detectedLanguage === 'hi') {
        return 'किरायेदार के रूप में, आपके पास कई अधिकार हैं, जिनमें शामिल हैं:\n\n1. उचित नोटिस के बिना बेदखल नहीं किया जा सकता\n2. एक सुरक्षित और रहने योग्य स्थान\n3. मकान मालिक से मरम्मत का अनुरोध करने का अधिकार\n\nक्या आप किसी विशिष्ट समस्या के बारे में पूछना चाहते हैं?';
      } else {
        return 'As a tenant, you have several rights including:\n\n1. Cannot be evicted without proper notice\n2. Right to a safe and habitable place\n3. Right to request repairs from landlord\n\nThe specific laws vary by state. Would you like to know about tenant rights in a particular state?';
      }
    } 
    
    if (input.includes('divorce') || input.includes('तलाक')) {
      if (detectedLanguage === 'hi') {
        return 'भारत में तलाक की प्रक्रिया विवाह के प्रकार और धार्मिक कानून पर निर्भर करती है। आम तौर पर, आपको निम्नलिखित कदम उठाने होंगे:\n\n1. एक वकील से परामर्श करें\n2. आपस में सहमति से तलाक के लिए याचिका दायर करें या विवाद के मामले में तलाक\n3. संपत्ति और बच्चों की हिरासत के संबंध में समझौता\n\nक्या आप किसी विशेष प्रकार के विवाह के तलाक के बारे में पूछना चाहते हैं?';
      } else {
        return 'The divorce process in India depends on the type of marriage and personal laws. Generally, you will need to:\n\n1. Consult an attorney\n2. File a petition for mutual consent divorce or contested divorce\n3. Reach settlements regarding property and child custody\n4. Attend court hearings\n\nThe process typically takes 6-18 months. Would you like more specific information?';
      }
    }
    
    if (input.includes('accident') || input.includes('दुर्घटना')) {
      if (detectedLanguage === 'hi') {
        return 'कार दुर्घटना के बाद, आपको निम्नलिखित कदम उठाने चाहिए:\n\n1. पुलिस को सूचित करें और FIR दर्ज करें\n2. चिकित्सा सहायता प्राप्त करें और रिपोर्ट संरक्षित करें\n3. अपने बीमा प्रदाता को सूचित करें\n4. दुर्घटना का दस्तावेजीकरण करें (फोटो, गवाह विवरण)\n5. कानूनी सलाह लें\n\nक्या आप मुआवजे के दावे के बारे में अधिक जानना चाहते हैं?';
      } else {
        return 'After a car accident, you should:\n\n1. Report to the police and file an FIR\n2. Seek medical attention and preserve records\n3. Notify your insurance provider\n4. Document the accident (photos, witness details)\n5. Seek legal advice\n\nWould you like to know more about filing for compensation?';
      }
    }
    
    // Default response
    if (detectedLanguage === 'hi') {
      return 'मैं आपके प्रश्न को समझने की कोशिश कर रहा हूं। क्या आप अपने प्रश्न को अधिक विस्तार से बता सकते हैं? या आप किसी विशिष्ट कानूनी क्षेत्र के बारे में पूछना चाहते हैं, जैसे परिवार कानून, उपभोक्ता अधिकार, या संपत्ति कानून?';
    } else if (detectedLanguage === 'ta') {
      return 'நான் உங்கள் கேள்வியைப் புரிந்துகொள்ள முயற்சிக்கிறேன். உங்கள் சட்ட கவலையைப் பற்றி மேலும் விவரங்களை வழங்க முடியுமா? அல்லது குடும்பச் சட்டம், நுகர்வோர் உரிமைகள் அல்லது சொத்துச் சட்டம் போன்ற குறிப்பிட்ட சட்டப் பகுதியில் நீங்கள் ஆர்வமாக இருக்கிறீர்களா?';
    } else if (detectedLanguage === 'te') {
      return 'నేను మీ ప్రశ్నను అర్థం చేసుకోవడానికి ప్రయత్నిస్తున్నాను. మీ చట్టపరమైన ఆందోళన గురించి మరిన్ని వివరాలను అందించగలరా? లేదా కుటుంబ చట్టం, వినియోగదారుల హక్కులు లేదా ఆస్తి చట్టం వంటి నిర్దిష్ట చట్ట రంగంలో మీరు ఆసక్తి కలిగి ఉన్నారా?';
    } else {
      return 'I\'m trying to understand your question. Could you provide more details about your legal concern? Or are you interested in a specific area of law such as family law, consumer rights, or property law?';
    }
  };

  // Handle voice input toggle
  const toggleVoiceInput = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real implementation, we would stop the recording and transcribe the audio
    } else {
      // Start recording
      setIsRecording(true);
      // In a real implementation, we would use the Web Speech API or a similar service
      
      // Simulate recording and transcription after a delay
      setTimeout(() => {
        setIsRecording(false);
        
        // Simulate transcribed text
        const simulatedTranscription = "मुझे किरायेदार के अधिकारों के बारे में बताएं";
        setInput(simulatedTranscription);
        
        // Detect language of transcribed text
        detectLanguage(simulatedTranscription);
      }, 3000);
    }
  };

  // Handle text-to-speech toggle
  const toggleTextToSpeech = () => {
    setIsTextToSpeechEnabled(!isTextToSpeechEnabled);
    
    // If turning off, stop any current speech
    if (isTextToSpeechEnabled && isTextToSpeechPlaying) {
      // In a real implementation, we would stop the Web Speech API synthesis
      setIsTextToSpeechPlaying(false);
    }
  };

  // Speak text function
  const speakText = (text: string) => {
    // In a real implementation, we would use the Web Speech API
    console.log('Speaking:', text);
    setIsTextToSpeechPlaying(true);
    
    // Simulate speech duration
    setTimeout(() => {
      setIsTextToSpeechPlaying(false);
    }, 5000);
  };

  // Toggle attachment options
  const toggleAttachmentOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAttachmentOptions(!showAttachmentOptions);
  };

  // Trigger file input click
  const triggerFileUpload = (type: string) => {
    console.log(`Uploading document type: ${type}`);
    fileInputRef.current?.click();
    setShowAttachmentOptions(false);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, we would upload the file to a server
    console.log('File selected:', files[0].name);
    
    // Add user message about the upload
    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: `Uploaded document: ${files[0].name}`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate processing the document
    setIsLoadingResponse(true);
    
    setTimeout(() => {
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: `I've analyzed the document "${files[0].name}". This appears to be a standard rental agreement. Would you like me to explain any specific clauses or terms in this document?`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoadingResponse(false);
    }, 2000);
    
    // Reset file input
    e.target.value = '';
  };

  // Handle message feedback
  const handleMessageFeedback = (messageId: string, feedbackType: 'positive' | 'negative') => {
    setMessages(messages.map(msg => 
      msg.id === messageId
        ? { ...msg, feedback: feedbackType }
        : msg
    ));
  };

  // Copy message to clipboard
  const copyMessageToClipboard = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopiedMessageId(messageId);
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Animation variants for messages
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Loader animation variants
  const loaderVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const dotVariants = {
    start: {
      y: [-1, -8, -1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    },
    end: {
      y: 0,
    },
  };

  // Handle key press in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Use suggested question
  const useSuggestedQuestion = (question: string) => {
    setInput(question);
    setDetectedLanguage('en');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Chat header */}
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
            <span className="font-semibold">AI</span>
          </div>
          <div>
            <h3 className="font-medium">Legal Assistant</h3>
            <p className="text-xs text-muted-foreground">
              Ask any legal question in your language
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {/* Text-to-speech toggle */}
          <button
            onClick={toggleTextToSpeech}
            className={`p-2 rounded-full ${isTextToSpeechEnabled ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/10'}`}
            title={isTextToSpeechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
            aria-label={isTextToSpeechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
          >
            {isTextToSpeechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/10'
                }`}
              >
                {/* Message content */}
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {/* Message footer with timestamp and actions */}
                <div className={`mt-2 flex justify-between items-center text-xs ${
                  message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  <span>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  
                  {/* Message actions */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2">
                      {/* Feedback buttons */}
                      <button 
                        onClick={() => handleMessageFeedback(message.id, 'positive')}
                        className={`p-1 rounded-full hover:bg-background ${message.feedback === 'positive' ? 'text-primary' : ''}`}
                        title="Helpful"
                        aria-label="Mark as helpful"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      
                      <button 
                        onClick={() => handleMessageFeedback(message.id, 'negative')}
                        className={`p-1 rounded-full hover:bg-background ${message.feedback === 'negative' ? 'text-destructive' : ''}`}
                        title="Not helpful"
                        aria-label="Mark as not helpful"
                      >
                        <ThumbsDown size={14} />
                      </button>
                      
                      {/* Copy button */}
                      <button 
                        onClick={() => copyMessageToClipboard(message.id, message.content)}
                        className="p-1 rounded-full hover:bg-background"
                        title="Copy to clipboard"
                        aria-label="Copy to clipboard"
                      >
                        {copiedMessageId === message.id ? <CopyCheck size={14} /> : <Copy size={14} />}
                      </button>
                      
                      {/* More options */}
                      <button 
                        className="p-1 rounded-full hover:bg-background"
                        title="More options"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {isLoadingResponse && (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-start"
            >
              <div className="bg-accent/10 rounded-2xl p-4 h-12 flex items-center">
                <motion.div 
                  className="flex space-x-1"
                  variants={loaderVariants}
                  initial="start"
                  animate="start"
                >
                  <motion.div variants={dotVariants} className="w-2 h-2 rounded-full bg-primary" />
                  <motion.div variants={dotVariants} className="w-2 h-2 rounded-full bg-primary" />
                  <motion.div variants={dotVariants} className="w-2 h-2 rounded-full bg-primary" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 4).map((question, index) => (
              <button
                key={index}
                className="text-xs py-1.5 px-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent-foreground transition-colors"
                onClick={() => useSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t border-border">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="relative flex-grow">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your legal question..."
              className="w-full rounded-lg border border-border bg-background p-3 pr-12 text-sm min-h-[60px] max-h-[120px] focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              rows={1}
            />
            {/* Attachment button and options */}
            <div className="absolute bottom-2 right-2">
              <div className="relative attachment-options-container">
                <button
                  type="button"
                  onClick={toggleAttachmentOptions}
                  className="p-2 rounded-full hover:bg-accent/10 text-muted-foreground"
                  aria-label="Attach document"
                >
                  <Paperclip size={18} />
                </button>
                
                {/* Attachment options popup */}
                {showAttachmentOptions && (
                  <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-md p-2 w-44">
                    <p className="text-xs text-muted-foreground mb-2 px-2">Upload document:</p>
                    
                    {documentTypes.map((docType) => (
                      <button
                        key={docType.type}
                        className="flex items-center w-full p-2 text-sm hover:bg-accent/10 rounded-md"
                        onClick={() => triggerFileUpload(docType.type)}
                      >
                        <span>{docType.name}</span>
                      </button>
                    ))}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex">
            {/* Voice input button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-full ${
                isRecording 
                  ? 'bg-primary text-primary-foreground pulsate' 
                  : 'border border-border hover:bg-accent/10'
              }`}
              aria-label={isRecording ? "Stop recording" : "Start voice input"}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            
            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim() && !isRecording}
              className={`ml-2 p-3 rounded-full ${
                input.trim() || isRecording
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/30 text-primary-foreground/50 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        
        {/* Language detection indicator */}
        {detectedLanguage !== 'en' && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <AlertCircle size={12} className="mr-1" />
            {detectedLanguage === 'hi' && 'Hindi detected. Providing bilingual response.'}
            {detectedLanguage === 'ta' && 'Tamil detected. Providing bilingual response.'}
            {detectedLanguage === 'te' && 'Telugu detected. Providing bilingual response.'}
          </div>
        )}
      </div>
      
      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
        .pulsate {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}