// conversations.ts

import { vocab } from "./vocab";

export interface Word {
  text: string;
  type: string;
}

interface DialogueLine {
  speaker: string;
  words: Word[];
}

export interface Conversation {
  title: string;
  content: string | DialogueLine[];
}



const rawDialogue = `
Alex: Hey, how was your weekend?
Jordan: Oh, it was fantastic! I went hiking with some friends up the mountains. We chose the less-traveled path, which was a bit more challenging than we expected, but totally worth it in the end. The views were just breathtaking—the kind of views that make you forget about everything else for a while. We even saw some wildlife along the way, like a couple of deer grazing near the trail and some colorful birds flying overhead. The best part was when we stopped for a break by a small stream, and I just sat there listening to the water flowing. It was such a peaceful moment. We all agreed that nature has this way of making everything feel right.
Alex: That sounds absolutely incredible! I’ve been thinking about getting out into nature more lately, but I’m not sure where to start. What trail did you guys take? Is it something you’d recommend for someone like me who's still getting back into hiking?
Jordan: Oh, you definitely should! We did the Eagle Ridge Trail, and I think you’d love it. It’s one of those trails that’s a little off the beaten path, so it doesn’t get as crowded as some of the more popular ones, but the views are just incredible. There are some steep sections, so it’s a bit of a workout, but it’s not too technical—nothing too crazy. There’s this spot about halfway up where you get this panoramic view of the whole valley, and it just takes your breath away. You can see the mountains stretching out in the distance, with the trees below forming this gorgeous, lush carpet of green. It’s one of those views where you feel like you’re on top of the world. And if you’re into spotting wildlife, there are always a few creatures around. We saw a hawk gliding through the air, which was pretty amazing. Honestly, I think if you’re in decent shape and take it at your own pace, you’ll have a great time.
Alex: That does sound like exactly what I’m looking for. I’ve been feeling like I need to disconnect for a bit, and being out in nature could be the perfect way to do that. How long did the hike take? I don’t mind a bit of a challenge, but I’m also trying to figure out if I’ll have time to make it a day trip.
Jordan: It took us about 4 hours total, but we weren’t rushing. We stopped a few times to take in the views, grab some snacks, and just enjoy the atmosphere. There’s a little spot about halfway through that’s perfect for a break—there’s a bench there where you can sit and just stare out at the scenery for a while. It’s such a calming experience. If you’re looking to save a bit of time, there is a shortcut that shaves off about an hour, but honestly, I think the full experience is worth it. The entire trail has these little pockets of beauty all the way through, and it feels so rewarding to take your time and really soak it all in. But if you need a quicker option, the shortcut would definitely work. I’d say it’s a solid half-day hike, but you’ll feel refreshed and accomplished at the end.
Alex: That’s exactly the kind of trip I’ve been wanting—nothing too crazy, but still a good workout and time to really enjoy everything around me. Are there any specific spots along the way that you think are perfect for photos? I’m always on the lookout for new places to capture.
Jordan: Oh, absolutely! There are so many great spots along the trail. Near the summit, there’s this incredible vantage point where you can see the valley below and the mountains surrounding you in all directions—it’s like being in a postcard. The light changes throughout the day, so depending on when you go, you can catch some really different looks. If you’re into photography, I’d recommend getting there early in the morning, or even late afternoon, when the sunlight is softer and gives everything this warm, golden glow. There’s also a waterfall about two-thirds of the way up, and it’s one of those hidden gems you don’t expect but is totally worth the stop. If you time it right, you can get some great shots of the water cascading down the rocks with the trees framing it all. Plus, you might even get a shot of the wildlife if you're lucky. I swear we had a few moments where the animals were so close to the trail—it was like they were posing for the camera!
Alex: I love the idea of capturing the view at sunset, especially with a waterfall in the mix. That sounds like it could be magical. Do you think it’s a good trail for beginners, or should I be more experienced before attempting it? I’m not a total novice, but I wouldn’t say I’m an expert either.
Jordan: Honestly, I think it’s a good trail for someone who’s starting out but wants a bit more of a challenge than a simple walk in the park. It’s not overly technical, but there are some sections with elevation gain and uneven ground that require a bit of stamina. If you’re in decent shape and pace yourself, you’ll definitely be able to handle it. Just take your time on the steeper sections and make sure to hydrate—it’s easy to underestimate how much water you need, especially if you’re not used to hiking at higher elevations. If you’re a little unsure, you could always try a shorter section of the trail first to see how you feel. There are some great views even just a little ways in, so you don’t have to commit to the whole trail if you’re not up for it. And like I said, there’s a shortcut option if you want to make it a bit easier on yourself. But really, I think you’ll be fine. Just make sure to bring comfortable shoes and layers in case the weather changes. And don’t forget your camera—trust me, you’ll want it!
Alex: This all sounds exactly like the kind of adventure I’ve been hoping for. Thanks so much for the detailed info—it really helps! I think I’ll check it out this weekend, weather permitting. I’m excited to get out there and see it all for myself.
Jordan: No problem! I’m really glad it helped. You’re going to have an amazing time, I just know it. There’s something about being out on a trail like that—away from everything—that just gives you a sense of peace and accomplishment. It’s a great way to reset and clear your head. Let me know how it goes afterward—I’m sure you’ll have tons of great photos to share, too!
Jordan: No problem! Let me know how it goes! I’m sure you’ll have an amazing time. It’s a fantastic way to disconnect from everything and just focus on nature. Plus, the fresh air and the sense of accomplishment at the end make it all worth it. You’re going to love it!
`;

