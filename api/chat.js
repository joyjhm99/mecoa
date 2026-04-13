export default async function handler(req, res) {
    try {
        const { prompt } = req.body;

        console.log("[api/chat] req.body:", JSON.stringify(req.body));

        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                input: prompt
            })
        });

        const data = await response.json();

        console.log("[api/chat] OpenAI status:", response.status);
        console.log("[api/chat] OpenAI raw response:", JSON.stringify(data));

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "OpenAI API error",
                raw: data
            });
        }

        console.log("[api/chat] output_text:", data.output_text);

        return res.status(200).json({
            output: data.output_text || "",
            raw: data
        });
    } catch (err) {
        console.error("[api/chat] server error:", err);
        return res.status(500).json({
            error: err.message || "server error"
        });
    }
}