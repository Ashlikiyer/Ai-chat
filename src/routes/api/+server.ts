import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
    const ollama = new Ollama({ host: "http://localhost:11434" });

    const body = await request.json();
    const chatMessage = body.chat || "";

    const user = {
        usertype: "Master User",
        school_id: "202210473",
        fullname: "Ashley Kier Ferreol",
        firstname: "Ashley Kier",
        surname: "Ferreol",
        middlename: "Grey",
        email: "202210473@gordoncollege.edu.ph",
        birthday: "2004-03-05",
        age: 21,
        gender: "Male",
        nationality: "Filipino",
       
        hobbies: ["running", "reading books", "gym", "watching movies"],
        academic_info: {
            course: "BSCS - Computer Science",
            year_level: "3rd Year",
            school: "Gordon College"
        },
        skills: {
            technical: ["UI/UX Design", "Programming", "Data Analysis"],
            soft_skills: ["Problem-Solving", "Teamwork", "Critical Thinking"]
        },
        things_i_like: ["chocolate", "chicken", "beef", "bread", "seafoods"],
        favorite_movies: ["Avengers"],
        favorite_games: ["Call of Duty", "Wild Rift"],
        
       
    
    };

    const chat = await ollama.chat({
        model: "deepseek-r1:7b",
        messages: [
            {
                role: "system",
                content: `Here is the data of my user: ${JSON.stringify(user)}
                Respond only based on the data provided.`
            },
            {
                role: "user",
                content: chatMessage,
            },
        ],
    });

    return json(chat);
};
