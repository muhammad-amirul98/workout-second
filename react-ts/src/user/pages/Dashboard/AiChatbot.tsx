import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { getUserMessages, sendMessage } from "../../../state/user/aiSlice";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const AiChatbot = () => {
  const dispatch = useAppDispatch();
  const ai = useAppSelector((store) => store.ai);
  const jwt = localStorage.getItem("jwt");
  const [userMessage, setUserMessage] = useState<string>("");
  const handleInputChange = (value: string) => {
    setUserMessage(value);
  };

  //
  useEffect(() => {
    if (!jwt) return;
    dispatch(getUserMessages(jwt));
  }, []);

  const handleSendMessage = () => {
    if (!jwt || !userMessage) return;

    const message = userMessage;

    setUserMessage("");

    dispatch(sendMessage({ jwt, userMessage: message }))
      .unwrap()
      .then(() => {
        dispatch(getUserMessages(jwt));
      });
  };

  return (
    <div className="space-y-5 flex flex-col">
      <div className="flex flex-col h-[65vh] overflow-y-auto shadow p-5 space-y-3 rounded-md">
        {ai.messages.map((message, index) => (
          <div
            key={index}
            className={`flex 
                  ${
                    message.messageOwner === "USER"
                      ? "justify-end"
                      : "justify-start"
                  }`}
          >
            <span
              className={`
                    p-3 rounded-lg
                    ${
                      message.messageOwner === "USER"
                        ? "bg-teal-700 text-white"
                        : "bg-gray-100"
                    }
                `}
            >
              {message.message}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white shadow">
        <TextField
          variant="outlined"
          fullWidth
          value={userMessage}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type a message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {!ai.loading ? (
                  <IconButton onClick={handleSendMessage}>
                    <KeyboardArrowUp />
                  </IconButton>
                ) : (
                  <IconButton size="small">
                    <CircularProgress size={16} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
    </div>
  );
};

export default AiChatbot;
