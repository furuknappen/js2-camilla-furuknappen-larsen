import { type LoginResponse } from "../../api/authService";
import { getAllPosts } from "./getPosts";
console.log("homepage ts");

type Post = {
  body: string;
  created: string;
  id: number;
  media: {
    alt: string;
    url: string;
  };
  tags: [];
  title: string;
  updated: string;
  _count: {
    comments: number;
    reactions: number;
  };
};

const userdata: LoginResponse = JSON.parse(
  localStorage.getItem("user") || "{}"
);
console.log(userdata);

const isLoggedIn: object = JSON.parse(
  sessionStorage.getItem("justLoggedIn") || "{}"
);
console.log(isLoggedIn);

const accessToken: object = JSON.parse(
  localStorage.getItem("accessToken") || "{}"
);
console.log("accessToken ", accessToken);

//mulighens false istedenfor !
if (!isLoggedIn) {
  window.location.href = "../login.html";
}

const postParent =
  (document.getElementById("post-parent") as HTMLElement) || null;

const allPosts = await getAllPosts();
// console.log("test", allPosts.data);

function renderPosts(allPosts) {
  return allPosts.data.forEach((post: Post) => {
    createPost(post, postParent);
  });
}

renderPosts(allPosts);

function createPost(post: Post, postParent: HTMLElement) {
  // console.log(post.created);

  const postContainer = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.textContent = post.body;

  const imgDiv = document.createElement("div") as HTMLDivElement;

  const image = document.createElement("img") as HTMLImageElement;
  
   
   if (post.media?.url) {
   image.src = post.media?.url ?? null 
    image.alt = post.media?.alt ?? "No alt-text proviided";
  }

  imgDiv.append(image);
 
  
if(post.tags.length){
  const tags = post.tags
  console.log("Got tags", post.tags)
  const tagDiv = document.createElement("span")
  // tagDiv. 
  tags.forEach((tag) => {
    const tagPill = document.createElement("span")
    tagPill.textContent = `#${tag} `
    tagDiv.append(tagPill)
  })
  // });
    postContainer.append(tagDiv)
  }



  // TIME SECTION
  const formatedTimeCreated = formatTime(post.created);
  const timeCreated = document.createElement("span");
  timeCreated.textContent = formatedTimeCreated;

   const timeEdited = document.createElement("span");
   // finnes en bedre løsning enn denne
   timeEdited.style.display = "block"

  if (post.updated !== post.created) {
    const formatedTimeEdited = formatTime(post.updated);
   
    timeEdited.textContent = `Updated: ${formatedTimeEdited}`;
  }




  postContainer.append(title, timeCreated, timeEdited, body, imgDiv);

  postParent.append(postContainer);

  

  /*
  create postdiv -
  create title  -
  create text-body -
  button for comment
  created at -
  edited at -
  */
}

function formatTime(time: string): string {
  const now = new Date();
  const timeCreated = new Date(time);

  const timestampNow = now.getTime();
  const timestampcreated = timeCreated.getTime();

  const differenceInMilliseconds = timestampNow - timestampcreated;
  const millisecondsInAnHour = 1000 * 60 * 60;

  const timePassed = Math.floor(
    differenceInMilliseconds / millisecondsInAnHour
  );

  //TODO: go back here when theres posts fresher than 24h

  if (timePassed < 24) {
    return `${timePassed} hours ago`;
  }

  const timeOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  } as const;

  const formattedDate = new Intl.DateTimeFormat("en-UK", timeOptions);
  // console.log()
  const manipulatedTime = formattedDate.format(timeCreated);
  return manipulatedTime;
}