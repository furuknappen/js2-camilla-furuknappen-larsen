import type { Post } from "../pages/homePage/getPosts";
import {
  // type PostWithComentsAndAuthor,
  // type Author,
  type Comment,
} from "../pages/postPage/getSinglePost";
// import defaultUserImg from "../assets/user.png";
import "../style/cards.css";
import { formatTime } from "../utils/formatTime";
// const defaultUserImage = "../../public/user.png";

export function createPost(post: Post, postsParentContainer: HTMLElement) {
  const postContainer = document.createElement("a");
  postContainer.classList.add("post-container");
  postContainer.href = `../postPage/postPage.html?id=${post.id}`;

  const title = document.createElement("h2");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add("body");
  body.textContent = post.body;

  const imgDiv = document.createElement("div") as HTMLDivElement;
  imgDiv.classList.add("imgDiv");

  const image = document.createElement("img") as HTMLImageElement;

  if (post.media?.url) {
    image.src = post.media?.url ?? null;
    image.alt = post.media?.alt ?? "No alt-text provided";
  }

  imgDiv.append(image);
  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tagDiv");
  /// TAGS
  if (post.tags.length) {
    const tags = post.tags;

    // tagDiv.
    tags.forEach((tag) => {
      const tagPill = document.createElement("span");
      tagPill.textContent = `#${tag} `;
      tagDiv.append(tagPill);
    });
    // postContainer.append(tagDiv);
  }

  // TIME SECTION

  let postHeader1: HTMLDivElement = document.createElement("div");
  // const authorImgDiv = document.createElement("div");
  // const authorP = document.createElement("p");
  if (post.author) {
    postHeader1 = createAuthorHeader(
      post,
      // timeCreatedSpan,
      // timeEditedSpan,
    );
    // postHeader.append(authorImgDiv);
    // postHeader.append(postHeaderTextDiv);
  }

  // postHeaderTextDiv.append(authorP, );
  postContainer.append(postHeader1, title, body, tagDiv, imgDiv);

  postsParentContainer.append(postContainer);

  const authorCommentP = document.createElement("p");
  if (post.comments) {
    const commentsContainer = document.createElement("section");
    createCommentSection(post.comments, commentsContainer, authorCommentP);

    postsParentContainer.append(commentsContainer);

    // commentsContainer.append()
  }
}

// function formatTime(time: string): HTMLSpanElement {
//   // const formatedTimeCreated =

//   const now = new Date();
//   const timeCreated = new Date(time);

//   const timestampNow = now.getTime();
//   const timestampcreated = timeCreated.getTime();

//   const differenceInMilliseconds = timestampNow - timestampcreated;
//   const millisecondsInAnHour = 1000 * 60 * 60;

//   const timePassed = Math.floor(
//     differenceInMilliseconds / millisecondsInAnHour,
//   );

//   //TODO: go back here when theres posts fresher than 24h
//  const timeSpan1 = document.createElement("span");
//   if (timePassed < 24) {
//       timeSpan1.textContent = `${timePassed} hours ago`;
//   }

//   const timeOptions = {
//     // weekday: "short",
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: false,
//   } as const;

//   const formattedDate = new Intl.DateTimeFormat("en-UK", timeOptions);
//   // console.log()
//   const manipulatedTime = formattedDate.format(timeCreated);
//   const timeSpan = document.createElement("span");
//   timeSpan.classList.add("time");
//   timeSpan.textContent = manipulatedTime;

//   //
//   // timeEdited.classList.add("time");
//   // finnes en bedre løsning enn denne
//   // timeEdited.style.display = "block";

//   // if (post.updated !== post.created) {
//   //   const formatedTimeEdited = formatTime(post.updated);
//   //   timeEdited.textContent = `Updated: ${formatedTimeEdited}`;
//   // }

//   return timeSpan;
// }


function createAuthorHeader(post: Post | Comment): HTMLDivElement {
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const authorImgDiv = document.createElement("div");
  authorImgDiv.classList.add("avatar");
  const userImage = document.createElement("img") as HTMLImageElement;
  if (post.author.avatar) {
    //TODO: default image wont work
    userImage.src = post.author.avatar?.url;
    // ?? defaultUserImage;
    userImage.alt = post.author.avatar?.alt ?? "No alt-text provided";
  }
  authorImgDiv.append(userImage);

  const postHeaderTextDiv = document.createElement("div");
  postHeaderTextDiv.classList.add("post-header-text");

  const authorP = document.createElement("p");
  authorP.classList.add("header-author");
  authorP.textContent = post.author.name;

  const createdTime = formatTime(post.created);
  const createdTimeSpan = document.createElement("span");
  createdTimeSpan.classList.add("time");
  createdTimeSpan.textContent = createdTime;

  postHeaderTextDiv.append(authorP, createdTimeSpan);

  // if (post.updated !== post.created) {
  //   const editedTime = formatTime(post.updated);

  //   const updatedTimeSpan = document.createElement("span");
  //   updatedTimeSpan.classList.add("time");
  //   updatedTimeSpan.textContent = `Updated: ${editedTime}`;

  //   // editedTime.style.display = "block";
  //   // editedTime = editedTime
  //   postHeaderTextDiv.append(updatedTimeSpan);
  // }

  postHeader.append(authorImgDiv, postHeaderTextDiv);
  return postHeader;
}

function createCommentSection(
  comments: Comment[],
  commentsContainer: HTMLElement,
  // authorCommentP: HTMLParagraphElement,
) {
  console.log("has comments to create", comments[0]);

  comments.forEach((comment) => {
    const commentDiv = document.createElement("div") as HTMLDivElement;

    const commentBody = document.createElement("p");
    commentBody.textContent = comment.body;
    const header = createAuthorHeader(comment);
    // comment.author, commentDiv, authorCommentP
    // commentDiv.append(authorImgCommentDiv);
    commentDiv.append(header, commentBody);

    // console.log("has comments to create", comment.body);
    commentsContainer.append(commentDiv);
  });

  //?
  return commentsContainer;
}
