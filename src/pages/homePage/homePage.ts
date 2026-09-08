import {type LoginResponse } from "../../api/authService";
import { getAllPosts } from "./getPosts";
console.log("homepage ts")

const userdata: LoginResponse = JSON.parse(localStorage.getItem("user") || "{}")
console.log(userdata)

const isLoggedIn: object = JSON.parse(sessionStorage.getItem("justLoggedIn") || "{}")
console.log(isLoggedIn)

const accessToken: object = JSON.parse(localStorage.getItem("accessToken") || "{}")
console.log("accessToken ", accessToken)

//mulighens false istedenfor !
if (!isLoggedIn) {
    window.location.href = "../login.html"
}

getAllPosts()

