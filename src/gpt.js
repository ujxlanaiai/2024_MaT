import transcript from "./App.js"


export const CallGPT = async () => {
    console.log(">>callGPT");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk-proj-CDf02bRmVZPmw0tVpI7JT3BlbkFJlI7741MdGYMJVE6WDz9U`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: "Change the following to Latex Syntax(not format), giving only the answers: " + transcript },
            ],
        }),
    });

    const responseData = await response.json();
    console.log("responseData", responseData);

    return responseData;
};