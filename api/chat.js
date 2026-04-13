export default async function handler(req, res) {
    try {
        const { prompt } = req.body;

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

        return res.status(200).json({
            output: data.output_text || ""
        });
    } catch (err) {
        return res.status(500).json({
            error: "server error"
        });
    }
}