import React from "react";
import DemoTutorContentDisplay from "./home/conversations/DemoTutorContentDisplay";

const sampleConversation = [
  {
    speaker: "Daniel",
    words: [
      { text: "Hi,", definition: "a greeting" },
      { text: "Maya.", definition: "the interviewee's name" },
      { text: "Thanks", definition: "expression of gratitude" },
      { text: "for", definition: "used to show purpose" },
      { text: "coming", definition: "arriving" },
      { text: "in.", definition: "to this place" },
      { text: "Can", definition: "used to ask a question" },
      { text: "you", definition: "the person being spoken to" },
      { text: "tell", definition: "give information" },
      { text: "me", definition: "the speaker" },
      { text: "about", definition: "regarding" },
      { text: "your", definition: "belonging to you" },
      { text: "experience", definition: "knowledge from doing something" },
      { text: "with", definition: "together with" },
      { text: "client", definition: "a customer" },
      { text: "projects?", definition: "planned pieces of work" },
    ],
  },
  {
    speaker: "Maya",
    words: [
      { text: "Sure.", definition: "yes; of course" },
      { text: "I", definition: "the speaker" },
      { text: "led", definition: "guided or directed" },
      { text: "a", definition: "one" },
      { text: "small", definition: "not large" },
      { text: "team", definition: "a group working together" },
      { text: "and", definition: "connects words or ideas" },
      { text: "managed", definition: "organized and controlled" },
      { text: "deadlines", definition: "due dates" },
      { text: "for", definition: "used to show purpose" },
      { text: "marketing", definition: "promoting products or services" },
      { text: "campaigns.", definition: "organized efforts to promote something" },
    ],
  },
  {
    speaker: "Daniel",
    words: [
      { text: "Great,", definition: "expression of approval" },
      { text: "that's", definition: "short for \"that is\"" },
      { text: "helpful.", definition: "useful" },
      { text: "What", definition: "used to ask a question" },
      { text: "was", definition: "past form of \"is\"" },
      { text: "your", definition: "belonging to you" },
      { text: "biggest", definition: "largest or most important" },
      { text: "challenge?", definition: "a difficult problem or task" },
    ],
  },
  {
    speaker: "Maya",
    words: [
      { text: "Keeping", definition: "continuing to do something" },
      { text: "stakeholders", definition: "people with interest in a project" },
      { text: "aligned", definition: "in agreement or in the same direction" },
      { text: "was", definition: "past form of \"is\"" },
      { text: "tough,", definition: "difficult" },
      { text: "so", definition: "therefore" },
      { text: "I", definition: "the speaker" },
      { text: "set", definition: "put in place" },
      { text: "weekly", definition: "happening every week" },
      { text: "check-ins.", definition: "short update meetings" },
    ],
  },
  {
    speaker: "Daniel",
    words: [
      { text: "Nice,", definition: "good; well done" },
      { text: "how", definition: "in what way" },
      { text: "did", definition: "past form of \"do\"" },
      { text: "you", definition: "the person being spoken to" },
      { text: "measure", definition: "evaluate or track" },
      { text: "success", definition: "a good result" },
      { text: "on", definition: "regarding" },
      { text: "those", definition: "referring to specific things" },
      { text: "campaigns?", definition: "organized promotional efforts" },
    ],
  },
];

export default function TestTutorConversation() {
  return (
    <div className="w-full">
      <DemoTutorContentDisplay
        conversation={{
          title: "Job Interview: Marketing Coordinator",
          level: "B2",
          content: sampleConversation,
        }}
      />
    </div>
  );
}