export const rawDialogueLength = rawDialogue.length;

const parsedDialogue = rawDialogue
  .trim()
  .split("\n")
  .map(line => {
    const [speaker, ...rest] = line.split(":");
    const text = rest.join(":").trim();

    const words = text
      .replace(/([.,!?—])/g, "$1")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map(word => vocab[word.toLowerCase()] ?? { text: word, type: "unknown" });

    return {
      speaker: speaker.trim(),
      words,
    };
  });


  export const conversations: Record<string, Conversation> = {
    "1": {
      title: "Quick catchup",
      content: parsedDialogue,
    },

      // vocab["hey"],          // hey
      // vocab["how"],          // how
      // vocab["was"],          // was
      // vocab["your"],         // your
      // vocab["weekend"],      // weekend
      // vocab["it"],           // it
      // vocab["was"],          // was
      // vocab["pretty"],       // pretty
      // vocab["good"],         // good
      // vocab["actually"],     // actually
      // vocab["went"],         // went
      // vocab["hiking"],       // hiking
      // vocab["with"],         // with
      // vocab["some"],         // some
      // vocab["friends"],      // friends
      // vocab["up"],           // up
      // vocab["mountains"],    // mountains
      // vocab["we"],           // we
      // vocab["were"],         // were
      // vocab["looking"],      // looking
      // vocab["for"],          // for
      // vocab["a"],            // a
      // vocab["new"],          // new
      // vocab["trail"],        // trail
      // vocab["to"],           // to
      // vocab["explore"],      // explore
      // vocab["sounds"],       // sounds
      // vocab["amazing"],      // amazing
      // vocab["how"],          // how
      // vocab["was"],          // was
      // vocab["the"],          // the
      // vocab["weather"],      // weather
      // vocab["it"],           // it
      // vocab["was"],          // was
      // vocab["perfect"],      // perfect
      // vocab["sun"],          // sun
      // vocab["was"],          // was
      // vocab["out"],          // out
      // vocab["but"],          // but
      // vocab["it"],           // it
      // vocab["wasn't"],       // wasn't
      // vocab["too"],          // too
      // vocab["hot"],          // hot
      // vocab["challenging"],  // challenging
      // vocab["view"],         // view
      // vocab["from"],         // from
      // vocab["the"],          // the
      // vocab["top"],          // top
      // vocab["we"],           // we
      // vocab["could"],        // could
      // vocab["see"],          // see
      // vocab["the"],          // the
      // vocab["whole"],        // whole
      // vocab["valley"],       // valley
      // vocab["below"],        // below
      // vocab["the"],          // the
      // vocab["city"],         // city
      // vocab["in"],           // in
      // vocab["the"],          // the
      // vocab["distance"],     // distance
      // vocab["we"],           // we
      // vocab["had"],          // had
      // vocab["never"],        // never
      // vocab["seen"],         // seen
      // vocab["that"],         // that
      // vocab["angle"],        // angle
      // vocab["before"],       // before
      // vocab["haven't"],      // haven't
      // vocab["gone"],         // gone
      // vocab["hiking"],       // hiking
      // vocab["in"],           // in
      // vocab["a"],            // a
      // vocab["long"],         // long
      // vocab["time"],         // time
      // vocab["I"],            // I
      // vocab["miss"],         // miss
      // vocab["nature"],       // nature
      // vocab["it's"],         // it's
      // vocab["so"],           // so
      // vocab["calming"],      // calming
      // vocab["I"],            // I
      // vocab["don't"],        // don't
      // vocab["think"],        // think
      // vocab["I'll"],         // I'll
      // vocab["ever"],         // ever
      // vocab["completely"],   // completely
      // vocab["agree"],        // agree
      // vocab["but"],          // but
      // vocab["absolutely"],   // absolutely
      // vocab["feel"],         // feel
      // vocab["like"],         // like
      // vocab["it"],           // it
      // vocab["clears"],       // clears
      // vocab["my"],           // my
      // vocab["mind"],         // mind
      // vocab["yeah"],         // yeah
      // vocab["me"],           // me
      // vocab["too"],          // too
      // vocab["it's"],         // it's
      // vocab["definitely"],   // definitely
      // vocab["the"],          // the
      // vocab["best"],         // best
      // vocab["way"],          // way
      // vocab["to"],           // to
      // vocab["clear"],        // clear
      // vocab["my"],           // my
      // vocab["head"],         // head
      // vocab["yeah"],         // yeah
      // vocab["I"],            // I
      // vocab["agree"],        // agree
      // vocab["let's"],        // let's
      // vocab["do"],           // do
      // vocab["more"],         // more
      // vocab["hiking"],       // hiking
      // vocab["soon"],         // soon
      // vocab["I"],            // I
      // vocab["can't"],        // can't
      // vocab["wait"],         // wait
      // vocab["for"],          // for
      // vocab["our"],          // our
      // vocab["next"],         // next
      // vocab["trip"],         // trip
      // vocab["."],            // punctuation


  "2": {
    title: "Conversation 2",
    content: "This is the second conversation.",
  },
  "3": {
    title: "Conversation 3",
    content: "This is the third conversation.",
  },
};
