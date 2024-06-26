import React, { useState } from "react";
import axios from "axios";

export const Chatbot = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([{ role: "system", content: "You are a helpful assistant." }]);

	const sendMessage = async (message) => {
		const newMessage = { role: "user", content: message };
		const updatedMessages = [...messages, newMessage];
		setMessages(updatedMessages);

		const response = await axios.post("https://gpt-backend-703y.onrender.com/chat", {
			messages: updatedMessages,
			model: "gpt-3.5-turbo",
		});
		const assistantResponse = response.data;
		setMessages((prevMessage) => [...prevMessage, assistantResponse]);
	};

	const submitForm = (e) => {
		e.preventDefault();
		sendMessage(message);
		setMessage("");
	};

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Another Chatbot</h1>
			<div className="not-whole-height">
				{messages.slice(1).map((msg, index) => (
					<div key={index}>
						{msg.role === "user" ? <h3>You: </h3> : <h3>Assistant: </h3>}
						<p className="message-content">{msg.content}</p>
					</div>
				))}
			</div>
			<form onSubmit={submitForm}>
				<div className="input-container">
					<input
						className="input-center"
						placeholder="Ask me a question..."
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button hidden type="submit">
						Submit!
					</button>
				</div>
			</form>
		</>
	);
};
