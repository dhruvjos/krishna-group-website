'use server';
/**
 * @fileOverview A chatbot flow for the Krishna Group website.
 *
 * - chat - A function that handles a user's chat query.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allCourses } from '@/lib/courses';

// Helper function to create a text summary of the website content.
function getWebsiteContext(): string {
  const aboutUs = `Krishna Group is a leading educational institution dedicated to providing high-quality training and development programs. Our mission is to empower individuals with the knowledge and skills they need to succeed in their personal and professional lives. We believe in fostering a learning environment that is both nurturing and challenging. With a team of experienced instructors and a curriculum designed to meet the demands of the modern world, we offer a wide range of courses that cater to diverse needs and aspirations.`;

  const contactInfo = `
    - Email: krishnagroup.89@gmail.com
    - Phone: +91 75881 65319
  `;

  const socialLinks = `
    - Facebook: https://www.facebook.com/KrishnaGroupShrikrishnaCareerAcademyAurangabad
    - Instagram: https://www.instagram.com/krishnagroup_/
    - YouTube: https://www.youtube.com/@Krishna-TheLifeCoach
  `;
  
  const courseSummary = allCourses.map(course => {
    let summary = `Course: ${course.name}\nDescription: ${course.description}\n`;
    if (course.details) {
      summary += `Details: ${course.details.title}\n`;
      if(course.details.duration) summary += `Duration: ${course.details.duration}\n`;
      if(course.details.price) summary += `Price: ${course.details.price}\n`;
      summary += `Features: ${course.details.features.join(', ')}\n`;
    }
    return summary;
  }).join('\n\n');

  return `
    ABOUT US:
    ${aboutUs}

    COURSES OFFERED:
    ${courseSummary}

    CONTACT & SOCIAL MEDIA:
    - You can contact us via Email at ${contactInfo}.
    - Follow us on ${socialLinks}.
    - For enrollment, you can guide users to the "Enroll Now" or "Register" buttons on the course pages. For special offers or demos, they can be directed to contact us via WhatsApp.
  `;
}

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() }))
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;


const ChatbotInputSchema = z.object({
  query: z.string(),
  history: z.array(ChatMessageSchema),
  userName: z.string().optional(),
  isLoggedIn: z.boolean(),
});

const ChatbotOutputSchema = z.string();

export async function chat(query: string, history: ChatMessage[], user?: { name?: string | null, isLoggedIn: boolean }): Promise<string> {
    const response = await chatbotFlow({
        query,
        history,
        userName: user?.name ?? undefined,
        isLoggedIn: user?.isLoggedIn ?? false,
    });
    return response;
}

const prompt = ai.definePrompt(
  {
    name: 'chatbotPrompt',
    input: { schema: ChatbotInputSchema },
    output: { schema: ChatbotOutputSchema },
    prompt: `You are a friendly and knowledgeable assistant for the Krishna Group, an educational institution. Your name is 'Krishna AI'.
    Your goal is to answer user questions about our courses, mission, and how to get in touch. 
    Be helpful, polite, and concise. 
    Use the user's name to personalize the conversation if they are logged in.
    You must use ONLY the information provided in the context below. Do not make up information. 
    If a user asks about something not in the context, politely say that you don't have information about that topic but can help with questions about Krishna Group's courses, about us, or contact details.
    When asked about course prices, duration, or details, refer to the information provided.
    The conversation has already started. Respond to the user's query based on the conversation history and the context provided.

    CONTEXT:
    ${getWebsiteContext()}

    USER CONTEXT:
    {{#if isLoggedIn}}
    The user is logged in. Their name is {{userName}}. Address them by their name when appropriate.
    {{else}}
    The user is not logged in.
    {{/if}}

    CONVERSATION HISTORY:
    {{#each history}}
      {{{this.role}}}: {{{this.content.[0].text}}}
    {{/each}}
    
    NEW USER QUERY:
    {{{query}}}
    `,
  }
);


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    return llmResponse.output!;
  }
);
