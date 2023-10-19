import OpenAI from "openai";
import "dotenv/config";

// @desc Fetch colors with user input
// @route POST /api/colors
// @access Public
const fetchColors = async (req, res) => {
  const { query } = req.body;

  const createMsg = function (str) {
    let messages = [
      {
        role: "system",
        content:
          "You are a color palette generating assistant. You should generate color palettes that fit the theme, mood, or instructions in the prompt. Please return 4 to 6 colors in an array with hexadecimal color codes",
      },
      {
        role: "user",
        content:
          "Convert the following verbal description of a color palette into a list of color codes: The Mediterranean Sea",
      },
      {
        role: "assistant",
        content: '["#006699", "#66CCCC", "#F0E68C", "#008000", "#F08080"]',
      },
    ];

    messages.push({
      role: "user",
      content:
        "Convert the following verbal description of a color palette into a list of color codes: " +
        str,
    });

    return messages;
  };

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: createMsg(query),
    max_tokens: 100,
  });

  console.log(chatCompletion.choices[0]);
  let colors = JSON.parse(chatCompletion.choices[0].message.content);
  res.json({ colors: colors });
};

export { fetchColors };
